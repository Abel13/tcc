import React, { useCallback, useEffect } from "react";

import dayjs from "dayjs";
import {
  AiFillCheckCircle,
  AiFillClockCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { CategoryProps, ListItemPlanProps } from "./interfaces";
import {
  ListItemPlanContainer,
  Description,
  Value,
  MainContentContainer,
  Date,
  BottomContainer,
  Category,
  StatusContainer,
} from "./styles";
import { Button, Check, DynamicContent } from "../../atoms";
import Colors from "../../../styles/colors.json";

const ListItemPlan: React.FC<ListItemPlanProps> = ({
  plan,
  editItem,
  deleteItem,
  finishPlan,
}) => {
  const [dueText, setDueText] = React.useState("");
  const [category, setCategory] = React.useState<CategoryProps>({
    categoryType: "default",
  });
  const [dueColor, setDueColor] = React.useState(Colors.gray);

  useEffect(() => {
    if (plan.goalId) {
      setCategory({ categoryType: "investments" });
      return;
    }

    switch (plan.group) {
      case "Gastos Essenciais":
        setCategory({ categoryType: "fixedExpenses" });
        break;
      case "Estilo de Vida":
        setCategory({ categoryType: "variableExpenses" });
        break;
      case "Renda":
        setCategory({ categoryType: "revenues" });
        break;
      default:
        setCategory({ categoryType: "default" });
        break;
    }
  }, [plan]);

  const getDueDate = useCallback(() => {
    if (plan.done) {
      setDueText("Concluído");
      setDueColor(Colors.success);
    } else if (plan.dueDate) {
      const date = dayjs(plan.dueDate);
      const today = dayjs();
      const diff = date.diff(today, "day");

      if (diff < 0 && !plan.done) {
        setDueColor(Colors.danger);
        setDueText("Atrasado");
      }

      if (diff >= 0 && !plan.done) {
        setDueColor(Colors.warning);
        setDueText(diff === 0 ? `Vence hoje` : `Faltam ${diff} dias`);
      }
    }
    return Colors.primary;
  }, [dueText]);

  useEffect(() => {
    getDueDate();
  }, [plan]);

  return (
    <ListItemPlanContainer categoryType={category.categoryType}>
      <DynamicContent style={{ marginRight: 10 }} visible={!!plan.dueDate}>
        <Date>{dayjs(plan.dueDate).format("DD-MMM")}</Date>
      </DynamicContent>

      <MainContentContainer>
        <Description>{plan.description}</Description>
        <BottomContainer>
          <Value>
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(plan.value))}
          </Value>
          <Category>{plan.category || plan.goal}</Category>
        </BottomContainer>
      </MainContentContainer>

      <StatusContainer>
        {plan.done ? (
          <AiFillCheckCircle color={Colors.success} size={20} />
        ) : (
          <AiFillClockCircle color={dueColor} size={20} />
        )}
        <span>{dueText}</span>
      </StatusContainer>

      <DynamicContent style={{ margin: 2 }} visible>
        <Check
          disabled={plan.done}
          checked={plan.done}
          onChange={(event, checked) => finishPlan(checked, plan.secureId)}
        />
      </DynamicContent>
      <DynamicContent style={{ margin: 2 }} visible>
        <Button
          onClick={() => {
            editItem(plan.secureId);
          }}
          buttonType="transparent"
        >
          <AiOutlineEdit />
        </Button>
      </DynamicContent>
      <DynamicContent style={{ margin: 2 }} visible>
        <Button
          onClick={() => deleteItem(plan.secureId)}
          buttonType="transparent"
        >
          <AiOutlineDelete />
        </Button>
      </DynamicContent>
    </ListItemPlanContainer>
  );
};

export default ListItemPlan;
