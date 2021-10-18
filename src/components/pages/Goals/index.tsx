import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { AiOutlinePlus } from "react-icons/ai";
import { errorValidation, formatError } from "../../../utils/errorValidation";

import { GoalsPage } from "../../../locale/pt/dictionary.json";

import {
  Input,
  Button,
  DynamicContent,
  Loading,
  ScrollView,
  EmptyData,
} from "../../../components/atoms";
import { Body, Container, List, TitleContainer } from "./styles";
import { GoalFormData, GoalIncomingFormData } from "./interfaces";
import { FormStateProps } from "../../../interfaces";
import api from "../../../services/api";
import { useToast } from "../../../hooks/Toast";
import { ActionButtons, Header, ListItem } from "../../../components/molecules";
import { useGoal } from "../../../hooks/Goal";

const GoalScreen: React.FC = () => {
  const { Placeholders, FormTitle, Title, ErrorsStrings, SuccessStrings } =
    GoalsPage;
  const [formState, setFormState] = useState<FormStateProps>({
    status: "closed",
  });
  const [formAddCreditState, setFormAddCreditState] = useState<FormStateProps>({
    status: "closed",
  });
  const [initialData, setInitialData] = useState<GoalFormData>(
    {} as GoalFormData
  );
  const [editId, setEditId] = useState<string>("");

  const { goals, loading, getGoals } = useGoal();

  const formRef = useRef<FormHandles>(null);
  const formAddCreditRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      await getGoals();
    };

    loadData();
  }, []);

  const handleSubmit = async (data: GoalFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        description: Yup.string().required(ErrorsStrings.DescriptionRequired),
        goalValue: Yup.string().required(ErrorsStrings.GoalValueRequired),
      });
      await schema.validate(data, { abortEarly: false });
      if (formState.status === "edit") {
        await api.put(`/goals/${editId}`, {
          description: data.description,
          goalValue: data.goalValue,
        });
        setEditId("");
        addToast({
          type: "success",
          title: SuccessStrings.ToastTitle,
          description: SuccessStrings.ToastEditMessage,
        });
      } else if (formState.status === "add") {
        await api.post("/goals", {
          description: data.description,
          goalValue: data.goalValue,
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
      getGoals();
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

  const handleSubmitCredit = async (data: GoalIncomingFormData) => {
    try {
      formAddCreditRef.current?.setErrors({});
      const schema = Yup.object().shape({
        value: Yup.string().required(ErrorsStrings.GoalValueRequired),
        date: Yup.string().required(ErrorsStrings.DateRequired),
      });

      await schema.validate(data, { abortEarly: false });

      const body = {
        goalId: editId,
        value: data.value,
        date: data.date,
      };

      await api.post(`/goal-incoming`, body);

      setEditId("");
      addToast({
        type: "success",
        title: SuccessStrings.ToastTitle,
        description: SuccessStrings.ToastEditMessage,
      });
      setFormAddCreditState({ status: "closed" });
      getGoals();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = errorValidation(err);
        formAddCreditRef.current?.setErrors(errors);
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

    const goal = goals.find((a) => a.secureId === key);

    if (goal) {
      setEditId(key);
      setInitialData(goal);
    }
  };
  const handleDelete = async (key: string) => {
    try {
      await api.delete(`/goals/${key}`);
      getGoals();
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

  const handleAdd = async () => {
    setFormState({ status: "add" });
    setInitialData({} as GoalFormData);
  };

  const handleAddCredit = (key: string) => {
    setFormAddCreditState({ status: "add" });

    const goal = goals.find((a) => a.secureId === key);

    if (goal) {
      setEditId(key);
      setInitialData(goal);
    }
  };

  const loadList = useCallback(() => {
    return goals && goals.length > 0 ? (
      goals.map((item) => (
        <ListItem
          secureId={item.secureId}
          description={item.description}
          subDescription={item.goalValue}
          data={Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.goalBalance)}
          firstOption={handleAddCredit}
          firstOptionIcon={AiOutlinePlus}
          editItem={handleEdit}
          deleteItem={handleDelete}
        />
      ))
    ) : (
      <EmptyData />
    );
  }, [goals]);

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
                  <Loading loading={!!loading} showDescription size={30} />
                </DynamicContent>
              ) : (
                loadList()
              )}
            </List>
          </ScrollView>
        </div>
        <DynamicContent visible={formAddCreditState.status !== "closed"}>
          <Form
            ref={formAddCreditRef}
            initialData={initialData}
            onSubmit={handleSubmitCredit}
          >
            <h1>Investir</h1>

            <Input
              maxLength={25}
              name="description"
              disabled
              placeholder={Placeholders.Description}
            />
            <Input type="date" name="date" placeholder="Data" autoFocus />
            <Input name="value" placeholder="Valor" dataType="currency" />

            <ActionButtons
              loading={!!loading}
              cancelAction={() => setFormAddCreditState({ status: "closed" })}
            />
          </Form>
        </DynamicContent>

        <DynamicContent visible={formState.status !== "closed"}>
          <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
            <h1>{FormTitle}</h1>

            <Input
              maxLength={25}
              name="description"
              placeholder={Placeholders.Description}
            />
            <Input
              name="goalValue"
              placeholder={Placeholders.GoalValue}
              dataType="currency"
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

export default GoalScreen;
