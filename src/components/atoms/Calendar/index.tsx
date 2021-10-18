import React, { useCallback, useState } from "react";
import DayPicker from "react-day-picker";
import { CalendarContainer } from "./styles";

import { CalendarProps } from "./interfaces";
import { dayjsConfig } from "../../../services/dayjs";

const Calendar: React.FC<CalendarProps> = ({ onDayPress }) => {
  const [selectedDay, setSelectedDay] = useState(new Date());

  const handleDayClick = useCallback((day: Date) => {
    setSelectedDay(day);
    onDayPress(day);
  }, []);

  const { weekdaysMin } = dayjsConfig;

  return (
    <CalendarContainer>
      <DayPicker
        weekdaysShort={weekdaysMin}
        modifiers={{
          available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6, 7] },
        }}
        onDayClick={handleDayClick}
        selectedDays={selectedDay}
        months={[
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ]}
      />
    </CalendarContainer>
  );
};

export default Calendar;
