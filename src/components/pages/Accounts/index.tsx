import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { errorValidation, formatError } from "../../../utils/errorValidation";

import { AccountsPage } from "../../../locale/pt/dictionary.json";

import {
  Input,
  Button,
  DynamicContent,
  Loading,
  ScrollView,
  EmptyData,
} from "../../../components/atoms";
import { Body, Container, List, TitleContainer } from "./styles";
import { AccountFormData } from "./interfaces";
import { FormStateProps } from "../../../interfaces";
import api from "../../../services/api";
import { useToast } from "../../../hooks/Toast";
import { ActionButtons, Header, ListItem } from "../../molecules";
import { useAccount } from "../../../hooks/Account";

const AccountsScreen: React.FC = () => {
  const { Placeholders, FormTitle, Title, ErrorsStrings, SuccessStrings } =
    AccountsPage;
  const [formState, setFormState] = useState<FormStateProps>({
    status: "closed",
  });
  const [initialData, setInitialData] = useState<AccountFormData>(
    {} as AccountFormData
  );
  const [editId, setEditId] = useState<string>("");

  const { accounts, loading, getAccounts } = useAccount();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    const loadData = async () => {
      await getAccounts();
    };

    loadData();
  }, []);

  const handleAdd = async () => {
    setFormState({ status: "add" });
    setInitialData({} as AccountFormData);
  };
  const handleSubmit = async (data: AccountFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required(ErrorsStrings.NameRequired),
        initialBalance: Yup.number()
          .required(ErrorsStrings.InitialBalanceRequired)
          .min(0, ErrorsStrings.InitialBalanceMin),
      });
      await schema.validate(data, { abortEarly: false });

      if (formState.status === "edit") {
        await api.put(`/accounts/${editId}`, {
          name: data.name,
        });
        setEditId("");
        addToast({
          type: "success",
          title: SuccessStrings.ToastTitle,
          description: SuccessStrings.ToastEditMessage,
        });
      } else if (formState.status === "add") {
        await api.post("/accounts", {
          name: data.name,
          initialBalance: data.initialBalance,
        });
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
      getAccounts();
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

    const account = accounts.find((a) => a.secureId === key);

    if (account) {
      setEditId(key);
      setInitialData(account);
    }
  };
  const handleDelete = async (key: string) => {
    try {
      await api.delete(`/accounts/${key}`);
      getAccounts();
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

  const handleActive = async (key: string, enabled: boolean) => {
    try {
      await api.put(`/accounts/${key}`, {
        active: !enabled,
      });
      getAccounts();
    } catch (err) {
      const errors = formatError(err);

      addToast({
        type: "error",
        title: ErrorsStrings.ToastTitle,
        description: errors[0].message,
      });
    }
  };

  const loadList = useCallback(() => {
    return accounts && accounts.length > 0 ? (
      accounts.map((item) => (
        <ListItem
          secureId={item.secureId}
          description={item.name}
          subDescription={item.balance}
          enabled={item.active}
          setEnabled={handleActive}
          deleteItem={handleDelete}
          editItem={handleEdit}
        />
      ))
    ) : (
      <EmptyData />
    );
  }, [accounts]);

  return (
    <Container>
      <Header backButtonVisible logoVisible />
      <Body>
        <div>
          <TitleContainer>
            <strong>{Title}</strong>
            <Button onClick={handleAdd}>Incluir</Button>
          </TitleContainer>
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

            <Input maxLength={20} name="name" placeholder={Placeholders.Name} />
            <Input
              name="initialBalance"
              placeholder={Placeholders.InitialBalance}
              dataType="currency"
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

export default AccountsScreen;
