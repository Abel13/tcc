import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Body, List, ButtonContainer } from "./styles";

import { PlanPage, Global } from "../../../locale/pt/dictionary.json";
import { usePlan } from "../../../hooks/Plan";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import dayjs from "dayjs";
import { GroupProps } from "../../../components/atoms/Select/interfaces";

import { errorValidation, formatError } from "../../../utils/errorValidation";

import {
  Input,
  Button,
  DynamicContent,
  Select,
  Loading,
  ScrollView,
  EmptyData,
} from "../../../components/atoms";

import { useToast } from "../../../hooks/Toast";
import { useCategory } from "../../../hooks/Category";
import { useDate } from "../../../hooks/Date";

import {
  Header,
  ActionButtons,
  PageTitle,
} from "../../../components/molecules";
import Colors from "../../../styles/colors.json";
import { PlanFormData } from "./interfaces";
import { FormStateProps } from "../../../interfaces";
import { Plan } from "../../../models/plan";
import { useGoal } from "../../../hooks/Goal";
import ListItemPlan from "../../molecules/ListItemPlan";

const PlanScreen: React.FC = () => {
  const {
    Placeholders,
    FormTitle,
    Title,
    ErrorsStrings,
    SuccessStrings,
    RepeatItems,
  } = PlanPage;
  const [formState, setFormState] = useState<FormStateProps>({
    status: "closed",
  });
  const [initialData, setInitialData] = useState<PlanFormData>(
    {} as PlanFormData
  );
  const [editId, setEditId] = useState<string>("");

  const {
    loading,
    plans,
    getPlan,
    postPlan,
    deletePlan,
    updatePlan,
    finishPlan,
  } = usePlan();
  const { categories, getCategories } = useCategory();
  const { goals, getGoals } = useGoal();

  const repeatItems: GroupProps[] = [
    {
      groupName: "REPETIR",
      groupColor: Colors.warning,
      items: [
        { id: "once", value: RepeatItems.Never },
        { id: "daily", value: RepeatItems.Daily },
        { id: "weekly", value: RepeatItems.Weekly },
        { id: "monthly", value: RepeatItems.Monthly },
        { id: "yearly", value: RepeatItems.Yearly },
      ],
    },
  ];
  const [categoryItems, setCategoryItems] = useState<GroupProps[]>([]);
  const [goalItems, setGoalItems] = useState<GroupProps[]>([]);
  const [showGoals, setShowGoals] = useState<boolean>(false);

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
    var items: GroupProps[] = [];

    if (categories) {
      const incomings = categories.filter((e) => {
        return e.group === "Renda";
      });

      const fixedExpenses = categories.filter((e) => {
        return e.group === "Gastos Essenciais";
      });

      const variableExpenses = categories.filter((e) => {
        return e.group === "Estilo de Vida";
      });

      items.push({
        groupName: "RECEITA/ENTRADAS",
        groupColor: Colors.revenues,
        items: incomings.map((e) => {
          return { id: e.secureId, value: e.name };
        }),
      });

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
        groupName: "INVESTIMENTO",
        groupColor: Colors.investments,
        items: [{ id: "investment", value: "Investimento" }],
      });

      setCategoryItems(items);
    }
  }, [categories]);

  useEffect(() => {
    var items: GroupProps[] = [];

    if (goals) {
      items.push({
        groupName: "METAS/INVESTIMENTOS",
        groupColor: Colors.investments,
        items: goals.map((e) => {
          return { id: e.secureId, value: e.description };
        }),
      });

      setGoalItems(items);
    }
  }, [goals]);

  useEffect(() => {
    const loadData = async () => {
      await getCategories();
      await getGoals();
    };

    loadData();
  }, []);

  const handleAdd = async () => {
    setFormState({ status: "add" });
    setInitialData({} as PlanFormData);
  };

  const handleSubmit = async (data: PlanFormData) => {
    console.log(data);
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        description: Yup.string().required(ErrorsStrings.DescriptionRequired),
        value: Yup.number()
          .typeError(ErrorsStrings.ValueRequired)
          .required(ErrorsStrings.ValueRequired)
          .min(0.01, ErrorsStrings.ValueMin),
        dueDate: Yup.string().required(ErrorsStrings.DateRequired),
        categoryId: Yup.string().required(ErrorsStrings.CategoryRequired),
        goalId: Yup.string().when("categoryId", {
          is: "investment",
          then: Yup.string().required(ErrorsStrings.GoalRequired),
        }),
        repeat: Yup.string().required(ErrorsStrings.RepeatRequired),
      });

      await schema.validate(data, { abortEarly: false });

      if (data.categoryId === "investment") {
        data = {
          ...data,
          categoryId: null,
        };
      }

      if (formState.status === "edit") {
        console.log("edit", editId);
        await updatePlan(editId, data);
        setEditId("");
        addToast({
          type: "success",
          title: SuccessStrings.ToastTitle,
          description: SuccessStrings.ToastEditMessage,
        });
      } else if (formState.status === "add") {
        await postPlan(data);
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

    const plan = plans.find((a) => a.secureId === key);

    if (plan) {
      setEditId(key);
      setShowGoals(plan.category === null);
      const editPlan = {
        ...plan,
        dueDate: dayjs(plan.dueDate).format("YYYY-MM-DD"),
        categoryId: plan.categoryId ? plan.categoryId : "investment",
      };

      setInitialData(editPlan);
    }
  };
  const handleDelete = async (secureId: string) => {
    setFormState({ status: "closed" });
    try {
      await deletePlan(secureId);

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

  const handleFinish = async (status: boolean, secureId: string) => {
    setFormState({ status: "closed" });

    try {
      await finishPlan(secureId, status);

      addToast({
        type: "success",
        title: SuccessStrings.ToastTitle,
        description: SuccessStrings.ToastFinishMessage,
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
    if (actualDate !== undefined && endOfThisMonth !== undefined)
      getPlan(actualDate, endOfThisMonth);
  }, [actualDate, endOfThisMonth]);

  const handleForwardMonth = useCallback(() => {
    nextMonth();
  }, [actualDate, endOfThisMonth]);

  const handleBackwardMonth = useCallback(() => {
    previousMonth();
  }, [actualDate, endOfThisMonth]);

  const planList = useCallback(() => {
    return plans && plans.length > 0 ? (
      plans.map((item: Plan) => (
        <ListItemPlan
          plan={item}
          editItem={handleEdit}
          deleteItem={handleDelete}
          finishPlan={handleFinish}
        />
      ))
    ) : (
      <EmptyData />
    );
  }, [plans]);

  return (
    <Container>
      <Header backButtonVisible logoVisible />
      <Body>
        <div>
          <PageTitle
            title={Title}
            total={0}
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
                planList()
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
              disabled={formState.status === "read"}
            />
            <Input type="date" name="dueDate" placeholder={Placeholders.Date} />
            <Select
              name="categoryId"
              groups={categoryItems}
              placeholder={Placeholders.Category}
              onChange={() => {
                const investmentSelected =
                  formRef.current.getFieldValue("categoryId") === "investment";
                setShowGoals(investmentSelected);
              }}
              disabled={formState.status === "read"}
            />
            {showGoals && (
              <Select
                name="goalId"
                groups={goalItems}
                placeholder={Placeholders.Goal}
                disabled={formState.status === "read"}
              />
            )}
            <Select
              name="repeat"
              groups={repeatItems}
              placeholder={Placeholders.Repeat}
              disabled={formState.status === "read" || initialData.done}
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

export default PlanScreen;
