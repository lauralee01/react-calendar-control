"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var React = _interopRequireWildcard(require("react"));
var _react2 = require("@testing-library/react");
var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));
var _Calendar = require("../components/calendar/Calendar");
var _dateFns = require("date-fns");
test("it displays the current month in the calandar", function () {
  (0, _react2.render)( /*#__PURE__*/React.createElement(_Calendar.Calendar, null));
  var currentDateEl = _react2.screen.getByTestId("currentMonth");
  var currentDate = (0, _dateFns.format)(new Date(), "MMMM yyyy");
  expect(currentDateEl).toHaveTextContent(currentDate);
});
test("it displays the next month of the year when the right arrow is clicked on", function () {
  (0, _react2.render)( /*#__PURE__*/React.createElement(_Calendar.Calendar, null));
  var arrowRightEl = _react2.screen.getByTestId("KeyboardArrowRightIcon");
  var currentDateEl = _react2.screen.getByTestId("currentMonth");
  _userEvent.default.click(arrowRightEl);
  var nextDate = (0, _dateFns.addMonths)(new Date(), 1);
  var newDate = (0, _dateFns.format)(nextDate, "MMMM yyyy");
  expect(currentDateEl).toHaveTextContent(newDate);
});
test("it displays the previous month of the year when the left arrow is clicked on", function () {
  (0, _react2.render)( /*#__PURE__*/React.createElement(_Calendar.Calendar, null));
  var arrowLeftEl = _react2.screen.getByTestId("KeyboardArrowLeftIcon");
  var currentDateEl = _react2.screen.getByTestId("currentMonth");
  _userEvent.default.click(arrowLeftEl);
  var prevDate = (0, _dateFns.subMonths)(new Date(), 1);
  var newDate = (0, _dateFns.format)(prevDate, "MMMM yyyy");
  expect(currentDateEl).toHaveTextContent(newDate);
});
test("it displays the months of the current year when the month is clicked on", function () {
  (0, _react2.render)( /*#__PURE__*/React.createElement(_Calendar.Calendar, null));
  var currentMonthEl = _react2.screen.getByTestId("currentMonth");
  _userEvent.default.click(currentMonthEl);
  var monthsEl = _react2.screen.queryByTestId("months");
  expect(monthsEl).toBeInTheDocument();
});
test("it displays the next year when the right arrow is clicked on", function () {
  (0, _react2.render)( /*#__PURE__*/React.createElement(_Calendar.Calendar, null));
  var arrowRightEl = _react2.screen.getByTestId("KeyboardArrowRightIcon");
  var currentDateEl = _react2.screen.getByTestId("currentMonth");
  _userEvent.default.click(currentDateEl);
  _userEvent.default.click(arrowRightEl);
  var nextDate = (0, _dateFns.addYears)(new Date(), 1);
  var newDate = (0, _dateFns.format)(nextDate, "yyyy");
  expect(currentDateEl).toHaveTextContent(newDate);
});
test("it displays the previous year when the left arrow is clicked on", function () {
  (0, _react2.render)( /*#__PURE__*/React.createElement(_Calendar.Calendar, null));
  var arrowRightEl = _react2.screen.getByTestId("KeyboardArrowLeftIcon");
  var currentDateEl = _react2.screen.getByTestId("currentMonth");
  _userEvent.default.click(currentDateEl);
  _userEvent.default.click(arrowRightEl);
  var prevDate = (0, _dateFns.subYears)(new Date(), 1);
  var newDate = (0, _dateFns.format)(prevDate, "yyyy");
  expect(currentDateEl).toHaveTextContent(newDate);
});
test("it displays the month of the year clicked on after the year is clicked", function () {
  (0, _react2.render)( /*#__PURE__*/React.createElement(_Calendar.Calendar, null));
  var currentDateEl = _react2.screen.getByTestId("currentMonth");
  _userEvent.default.click(currentDateEl);
  var monthEl = _react2.screen.queryByTestId("May");
  _userEvent.default.click(monthEl);
  expect(currentDateEl).toHaveTextContent("May 2022");
});