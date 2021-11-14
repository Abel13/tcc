import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import dayjs from "dayjs";
import { errorValidation, formatError } from "../../../utils/errorValidation";

import { IncomingsPage, Global } from "../../../locale/pt/dictionary.json";

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
import { IncomingFormData } from "./interfaces";
import { FormStateProps } from "../../../interfaces";
import api from "../../../services/api";
import { useToast } from "../../../hooks/Toast";
import { useAccount } from "../../../hooks/Account";
import { GroupProps } from "../../../components/atoms/Select/interfaces";
import { useIncoming } from "../../../hooks/Incoming";
import { useCategory } from "../../../hooks/Category";
import { useDate } from "../../../hooks/Date";

import {
  ListItem,
  Header,
  ActionButtons,
  PageTitle,
} from "../../../components/molecules";
import Colors from "../../../styles/colors.json";

const IncomingScreen: React.FC = () => {
  const { Placeholders, FormTitle, Title, ErrorsStrings, SuccessStrings } =
    IncomingsPage;
  const [formState, setFormState] = useState<FormStateProps>({
    status: "closed",
  });
  const [initialData, setInitialData] = useState<IncomingFormData>(
    {} as IncomingFormData
  );
  const [editId, setEditId] = useState<string>("");

  const { incomings, total, loading, getIncomings } = useIncoming();
  const { accounts, getAccounts } = useAccount();
  const { categories, getCategories } = useCategory();
  const [accountItems, setAccountItems] = useState<GroupProps[]>(
    {} as GroupProps[]
  );
  const [categoryItems, setCategoryItems] = useState<GroupProps[]>(
    {} as GroupProps[]
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
      const items: GroupProps[] = [
        {
          items: accounts
            .filter((e) => {
              return e.active;
            })
            .map((e) => {
              return { id: e.secureId, value: e.name };
            }),
        },
      ];

      setAccountItems(items);
    }
  }, [accounts]);

  useEffect(() => {
    if (categories) {
      const incomes = categories.filter((e) => {
        return e.group === "Renda";
      });

      var items: GroupProps[] = [];

      items.push({
        groupName: "RECEITA/ENTRADAS",
        groupColor: Colors.revenues,
        items: incomes.map((e) => {
          return { id: e.secureId, value: e.name };
        }),
      });

      setCategoryItems(items);
    }
  }, [categories]);

  useEffect(() => {
    const loadData = async () => {
      await getAccounts();
      await getCategories();
    };

    loadData();
  }, []);

  const handleAdd = async () => {
    setFormState({ status: "add" });
    setInitialData({} as IncomingFormData);
  };

  const handleSubmit = async (data: IncomingFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        description: Yup.string().required(ErrorsStrings.DescriptionRequired),
        value: Yup.number()
          .required(ErrorsStrings.ValueRequired)
          .min(0.01, ErrorsStrings.ValueMin),
        date: Yup.string().required(ErrorsStrings.DateRequired),
        accountId: Yup.string().required(ErrorsStrings.AccountRequired),
        categoryId: Yup.string().required(ErrorsStrings.CategoryRequired),
      });
      await schema.validate(data, { abortEarly: false });

      const body = {
        description: data.description,
        value: data.value,
        date: data.date,
        categoryId: data.categoryId,
        accountId: data.accountId,
      };

      if (formState.status === "edit") {
        await api.put(`/incomings/${editId}`, body);
        setEditId("");
        addToast({
          type: "success",
          title: SuccessStrings.ToastTitle,
          description: SuccessStrings.ToastEditMessage,
        });
      } else if (formState.status === "add") {
        await api.post("/incomings", body);
        addToast({
          type: "success",
          title: SuccessStrings.ToastTitle,
          description: SuccessStrings.ToastCreateMessage,
        });
      } else {
        addToast({
          type: "error",
          title: Global.ToastTitle,
          description: Global.ToastMessage,
        });
        return;
      }

      setFormState({ status: "closed" });
      getIncomings(actualDate, endOfThisMonth);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = errorValidation(err);

        formRef.current?.setErrors(errors);
        return;
      }

      const errors = formatError(err);

      addToast({
        type: "error",
        title: Global.ToastTitle,
        description: errors[0].message,
      });
    }
  };
  const handleEdit = (key: string) => {
    setFormState({ status: "edit" });

    const incoming = incomings.find((a) => a.secureId === key);

    if (incoming) {
      setEditId(key);
      setInitialData({
        ...incoming,
        date: dayjs(incoming.date).format("YYYY-MM-DD"),
      });
    }
  };
  const handleDelete = async (key: string) => {
    try {
      await api.delete(`/incomings/${key}`);
      getIncomings(actualDate, endOfThisMonth);
      addToast({
        type: "success",
        title: SuccessStrings.ToastTitle,
        description: SuccessStrings.ToastDeleteMessage,
      });
    } catch (err) {
      const errors = formatError(err);

      addToast({
        type: "error",
        title: Global.ToastTitle,
        description: errors[0].message,
      });
    }
  };

  useEffect(() => {
    getIncomings(actualDate, endOfThisMonth);
  }, [actualDate, endOfThisMonth]);

  const handleForwardMonth = useCallback(() => {
    nextMonth();
  }, [actualDate, endOfThisMonth]);

  const handleBackwardMonth = useCallback(() => {
    previousMonth();
  }, [actualDate, endOfThisMonth]);

  const loadList = useCallback(() => {
    return incomings && incomings.length > 0 ? (
      incomings.map((item) => (
        <ListItem
          secureId={item.secureId}
          subDescription={item.value}
          status={item.date}
          data={item.accountName}
          description={item.description}
          editItem={handleEdit}
          deleteItem={handleDelete}
        />
      ))
    ) : (
      <EmptyData />
    );
  }, [incomings]);

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
                loadList()
              )}
            </List>
          </ScrollView>
        </div>

        <DynamicContent visible={formState.status !== "closed"}>
          <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
            <h1>{FormTitle}</h1>

            <Input
              maxLength={25}
              name="description"
              placeholder={Placeholders.Description}
            />
            <Input
              name="value"
              placeholder={Placeholders.Value}
              dataType="currency"
              disabled={
                formState.status === "edit" || formState.status === "read"
              }
            />
            <Input type="date" name="date" placeholder={Placeholders.Date} />
            <Select
              name="categoryId"
              groups={categoryItems}
              placeholder={Placeholders.Category}
              disabled={formState.status === "read"}
            />
            <Select
              name="accountId"
              groups={accountItems}
              placeholder={Placeholders.Account}
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

export default IncomingScreen;
