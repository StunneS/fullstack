import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))

  const randomAnec =() => setSelected(Math.floor(Math.random() * 6))
  const vote =() => {
      const copy = {...votes}
      copy[selected] += 1
      setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day:</h1>
      <p>{props.anecdotes[selected]}</p>
      <Button text='Vote' action={vote}/>
      <Button text='Next anecdote' action={randomAnec}/>
      <h1>Most voted:</h1>
      <MostVoted votes={votes} anecdotes={props.anecdotes}/>
      </div>
  )
}
const Button = ({text, action}) => {
    return (
        <button onClick={action}>{text}</button>
    )
}
const MostVoted = ({votes,anecdotes}) => {
    let spot = 0
    let max = 0
    for( let i = 0; i < 6; i++ ) {
        if(votes[i] > max) {
            spot = i
            max = votes[i]
        }
    }
    return (
        <>
        <p>{anecdotes[spot]}</p>
        <p>Voted for {max} times.</p>
        </>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)