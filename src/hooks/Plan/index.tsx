import dayjs from "dayjs";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Plan } from "../../models/plan";

import api from "../../services/api";
import { PlanContextData, PlanState } from "./interfaces";
import { useDate } from "../Date";

const PlanContext = createContext<PlanContextData>({} as PlanContextData);

export const PlanProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<PlanState>({
    loading: false,
    plans: [],
  } as PlanState);

  const { endOfThisMonth } = useDate();

  const getPlan = useCallback(
    async (startDate: string, endDate: string) => {
      setData({
        ...data,
        loading: true,
      });

      const response = await api.get<Plan[]>(`plan/${startDate}/${endDate}`);

      const plans = response.data;

      let datedPlans = [] as Plan[];
      if (plans && plans.length > 0) {
        datedPlans = plans.map<Plan>((item: Plan) => {
          return {
            ...item,
            dueDate: dayjs(item.dueDate).add(1, "d").toDate(),
          };
        }) as Plan[];
      }

      console.log(datedPlans);

      setData({
        loading: false,
        plans: datedPlans,
      });
    },
    [data]
  );

  const postPlan = useCallback(
    async (plan: Plan) => {
      setData({
        ...data,
        loading: true,
      });
      const plans = data.plans ?? [];

      const response = await api.post<Plan>("plan", plan);
      const newPlan = { ...plan, secureId: response.data.secureId };

      setData({
        loading: false,
        plans: [...plans, newPlan],
      });
    },
    [data]
  );

  const deletePlan = useCallback(
    async (secureId: string) => {
      setData({
        ...data,
        loading: true,
      });

      try {
        const plans = data.plans ?? [];

        await api.delete(`plan/${secureId}`);

        setData({
          ...data,
          plans: plans.filter((plan) => plan.secureId !== secureId),
          loading: false,
        });
      } catch (error) {
        setData({
          ...data,
          loading: false,
        });
        throw error;
      }
    },
    [data]
  );

  const updatePlan = useCallback(
    async (secureId: string, plan: Plan) => {
      setData({
        ...data,
        loading: true,
      });
      try {
        const response = await api.put<Plan>(`plan/${secureId}`, plan);

        const newPlanList: Plan[] = data.plans.map((p) =>
          p.secureId === secureId
            ? {
                ...p,
                categoryId: response.data.categoryId,
                goalId: response.data.goalId,
                group: response.data.group,
                description: response.data.description,
                value: response.data.value,
                dueDate: dayjs(response.data.dueDate).add(1, "d").toDate(),
                repeat: response.data.repeat,
                done: response.data.done,
                category: response.data.category,
                goal: response.data.goal,
                stop: response.data.stop,
              }
            : p
        );

        const newData = {
          ...data,
          loading: false,
          plans: newPlanList,
        };

        setData(newData);

        console.log("KKKKK", newData);
      } catch (error) {
        setData({
          ...data,
          loading: false,
        });
        throw error;
      }
    },
    [data]
  );

  const finishPlan = useCallback(
    async (secureId: string, status: boolean) => {
      setData({
        ...data,
        loading: true,
      });

      const response = await api.put<any>(`plan/${secureId}`, {
        done: status,
      });

      const newPlanList = data.plans.map((p) =>
        p.secureId === secureId ? { ...p, done: status } : p
      );

      const { repeatPlan } = response.data;

      if (!dayjs(repeatPlan.dueDate).isAfter(endOfThisMonth))
        newPlanList.push(repeatPlan);

      setData({
        loading: false,
        plans: newPlanList,
      });
    },
    [data]
  );

  return (
    <PlanContext.Provider
      value={{
        loading: data.loading,
        plans: data.plans.sort((a, b) =>
          a.dueDate.toDateString().localeCompare(b.dueDate.toDateString())
        ),
        getPlan,
        postPlan,
        deletePlan,
        updatePlan,
        finishPlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export function usePlan(): PlanContextData {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
