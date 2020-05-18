import React from 'react'

import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  Bar,
  Line
} from 'recharts'

function EventChart() {
  const data = [
    {
      "event": "Evento1",
      "pessoas": 1,
      "capacidade": 4,
      "fill": "#8884d8"
    },
    {
      "event": "Evento2",
      "pessoas": 2,
      "capacidade": 4,
      "fill": "#83a6ed"
    },
    {
      "event": "Evento3",
      "pessoas": 3,
      "capacidade": 4,
      "fill": "#8dd1e1"
    },
    {
      "event": "Evento4",
      "pessoas": 2,
      "capacidade": 2,
      "fill": "#82ca9d"
    },
    {
      "event": "Evento5",
      "pessoas": 5,
      "capacidade": 5,
      "fill": "#a4de6c"
    },
    {
      "event": "Evento6",
      "pessoas": 8,
      "capacidade": 8,
      "fill": "#d0ed57"
    },
    {
      "event": "Evento7",
      "pessoas": 3,
      "capacidade": 4,
      "fill": "#ffc658"
    }
  ]

  return (
    <ComposedChart width={600} height={250} data={data}>
      <XAxis dataKey="event" />
      <YAxis />
      <Tooltip />
      {/* <Legend /> */}
      <CartesianGrid stroke="#f5f5f5" />
      <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
      <Bar dataKey="capacidade" barSize={20} fill="#413ea0" />
      <Line type="monotone" dataKey="pessoas" stroke="#ff7300" />
    </ComposedChart>
  )
}
export default EventChart