# react-calendar-control
react-calendar-control for your react projects. Very customizable!
## Installation
`npm install --save react-calendar-control`

## Usage

```
import React, { useState } from 'react'
import { Calendar } from 'react-calendar-control'

const App = () => {
    const [value, onChange] = useState(new Date());  

    return <Calendar onChange={onChange} value={value} isRange />
}

```

## Props

| Prop name | Description | Type | Default value | Example values |
| :--------- | :----------- | :---- | :------------- |
| isRange   | Whether the user shall select two dates forming a range instead of one. Note. This feature will make React-Calendar-Control return an array with two dates| boolean | false | true |
| onChange  | Function called when the user clicks an item (day on month view) | function | n/a | (value) => console.log(value) |
| value     | Calendar value. Can be either one value or an array of two values. | new Date() | null | <li>Date: new Date()</li> <li> An array of dates: [new Date(2020, 0, 1), new Date(2020, 7, 1)] |


