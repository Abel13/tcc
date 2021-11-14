import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ChartPie, ScrollView } from "../../../components/atoms";
import { Header, PageTitle } from "../../../components/molecules";
import { useDate } from "../../../hooks/Date";
import Colors from "../../../styles/colors.json";

import {
  ReportContainer,
  CashFlowBody,
  DataContainer,
  IncomingContainer,
  ChartContainer,
  PlanedChart,
  CarriedOutChart,
  GridContainer,
  CashFlowReport,
  HeaderContainer,
  Error,
} from "./styles";
import { useCashFLow } from "../../../hooks/CashFlow";
import { FiAlertTriangle } from "react-icons/fi";

const useStyles = makeStyles({
  table: {},
});

const CashFlowScreen: React.FC = () => {
  const classes = useStyles();
  const [totalSum, setTotalSum] = useState(0);
  const [totalSumPlan, setTotalSumPlan] = useState(0);

  const {
    totalIncomings,
    totalIncomingsPlan,
    totalVariable,
    totalVariablePlan,
    totalInvestments,
    totalInvestmentsPlan,
    totalFixed,
    totalFixedPlan,

    incomings,
    investments,
    variableOutgoings,
    fixedOutgoings,

    planIssue,
    realizedIssue,

    getCashFlow,
  } = useCashFLow();

  const dataRealized = [
    {
      name: "Fixos",
      value: Number(totalFixed),
      color: Colors.fixedExpenses,
    },
    {
      name: "Variáveis",
      value: Number(totalVariable),
      color: Colors.variableExpenses,
    },
    {
      name: "Investimentos",
      value: Number(totalInvestments),
      color: Colors.investments,
    },
  ];

  const dataPlanned = [
    {
      name: "Fixos",
      value: Number(totalFixedPlan),
      color: Colors.fixedExpenses,
    },
    {
      name: "Variáveis",
      value: Number(totalVariablePlan),
      color: Colors.variableExpenses,
    },
    {
      name: "Investimentos",
      value: Number(totalInvestmentsPlan),
      color: Colors.investments,
    },
  ];

  const {
    actualDate,
    endOfThisMonth,
    actualMonth,
    actualYear,
    nextMonth,
    previousMonth,
  } = useDate();

  useEffect(() => {
    setTotalSum(
      totalIncomings - (totalVariable + totalFixed + totalInvestments)
    );
    setTotalSumPlan(
      totalIncomingsPlan -
        (totalVariablePlan + totalFixedPlan + totalInvestmentsPlan)
    );
  }, [
    totalIncomings,
    totalInvestments,
    totalVariable,
    totalFixed,
    totalIncomingsPlan,
    totalInvestmentsPlan,
    totalVariablePlan,
    totalFixedPlan,
  ]);

  const handleForwardMonth = useCallback(() => {
    nextMonth();
  }, [actualDate, endOfThisMonth]);

  const handleBackwardMonth = useCallback(() => {
    previousMonth();
  }, [actualDate, endOfThisMonth]);

  useEffect(() => {
    getCashFlow(actualDate, endOfThisMonth);
  }, [actualDate, endOfThisMonth]);

  return (
    <ReportContainer>
      <Header backButtonVisible logoVisible />
      <CashFlowBody>
        <CashFlowReport>
          <PageTitle
            title="Fluxo de Caixa"
            total={0}
            month={actualMonth}
            year={actualYear}
            forwardMonth={handleForwardMonth}
            backwardMonth={handleBackwardMonth}
          />

          <DataContainer>
            <ScrollView>
              <GridContainer>
                <IncomingContainer kind="revenue">
                  <span>RECEITA/ENTRADAS</span>
                  <TableContainer>
                    <Table className={classes.table} aria-label="caption table">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell align="right">Planejado</TableCell>
                          <TableCell align="right">Realizado</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {incomings &&
                          incomings.map((row) => (
                            <TableRow key={row.name}>
                              <TableCell
                                component="th"
                                scope="row"
                                style={{
                                  width: "40%",
                                }}
                              >
                                {row.name}
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  width: "30%",
                                }}
                              >
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(row.plan)}
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  width: "30%",
                                }}
                              >
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(row.value)}
                              </TableCell>
                            </TableRow>
                          ))}
                        <TableRow>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            Subtotal
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalIncomingsPlan)}
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalIncomings)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </IncomingContainer>

                <IncomingContainer kind="investment">
                  <span>INVESTIMENTOS</span>
                  <TableContainer>
                    <Table className={classes.table} aria-label="caption table">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell align="right">Planejado</TableCell>
                          <TableCell align="right">Realizado</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {investments &&
                          investments.map((row) => (
                            <TableRow key={row.name}>
                              <TableCell
                                component="th"
                                scope="row"
                                style={{
                                  width: "40%",
                                }}
                              >
                                {row.name}
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  width: "30%",
                                }}
                              >
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(row.plan)}
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  width: "30%",
                                }}
                              >
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(row.value)}
                              </TableCell>
                            </TableRow>
                          ))}
                        <TableRow>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            Subtotal
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalInvestmentsPlan)}
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalInvestments)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </IncomingContainer>

                <IncomingContainer kind="fixed">
                  <span>GASTOS FIXOS</span>
                  <TableContainer>
                    <Table className={classes.table} aria-label="caption table">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell align="right">Planejado</TableCell>
                          <TableCell align="right">Realizado</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {fixedOutgoings &&
                          fixedOutgoings.map((row) => (
                            <TableRow key={row.name}>
                              <TableCell
                                component="th"
                                scope="row"
                                style={{
                                  width: "40%",
                                }}
                              >
                                {row.name}
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  width: "30%",
                                }}
                              >
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(row.plan)}
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  width: "30%",
                                }}
                              >
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(row.value)}
                              </TableCell>
                            </TableRow>
                          ))}
                        <TableRow>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            Subtotal
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalFixedPlan)}
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalFixed)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </IncomingContainer>

                <IncomingContainer kind="variable">
                  <span>GASTOS VARIÁVEIS</span>
                  <TableContainer>
                    <Table className={classes.table} aria-label="caption table">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell align="right">Planejado</TableCell>
                          <TableCell align="right">Realizado</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {variableOutgoings &&
                          variableOutgoings.map((row) => (
                            <TableRow key={row.name}>
                              <TableCell
                                component="th"
                                scope="row"
                                style={{
                                  width: "40%",
                                }}
                              >
                                {row.name}
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  width: "30%",
                                }}
                              >
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(row.plan)}
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  width: "30%",
                                }}
                              >
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(row.value)}
                              </TableCell>
                            </TableRow>
                          ))}
                        <TableRow>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            Subtotal
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalVariablePlan)}
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalVariable)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </IncomingContainer>

                <IncomingContainer kind="total">
                  <span>TOTAIS</span>
                  <TableContainer>
                    <Table className={classes.table} aria-label="caption table">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell align="right">Planejado</TableCell>
                          <TableCell align="right">Realizado</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key="incomings">
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              width: "40%",
                            }}
                          >
                            FATURAMENTO
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              width: "30%",
                            }}
                          >
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalIncomingsPlan)}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              width: "30%",
                            }}
                          >
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalIncomings)}
                          </TableCell>
                        </TableRow>

                        <TableRow key="incomings">
                          <TableCell component="th" scope="row">
                            INVESTIMENTOS
                          </TableCell>
                          <TableCell align="right">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalInvestmentsPlan)}
                          </TableCell>
                          <TableCell align="right">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalInvestments)}
                          </TableCell>
                        </TableRow>

                        <TableRow key="incomings">
                          <TableCell component="th" scope="row">
                            GASTOS FIXOS/ESSENCIAIS
                          </TableCell>
                          <TableCell align="right">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalFixedPlan)}
                          </TableCell>
                          <TableCell align="right">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalFixed)}
                          </TableCell>
                        </TableRow>

                        <TableRow key="incomings">
                          <TableCell component="th" scope="row">
                            GASTOS VARIÁVEIS/ESTILO DE VIDA
                          </TableCell>
                          <TableCell align="right">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalVariablePlan)}
                          </TableCell>
                          <TableCell align="right">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalVariable)}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            Saldo não alocado
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalSumPlan)}
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "bold" }}
                            align="right"
                          >
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(totalSum)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </IncomingContainer>
              </GridContainer>
            </ScrollView>
          </DataContainer>
        </CashFlowReport>
        <ScrollView>
          <ChartContainer>
            <PlanedChart>
              <HeaderContainer>
                <span>Planejado</span>
                <Error title="Regra 50 / 30 / 20 não está sendo cumprida!">
                  {planIssue && <FiAlertTriangle />}
                </Error>
              </HeaderContainer>
              <ChartPie data={dataPlanned} />
            </PlanedChart>
            <CarriedOutChart>
              <HeaderContainer>
                <span>Realizado</span>
                <Error title="Regra 50 / 30 / 20 não está sendo cumprida!">
                  {realizedIssue && <FiAlertTriangle />}
                </Error>
              </HeaderContainer>
              <ChartPie data={dataRealized} />
            </CarriedOutChart>
          </ChartContainer>
        </ScrollView>
      </CashFlowBody>
    </ReportContainer>
  );
};

export default CashFlowScreen;
