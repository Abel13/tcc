import "react-day-picker/lib/style.css";

import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  ScrollView,
  ChartPie,
  ChartBar,
  EmptyData,
  Card,
  Loading,
  Calendar,
} from "../../../components/atoms";
import {
  Header,
  Menu,
  AccountsBalance,
  TimelineItem,
} from "../../../components/molecules";
import {
  Body,
  List,
  Container,
  RightBar,
  Content,
  AccountItem,
  AccountList,
  AccountsContainer,
  ContentScrolled,
  CalendarContainer,
  CalendarList,
} from "./styles";
import { useDashboard } from "../../../hooks/Dashboard";
import { PieData } from "../../../components/atoms/ChartPie/interfaces";
import { TimelineItemProps } from "../../../components/molecules/TimelineItem/interfaces";

const Dashboard: React.FC = () => {
  const { totalBalance, accounts, timeline, earnings, loading, getDashboard } =
    useDashboard();
  const [dataProvided, setDataProvided] = useState<PieData[]>();
  const [dayTransactions, setDayTransactions] = useState<TimelineItemProps[]>(
    [] as TimelineItemProps[]
  );
  const [loadingDayTransactions, setLoadingDayTransactions] = useState(false);

  useEffect(() => {
    getDashboard();
  }, []);

  useEffect(() => {
    handleDayClick(new Date());
  }, [timeline]);

  useEffect(() => {
    if (accounts) {
      const list = accounts
        .filter((a) => a.active)
        .map((e) => {
          return {
            name: e.name,
            value: Number(e.balance),
          };
        });
      setDataProvided(list);
    }
  }, [accounts]);

  const filterDate = (date: Date): Promise<TimelineItemProps[]> => {
    return new Promise((resolve) => {
      const transactions = timeline.filter((item) => {
        return dayjs(item.date).isSame(date, "date");
      });

      resolve(transactions);
    });
  };

  const handleDayClick = useCallback(
    async (date: Date) => {
      setLoadingDayTransactions(true);
      if (timeline) {
        const transactions = await filterDate(date);
        setDayTransactions(transactions);
      } else {
        setDayTransactions([]);
      }
      setLoadingDayTransactions(false);
    },
    [timeline]
  );

  return (
    <Container>
      <Header logoVisible profileVisible exitButtonVisible />
      <Body>
        <Menu />
        {loading ? (
          <Content>
            <Loading type="bounce" showDescription />
          </Content>
        ) : (
          <Content>
            <ScrollView>
              <ContentScrolled>
                <Card height={380} width={800}>
                  <CalendarContainer>
                    <Calendar onDayPress={handleDayClick} />
                    <ScrollView>
                      {loadingDayTransactions ? (
                        <Content>
                          <Loading type="clock" />
                        </Content>
                      ) : (
                        <CalendarList>
                          {dayTransactions.map((item) => {
                            return (
                              <TimelineItem
                                date={item.date}
                                kind={item.kind}
                                description={item.description}
                                value={item.value}
                              />
                            );
                          })}
                        </CalendarList>
                      )}
                    </ScrollView>
                  </CalendarContainer>
                </Card>

                <Card width={500} height={380}>
                  <h2>Contas</h2>
                  {dataProvided && dataProvided.length > 0 ? (
                    <AccountsContainer>
                      <AccountList>
                        <ScrollView>
                          {dataProvided.map((d) => {
                            return (
                              <AccountItem>
                                <span>{d.name}</span>
                                <h2>
                                  {Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }).format(d.value)}
                                </h2>
                              </AccountItem>
                            );
                          })}
                        </ScrollView>
                      </AccountList>
                      <ChartPie data={dataProvided} />
                    </AccountsContainer>
                  ) : (
                    <EmptyData />
                  )}
                </Card>
                <Card height={380} width={800}>
                  <h2>Rendimento</h2>
                  <AccountsContainer>
                    <ScrollView>
                      {earnings && (
                        <ChartBar
                          data={earnings.map((item) => {
                            return {
                              name: dayjs(item.month).format("MMM-YY"),
                              value: item.balance,
                            };
                          })}
                        />
                      )}
                    </ScrollView>
                  </AccountsContainer>
                </Card>
              </ContentScrolled>
            </ScrollView>
          </Content>
        )}
        <RightBar>
          <AccountsBalance balance={totalBalance} />
          <ScrollView>
            <List>
              {timeline &&
                timeline.map((item) => {
                  return (
                    <TimelineItem
                      kind={item.kind}
                      description={item.description}
                      value={item.value}
                      date={item.date}
                    />
                  );
                })}
            </List>
          </ScrollView>
        </RightBar>
      </Body>
    </Container>
  );
};

export default Dashboard;
