# simple-component-library
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

```

| Prop name | Description | Type | Default value |
| --------- | ----------- | ---- | ------------- |
| isRange     Whether the user shall select two dates forming a range instead of one. | boolean | false |
|             Note. This feature will make React-Calendar-Control return an array with two dates |   |   |
| onChange  | Function called when the user clicks an item (day on month view) | function | n/a |
| value     | Calendar value. Can be either one value or an array of two values. | new Date() | null |


```