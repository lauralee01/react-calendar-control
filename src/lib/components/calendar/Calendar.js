import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  format,
  subMonths,
  addMonths,
  addDays,
  addYears,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  differenceInDays,
  startOfYear,
} from "date-fns";
import Styles from "./Calendar.module.css";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

export const Calendar = ({isRange, onChange, value}) => {
  const [date, setDate] = useState(new Date());
  const [selectedDateFormat, setSelectedDateFormat] = useState("month");
  const [fullDateFormat] = useState("d MMMM yyyy");
  const [selectedDate, setSelectedDate] = useState(null);
  const [allDates, setAllDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      setAllDates((prevDates) => [...prevDates, new Date(selectedDate)]);
    }
    if(!isRange) {
      onChange(selectedDate)
    }
  }, [selectedDate, isRange, onChange]);

  const renderDateHeader = () => {
    switch (selectedDateFormat) {
      case "year":
        return <div data-testid="currentYear">{format(date, "yyyy")}</div>;
      default:
        return (
          <div
            onClick={() => handleDateChange("year")}
            className={Styles.header}
            data-testid="currentMonth"
          >
            {format(date, "MMMM yyyy")}
          </div>
        );
    }
  };

  const renderDaysView = () => {
    switch (selectedDateFormat) {
      case "year": {
        const dateFormat = "LLLL";
        const months = [];
        let startDate = startOfYear(date);
        for (let i = 0; i < 12; i++) {
          months.push(
            <div
              className={Styles.year}
              key={i}
              data-testid={format(addMonths(startDate, i), dateFormat)}
              onClick={() => getMonthOfYear(i)}
            >
              <p>
                {format(addMonths(startDate, i), dateFormat)}
              </p>
            </div>
          );
        }
        return (
          <div className={Styles.weekdays} data-testid="months">
            {months}
          </div>
        );
      }

      default:
        const numberDayFormat = "d";
        const dateFormat = "eee";
        const monthStart = startOfMonth(date);
        const monthEnd = endOfMonth(date);
        const startMonthWeek = startOfWeek(monthStart);
        const endMonthWeek = endOfWeek(monthEnd);
        let days = [];
        let day = startMonthWeek;
        const noOfDaysPerMonth = differenceInDays(endMonthWeek, startMonthWeek);
        if (day <= endMonthWeek) {
          for (let i = 0; i < noOfDaysPerMonth + 1; i++) {
            days.push(
              <div
                key={day}
                className={`${Styles.info} ${
                  checkDateRange(day) && Styles.range
                }`}
                onClick={() => isDateActive(days[i].key, monthStart, monthEnd)}
                value={value}
                onMouseOver={() => {
                  allDates[0] && !endDate && updateDateRange(days[i].key);
                }}
              >
                <p className={`${Styles.weektext} ${i > 6 && Styles.box}`}>
                  {format(day, dateFormat)}
                </p>
                <p
                  className={`${checkTodaysDate(day) && Styles.today} ${
                    !checkRangeOfDates(day, monthStart, monthEnd)
                      ? Styles.noDates
                      : Styles.monthDates
                  } ${getSelectedDate(day) && Styles.selectedDate}`}
                >
                  {format(day, numberDayFormat)}
                </p>
              </div>
            );
            day = addDays(day, 1);
          }
        }
        return <div className={Styles.month}>{days}</div>;
    }
  };

  const isDateActive = (date, monthStart, monthEnd) => {
    if (new Date(date) >= monthStart && new Date(date) <= monthEnd) {
      selectDate(date);
    }
  };

  const selectDate = (date) => {
    const newDate = new Date(date);
    if (allDates[0] && !currentDate) {
      setEndDate(null);
      setAllDates([]);
    }

    if (allDates[0] && currentDate) {
      setCurrentDate(null);
      setEndDate(newDate);
      setAllDates((prevDates) => prevDates.slice(0, -1));
    }
    setSelectedDate(() => newDate);
   
    if(isRange) {
      onChange(allDates)
    }
  };

  const checkDateRange = (day) => {
    const startDate = allDates[0];
    const endDate = allDates[1];
    return day >= startDate && day <= endDate;
  };

  const updateDateRange = (day) => {
    setCurrentDate(day);
    if (allDates[0] && currentDate && !endDate) {
      setAllDates(() => [allDates[0], new Date(currentDate)]);
    }
  };

  const checkRangeOfDates = (date, monthStart, monthEnd) => {
    return date >= monthStart && date <= monthEnd;
  };

  const getSelectedDate = (date) => {
    if (selectedDate) {
      return (
        format(new Date(selectedDate), fullDateFormat) ===
        format(date, fullDateFormat)
      );
    }
  };

  const checkTodaysDate = (date) => {
    return format(date, fullDateFormat) === format(new Date(), fullDateFormat);
  };

  const getMonthOfYear = (month) => {
    const year = format(date, "yyyy");
    const selectedMonth = new Date(year, month, 1);
    setSelectedDateFormat(() => "month");
    setDate(() => selectedMonth);
  };

  const displayPreviousData = () => {
    switch (selectedDateFormat) {
      case "year":
        setDate(() => subYears(date, 1));
        break;
      default:
        setDate(() => subMonths(date, 1));
        renderDaysView();
    }
  };

  const displayNextData = () => {
    switch (selectedDateFormat) {
      case "year":
        setDate(() => addYears(date, 1));
        break;
      default:
        setDate(() => addMonths(date, 1));
        renderDaysView();
    }
  };

  const handleDateChange = (name) => {
    setSelectedDateFormat(() => name);
  };

  return (
    <div className={Styles.control}>
      <div className={Styles.wrapper}>
        <KeyboardArrowLeft
          className={Styles.icon}
          onClick={() => displayPreviousData()}
        />
        {renderDateHeader()}
        <KeyboardArrowRight
          className={Styles.icon}
          onClick={() => displayNextData()}
        />
      </div>
      <div>{renderDaysView()}</div>
    </div>
  );
};

Calendar.propTypes = {
  value: PropTypes.instanceOf(Date),
  isRange: PropTypes.bool,
  onChange: PropTypes.func,
};

Calendar.defaultProps = {
  value: null,
  isRange: false,
  onChange: () => {},
};
