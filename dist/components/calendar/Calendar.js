"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _dateFns = require("date-fns");
var _CalendarModule = _interopRequireDefault(require("./Calendar.module.css"));
var _iconsMaterial = require("@mui/icons-material");
var Calendar = function Calendar(_ref) {
  var isRange = _ref.isRange,
    onChange = _ref.onChange,
    value = _ref.value;
  var _useState = (0, _react.useState)(new Date()),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    date = _useState2[0],
    setDate = _useState2[1];
  var _useState3 = (0, _react.useState)("month"),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    selectedDateFormat = _useState4[0],
    setSelectedDateFormat = _useState4[1];
  var _useState5 = (0, _react.useState)("d MMMM yyyy"),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 1),
    fullDateFormat = _useState6[0];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    selectedDate = _useState8[0],
    setSelectedDate = _useState8[1];
  var _useState9 = (0, _react.useState)([]),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    allDates = _useState10[0],
    setAllDates = _useState10[1];
  var _useState11 = (0, _react.useState)(null),
    _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
    currentDate = _useState12[0],
    setCurrentDate = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
    endDate = _useState14[0],
    setEndDate = _useState14[1];
  (0, _react.useEffect)(function () {
    if (selectedDate) {
      setAllDates(function (prevDates) {
        return [].concat((0, _toConsumableArray2.default)(prevDates), [new Date(selectedDate)]);
      });
    }
  }, [selectedDate]);
  var renderDateHeader = function renderDateHeader() {
    switch (selectedDateFormat) {
      case "year":
        return /*#__PURE__*/_react.default.createElement("div", {
          "data-testid": "currentYear"
        }, (0, _dateFns.format)(date, "yyyy"));
      default:
        return /*#__PURE__*/_react.default.createElement("div", {
          onClick: function onClick() {
            return handleDateChange("year");
          },
          className: _CalendarModule.default.header,
          "data-testid": "currentMonth"
        }, (0, _dateFns.format)(date, "MMMM yyyy"));
    }
  };
  var renderDaysView = function renderDaysView() {
    var _ret = function () {
      switch (selectedDateFormat) {
        case "year":
          {
            var _dateFormat = "LLLL";
            var months = [];
            var startDate = (0, _dateFns.startOfYear)(date);
            var _loop = function _loop(i) {
              months.push( /*#__PURE__*/_react.default.createElement("div", {
                className: _CalendarModule.default.year,
                key: i,
                "data-testid": (0, _dateFns.format)((0, _dateFns.addMonths)(startDate, i), _dateFormat),
                onClick: function onClick() {
                  return getMonthOfYear(i);
                }
              }, /*#__PURE__*/_react.default.createElement("p", null, (0, _dateFns.format)((0, _dateFns.addMonths)(startDate, i), _dateFormat))));
            };
            for (var i = 0; i < 12; i++) {
              _loop(i);
            }
            return {
              v: /*#__PURE__*/_react.default.createElement("div", {
                className: _CalendarModule.default.weekdays,
                "data-testid": "months"
              }, months)
            };
          }
        default:
          var numberDayFormat = "d";
          var dateFormat = "eee";
          var monthStart = (0, _dateFns.startOfMonth)(date);
          var monthEnd = (0, _dateFns.endOfMonth)(date);
          var startMonthWeek = (0, _dateFns.startOfWeek)(monthStart);
          var endMonthWeek = (0, _dateFns.endOfWeek)(monthEnd);
          var days = [];
          var day = startMonthWeek;
          var noOfDaysPerMonth = (0, _dateFns.differenceInDays)(endMonthWeek, startMonthWeek);
          if (day <= endMonthWeek) {
            var _loop2 = function _loop2(_i) {
              days.push( /*#__PURE__*/_react.default.createElement("div", {
                key: day,
                className: "".concat(_CalendarModule.default.info, " ").concat(checkDateRange(day) && _CalendarModule.default.range),
                onClick: function onClick() {
                  return isDateActive(days[_i].key, monthStart, monthEnd);
                },
                value: value,
                onMouseOver: function onMouseOver() {
                  allDates[0] && !endDate && updateDateRange(days[_i].key);
                }
              }, /*#__PURE__*/_react.default.createElement("p", {
                className: "".concat(_CalendarModule.default.weektext, " ").concat(_i > 6 && _CalendarModule.default.box)
              }, (0, _dateFns.format)(day, dateFormat)), /*#__PURE__*/_react.default.createElement("p", {
                className: "".concat(checkTodaysDate(day) && _CalendarModule.default.today, " ").concat(!checkRangeOfDates(day, monthStart, monthEnd) ? _CalendarModule.default.noDates : _CalendarModule.default.monthDates, " ").concat(getSelectedDate(day) && _CalendarModule.default.selectedDate)
              }, (0, _dateFns.format)(day, numberDayFormat))));
              day = (0, _dateFns.addDays)(day, 1);
            };
            for (var _i = 0; _i < noOfDaysPerMonth + 1; _i++) {
              _loop2(_i);
            }
          }
          return {
            v: /*#__PURE__*/_react.default.createElement("div", {
              className: _CalendarModule.default.month
            }, days)
          };
      }
    }();
    if (typeof _ret === "object") return _ret.v;
  };
  var isDateActive = function isDateActive(date, monthStart, monthEnd) {
    if (new Date(date) >= monthStart && new Date(date) <= monthEnd) {
      selectDate(date);
    }
  };
  var selectDate = function selectDate(date) {
    var newDate = new Date(date);
    if (allDates[0] && !currentDate) {
      setEndDate(null);
      setAllDates([]);
    }
    if (allDates[0] && currentDate) {
      setCurrentDate(null);
      setEndDate(newDate);
      setAllDates(function (prevDates) {
        return prevDates.slice(0, -1);
      });
    }
    setSelectedDate(function () {
      return newDate;
    });
    onChange(selectedDate);
    if (isRange) {
      onChange(allDates);
    }
  };
  var checkDateRange = function checkDateRange(day) {
    var startDate = allDates[0];
    var endDate = allDates[1];
    return day >= startDate && day <= endDate;
  };
  var updateDateRange = function updateDateRange(day) {
    setCurrentDate(day);
    if (allDates[0] && currentDate && !endDate) {
      setAllDates(function () {
        return [allDates[0], new Date(currentDate)];
      });
    }
  };
  var checkRangeOfDates = function checkRangeOfDates(date, monthStart, monthEnd) {
    return date >= monthStart && date <= monthEnd;
  };
  var getSelectedDate = function getSelectedDate(date) {
    if (selectedDate) {
      return (0, _dateFns.format)(new Date(selectedDate), fullDateFormat) === (0, _dateFns.format)(date, fullDateFormat);
    }
  };
  var checkTodaysDate = function checkTodaysDate(date) {
    return (0, _dateFns.format)(date, fullDateFormat) === (0, _dateFns.format)(new Date(), fullDateFormat);
  };
  var getMonthOfYear = function getMonthOfYear(month) {
    var year = (0, _dateFns.format)(date, "yyyy");
    var selectedMonth = new Date(year, month, 1);
    setSelectedDateFormat(function () {
      return "month";
    });
    setDate(function () {
      return selectedMonth;
    });
  };
  var displayPreviousData = function displayPreviousData() {
    switch (selectedDateFormat) {
      case "year":
        setDate(function () {
          return (0, _dateFns.subYears)(date, 1);
        });
        break;
      default:
        setDate(function () {
          return (0, _dateFns.subMonths)(date, 1);
        });
        renderDaysView();
    }
  };
  var displayNextData = function displayNextData() {
    switch (selectedDateFormat) {
      case "year":
        setDate(function () {
          return (0, _dateFns.addYears)(date, 1);
        });
        break;
      default:
        setDate(function () {
          return (0, _dateFns.addMonths)(date, 1);
        });
        renderDaysView();
    }
  };
  var handleDateChange = function handleDateChange(name) {
    setSelectedDateFormat(function () {
      return name;
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _CalendarModule.default.control
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _CalendarModule.default.wrapper
  }, /*#__PURE__*/_react.default.createElement(_iconsMaterial.KeyboardArrowLeft, {
    className: _CalendarModule.default.icon,
    onClick: function onClick() {
      return displayPreviousData();
    }
  }), renderDateHeader(), /*#__PURE__*/_react.default.createElement(_iconsMaterial.KeyboardArrowRight, {
    className: _CalendarModule.default.icon,
    onClick: function onClick() {
      return displayNextData();
    }
  })), /*#__PURE__*/_react.default.createElement("div", null, renderDaysView()));
};
exports.Calendar = Calendar;
Calendar.defaultProps = {
  value: null,
  isRange: false,
  onChange: function onChange() {}
};