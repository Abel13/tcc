import styled from "styled-components";
import { shade } from "polished";
import Colors from "../../../styles/colors.json";

export const CalendarContainer = styled.div`
  width: 380px;

  .DayPicker {
    border-radius: 0.6rem;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: ${Colors.blackTransparent};
    border-radius: 0.6rem;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 4px 6px;
    margin: 1rem 0 0 0;
    padding: 5px;
    background-color: ${Colors.inputs};
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1rem;
    padding: 0 1rem;
    color: ${Colors.secondary};

    > div {
      text-align: center;
    }
  }

  .DayPicker-Weekday {
    color: ${Colors.secondary};
  }

  .DayPicker-Day {
    width: 2rem;
    height: 2.2rem;
    font-size: 12px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: ${Colors.blackTransparent};
    border-radius: 0.6rem;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, `${Colors.background}`)};
  }

  .DayPicker-Day--today {
    font-weight: normal;
    color: ${Colors.white};
  }

  .DayPicker-Day--disabled {
    color: ${Colors.grayHard};
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: ${Colors.primary} !important;
    border-radius: 0.6rem;
    color: ${Colors.light} !important;
  }
`;
