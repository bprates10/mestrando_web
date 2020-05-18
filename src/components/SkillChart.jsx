import React, { useEffect } from 'react'

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts'



function SkillChart(props) {

  const fullLevel = 5
  const skillLevel = {
    charisma: 3,
    education: 3,
    hability: 3,
    learning: 3,
    punctuality: 3,
  }

  useEffect(() => {
    console.log(props)
  }, [props])

  const data = [
    {
      "skill": "Carisma",
      "rating": skillLevel.charisma,
      // "B": 50,
      "fullMark": fullLevel
    },
    {
      "skill": "Habilidades",
      "rating": skillLevel.hability,
      // "B": 130,
      "fullMark": fullLevel
    },
    {
      "skill": "Pontualidade",
      "rating": skillLevel.punctuality,
      // "B": 130,
      "fullMark": fullLevel
    },
    {
      "skill": "Educação",
      "rating": skillLevel.education,
      // "B": 100,
      "fullMark": fullLevel
    },
    {
      "skill": "Aprendizado",
      "rating": skillLevel.learning,
      // "B": 150,
      "fullMark": fullLevel
    }
  ]

  return (
    <RadarChart outerRadius={80} width={630} height={250} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="skill" />
      <PolarRadiusAxis angle={60} domain={[0, fullLevel]} />
      <Radar name="" dataKey="rating" stroke="#f50" fill="#f09" fillOpacity={0.3} />
      {/* <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
      {/* <Legend /> */}
    </RadarChart>
  )
}
export default SkillChart