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

