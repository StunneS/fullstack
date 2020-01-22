import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral +1)
  const handleBad = () => setBad(bad +1)
  return (
    <div>
      <h1>Give feedback</h1>
      <Button name='Good' handle={handleGood}/>
      <Button name='Neutral' handle={handleNeutral}/>
      <Button name='Bad' handle={handleBad}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}
const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad === 0) {
        return (
            <div>
                <p>No feedback given.</p>
            </div>
        )
    }
    return (
        <div>
        <table>
        <tbody>
        <StatisticLine text='Good' value={good}/>
        <StatisticLine text='Neutral' value={neutral}/>
        <StatisticLine text='Bad' value={bad}/>
        <StatisticLine text='All' value={good + neutral +bad}/>
        <StatisticLine text='Average' value={(good-bad)/(good + neutral +bad)}/>
        <StatisticLine text='Positive' value={good/(bad+neutral+good)*100}/>
        </tbody>
        </table>
        </div>
    )
  }
  const Button = ({name, handle}) => {
      return (
      <button onClick={handle}>{name}</button>
      )
  }
  const StatisticLine = ({text,value}) => {
      if (text === 'Positive') {
          return (
            <tr>
                <td> {text}: </td>
                <td>{value} % </td>
            </tr>
          )
      }
      return (
          <tr>
                <td>{text}: </td>
                <td>{value} </td>
          </tr>
      )
  }

ReactDOM.render(<App />, 
  document.getElementById('root')
)