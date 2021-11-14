import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import dayjs from "dayjs";
import { errorValidation, formatError } from "../../../utils/errorValidation";

import { OutgoingsPage, Global } from "../../../locale/pt/dictionary.json";

import {
  Input,
  Button,
  DynamicContent,
  Select,
  Loading,
  ScrollView,
  EmptyData,
} from "../../../components/atoms";
import { OutgoingFormData } from "./interfaces";
import { FormStateProps } from "../../../interfaces";
import api from "../../../services/api";
import { useToast } from "../../../hooks/Toast";
import {
  Header,
  ActionButtons,
  ListItem,
  PageTitle,
} from "../../../components/molecules";
import { useOutgoing } from "../../../hooks/Outgoing";
import { useAccount } from "../../../hooks/Account";
import { GroupProps } from "../../../components/atoms/Select/interfaces";
import { useDate } from "../../../hooks/Date";
import { useCategory } from "../../../hooks/Category";
import { Body, Container, List, ButtonContainer } from "./styles";
import Colors from "../../../styles/colors.json";
import { useGoal } from "../../../hooks/Goal";

const OutgoingScreen: React.FC = () => {
  const { FormTitle, Title, ErrorsStrings, SuccessStrings, Placeholders } =
    OutgoingsPage;
  const [formState, setFormState] = useState<FormStateProps>({
    status: "closed",
  });
  const [initialData, setInitialData] = useState<OutgoingFormData>(
    {} as OutgoingFormData
  );
  const [editId, setEditId] = useState<string>("");
  const [showGoals, setShowGoals] = useState<boolean>(false);

  const { outgoings, total, loading, getOutgoings } = useOutgoing();
  const { accounts, getAccounts } = useAccount();
  const { categories, getCategories } = useCategory();
  const { goals, getGoals } = useGoal();

  const [accountItems, setAccountItems] = useState<GroupProps[]>(
    {} as GroupProps[]
  );
  const [categoryItems, setCategoryItems] = useState<GroupProps[]>(
    {} as GroupProps[]
  );
  const [goalItems, setGoalItems] = useState<GroupProps[]>({} as GroupProps[]);

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
          groupName: "CONTAS",
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
      const fixedExpenses = categories.filter((e) => {
        return e.group === "Gastos Essenciais";
      });

      const variableExpenses = categories.filter((e) => {
        return e.group === "Estilo de Vida";
      });
      var items: GroupProps[] = [];

      items.push({
        groupName: "GASTOS FIXOS/ESSENCIAIS",
        groupColor: Colors.fixedExpenses,
        items: fixedExpenses.map((e) => {
          return { id: e.secureId, value: e.name };
        }),
      });

      items.push({
        groupName: "GASTOS VARIÁVEIS/ESTILO DE VIDA",
        groupColor: Colors.variableExpenses,
        items: variableExpenses.map((e) => {
          return { id: e.secureId, value: e.name };
        }),
      });

      items.push({
        groupName: "RESGATE",
        groupColor: Colors.investments,
        items: [{ id: "investment", value: "Investimento" }],
      });

      setCategoryItems(items);
    }
  }, [categories]);

  useEffect(() => {
    if (goals) {
      const items: GroupProps[] = [
        {
          groupName: "METAS",
          items: goals.map((e) => {
            return { id: e.secureId, value: e.description };
          }),
        },
      ];

      setGoalItems(items);
    }
  }, [goals]);

  useEffect(() => {
    const loadData = async () => {
      await getAccounts();
      await getCategories();
      await getGoals();
    };

    loadData();
  }, []);

  const handleAdd = async () => {
    setFormState({ status: "add" });
    setInitialData({} as OutgoingFormData);
  };

  const handleSubmit = async (data: OutgoingFormData) => {
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
        await api.put(`/outgoings/${editId}`, body);
        setEditId("");
        addToast({
          type: "success",
          title: SuccessStrings.ToastTitle,
          description: SuccessStrings.ToastEditMessage,
        });
      } else if (formState.status === "add") {
        await api.post("/outgoings", body);
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
      getOutgoings(actualDate, endOfThisMonth);
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

    const outgoing = outgoings.find((a) => a.secureId === key);

    if (outgoing) {
      setEditId(key);
      setInitialData({
        ...outgoing,
        date: dayjs(outgoing.date).format("YYYY-MM-DD"),
      });
    }
  };

  const handleDelete = async (key: string) => {
    try {
      await api.delete(`/outgoings/${key}`);
      getOutgoings(actualDate, endOfThisMonth);
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
    getOutgoings(actualDate, endOfThisMonth);
  }, [actualDate, endOfThisMonth]);

  const handleForwardMonth = useCallback(() => {
    nextMonth();
  }, [actualDate, endOfThisMonth]);

  const handleBackwardMonth = useCallback(() => {
    previousMonth();
  }, [actualDate, endOfThisMonth]);

  const loadList = useCallback(() => {
    return outgoings && outgoings.length > 0 ? (
      outgoings.map((item) => (
        <ListItem
          description={item.description}
          data={item.accountName}
          subDescription={item.value}
          status={item.date}
          secureId={item.secureId}
          editItem={handleEdit}
          deleteItem={handleDelete}
        />
      ))
    ) : (
      <EmptyData />
    );
  }, [outgoings]);

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
              placeholder="Description"
            />
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
              name="categoryId"
              groups={categoryItems}
              placeholder={Placeholders.Category}
              disabled={formState.status === "read"}
              onChange={(e) => {
                const investmentSelected = categories.find(
                  (i) => i.secureId === "investment"
                );
                const visible =
                  investmentSelected &&
                  e.currentTarget.value === investmentSelected.secureId;
                setShowGoals(visible);
              }}
            />
            <DynamicContent visible={showGoals} style={{ marginBottom: 8 }}>
              <Select
                name="goalId"
                groups={goalItems}
                placeholder={Placeholders.Rescue}
                disabled={
                  formState.status === "edit" || formState.status === "read"
                }
              />
            </DynamicContent>
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

export default OutgoingScreen;
