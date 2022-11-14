import * as React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Calendar } from '../components/calendar/Calendar';
import { format, addMonths, subMonths, addYears, subYears } from 'date-fns'

test("it displays the current month in the calandar", () => {
    render(<Calendar />);
    const currentDateEl = screen.getByTestId("currentMonth");
    const currentDate = format(new Date(), "MMMM yyyy");
    expect(currentDateEl).toHaveTextContent(currentDate)
})

test("it displays the next month of the year when the right arrow is clicked on", () => {
    render(<Calendar />);
    const arrowRightEl = screen.getByTestId("KeyboardArrowRightIcon");
    const currentDateEl = screen.getByTestId("currentMonth");
    userEvent.click(arrowRightEl);
    const nextDate = addMonths(new Date(), 1);
    const newDate = format(nextDate, "MMMM yyyy");
    expect(currentDateEl).toHaveTextContent(newDate);
})

test("it displays the previous month of the year when the left arrow is clicked on", () => {
    render(<Calendar />);
    const arrowLeftEl = screen.getByTestId("KeyboardArrowLeftIcon");
    const currentDateEl = screen.getByTestId("currentMonth");
    userEvent.click(arrowLeftEl);
    const prevDate = subMonths(new Date(), 1);
    const newDate = format(prevDate, "MMMM yyyy");
    expect(currentDateEl).toHaveTextContent(newDate);
})

test("it displays the months of the current year when the month is clicked on", () => {
    render(<Calendar />);
    const currentMonthEl = screen.getByTestId("currentMonth");
    userEvent.click(currentMonthEl);
    const monthsEl = screen.queryByTestId("months");
    expect(monthsEl).toBeInTheDocument()
})

test("it displays the next year when the right arrow is clicked on", () => {
    render(<Calendar />);
    const arrowRightEl = screen.getByTestId("KeyboardArrowRightIcon");
    const currentDateEl = screen.getByTestId("currentMonth");
    userEvent.click(currentDateEl);
    userEvent.click(arrowRightEl);
    const nextDate = addYears(new Date(), 1);
    const newDate = format(nextDate, "yyyy");
    expect(currentDateEl).toHaveTextContent(newDate);
})

test("it displays the previous year when the left arrow is clicked on", () => {
    render(<Calendar />);
    const arrowRightEl = screen.getByTestId("KeyboardArrowLeftIcon");
    const currentDateEl = screen.getByTestId("currentMonth");
    userEvent.click(currentDateEl);
    userEvent.click(arrowRightEl);
    const prevDate = subYears(new Date(), 1);
    const newDate = format(prevDate, "yyyy");
    expect(currentDateEl).toHaveTextContent(newDate);
})

test("it displays the month of the year clicked on after the year is clicked", () => {
    render(<Calendar />);
    const currentDateEl = screen.getByTestId("currentMonth");
    userEvent.click(currentDateEl);
    const monthEl = screen.queryByTestId("May");
    userEvent.click(monthEl);
    expect(currentDateEl).toHaveTextContent("May 2022");
})
