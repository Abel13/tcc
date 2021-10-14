import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import dayjs from "dayjs";
import { errorValidation, formatError } from "../../../utils/errorValidation";

import { TransfersPage } from "../../../locale/pt/dictionary.json";

import {
  Input,
  Button,
  DynamicContent,
  Select,
  Loading,
  ScrollView,
  EmptyData,
} from "../../../components/atoms";
import { Body, ButtonContainer, Container, List } from "./styles";
import { TransferFormData } from "./interfaces";
import { FormStateProps } from "../../../interfaces";
import api from "../../../services/api";
import { useToast } from "../../../hooks/Toast";
import {
  Header,
  ActionButtons,
  ListItem,
  PageTitle,
} from "../../../components/molecules";
import { useTransfer } from "../../../hooks/Transfer";
import { useAccount } from "../../../hooks/Account";
import { ItemProps } from "../../../components/atoms/Select/interfaces";
import { useDate } from "../../../hooks/Date";

const TransferScreen: React.FC = () => {
  const { FormTitle, Title, ErrorsStrings, SuccessStrings } = TransfersPage;
  const [formState, setFormState] = useState<FormStateProps>({
    status: "add",
  });
  const [initialData, setInitialData] = useState<TransferFormData>(
    {} as TransferFormData
  );
  const [editId, setEditId] = useState<string>("");

  const { transfers, total, loading, getTransfers } = useTransfer();
  const { accounts, getAccounts } = useAccount();
  const [accountItems, setAccountItems] = useState<ItemProps[]>(
    {} as ItemProps[]
  );

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const {
    actualDate,
    endOfThisMonth,
    actualMonth,
    actualYear,
    nextMonth,
    previousMonth,
  } = useDate();

  useEffect(() => {
    if (accounts) {
      const items: ItemProps[] = accounts.map((e) => {
        return { id: e.secureId, value: e.name };
      });

      setAccountItems(items);
    }
  }, [accounts]);

  useEffect(() => {
    const loadData = async () => {
      await getAccounts();
    };

    loadData();
  }, []);

  const handleAdd = async () => {
    setFormState({ status: "add" });
    setInitialData({} as TransferFormData);
  };

  const handleSubmit = async (data: TransferFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        value: Yup.string().required(ErrorsStrings.DescriptionRequired),
        date: Yup.string().required(ErrorsStrings.DescriptionRequired),
        accountInId: Yup.string().required(ErrorsStrings.DescriptionRequired),
        accountOutId: Yup.string().required(ErrorsStrings.DescriptionRequired),
      });
      await schema.validate(data, { abortEarly: false });

      const body = {
        value: data.value,
        date: data.date,
        accountInId: data.accountInId,
        accountOutId: data.accountOutId,
      };

      if (formState.status === "edit") {
        await api.put(`/transfers/${editId}`, body);
        setEditId("");
        addToast({
          type: "success",
          title: SuccessStrings.ToastTitle,
          description: SuccessStrings.ToastEditMessage,
        });
      } else if (formState.status === "add") {
        await api.post("/transfers", body);
        addToast({
          type: "success",
          title: SuccessStrings.ToastTitle,
          description: SuccessStrings.ToastCreateMessage,
        });
      } else {
        addToast({
          type: "error",
          title: ErrorsStrings.ToastTitle,
          description: ErrorsStrings.ToastMessage,
        });
        return;
      }

      setFormState({ status: "closed" });
      getTransfers(actualDate, endOfThisMonth);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = errorValidation(err);

        formRef.current?.setErrors(errors);
        return;
      }

      const errors = formatError(err);

      addToast({
        type: "error",
        title: ErrorsStrings.ToastTitle,
        description: errors[0].message,
      });
    }
  };
  const handleEdit = (key: string) => {
    setFormState({ status: "edit" });

    const transfer = transfers.find((a) => a.secureId === key);

    if (transfer) {
      setEditId(key);
      setInitialData({
        ...transfer,
        date: dayjs(transfer.date).format("YYYY-MM-DD"),
      });
    }
  };
  const handleDelete = async (key: string) => {
    try {
      await api.delete(`/transfers/${key}`);
      getTransfers(actualDate, endOfThisMonth);
      addToast({
        type: "success",
        title: SuccessStrings.ToastTitle,
        description: SuccessStrings.ToastDeleteMessage,
      });
    } catch (err) {
      const errors = formatError(err);

      addToast({
        type: "error",
        title: ErrorsStrings.ToastTitle,
        description: errors[0].message,
      });
    }
  };

  useEffect(() => {
    getTransfers(actualDate, endOfThisMonth);
  }, [actualDate, endOfThisMonth]);

  const handleForwardMonth = useCallback(() => {
    nextMonth();
  }, [actualDate, endOfThisMonth]);

  const handleBackwardMonth = useCallback(() => {
    previousMonth();
  }, [actualDate, endOfThisMonth]);

  const loadList = useCallback(() => {
    return transfers && transfers.length > 0 ? (
      transfers.map((item) => (
        <ListItem
          secureId={item.secureId}
          description={`De: ${item.accountOutName} - Para: ${item.accountInName}`}
          subDescription={item.value}
          status={item.date}
          editItem={handleEdit}
          deleteItem={handleDelete}
        />
      ))
    ) : (
      <EmptyData />
    );
  }, [transfers]);

  return (
    <Container>
      <Header backButtonVisible logoVisible />
      <Body>
        <div>
          <PageTitle
            title={Title}
            total={total}
            month={actualMonth}
            year={actualYear}
            forwardMonth={handleForwardMonth}
            backwardMonth={handleBackwardMonth}
          />
          <ButtonContainer>
            <Button onClick={handleAdd}>Incluir</Button>
          </ButtonContainer>

          <ScrollView>
            <List>
              {loading ? (
                <DynamicContent visible={!!loading}>
                  <Loading
                    loading={!!loading}
                    type={"bounce"}
                    showDescription
                    size={30}
                  />
                </DynamicContent>
              ) : (
                // <div />
                loadList()
              )}
            </List>
          </ScrollView>
        </div>
        <DynamicContent visible={formState.status !== "closed"}>
          <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
            <h1>{FormTitle}</h1>

            <Input
              name="value"
              placeholder="Valor"
              dataType="currency"
              disabled={
                formState.status === "edit" || formState.status === "read"
              }
            />
            <Input type="date" name="date" placeholder="Data" />
            <Select
              name="accountOutId"
              items={accountItems}
              placeholder="Conta de saída"
              disabled={
                formState.status === "edit" || formState.status === "read"
              }
            />
            <Select
              name="accountInId"
              items={accountItems}
              placeholder="Conta de entrada"
              disabled={
                formState.status === "edit" || formState.status === "read"
              }
            />

            <ActionButtons
              loading={!!loading}
              cancelAction={() => setFormState({ status: "closed" })}
            />
          </Form>
        </DynamicContent>
      </Body>
    </Container>
  );
};

export default TransferScreen;
