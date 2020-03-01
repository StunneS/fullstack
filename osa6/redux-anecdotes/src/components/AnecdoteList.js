import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
      return state.anecdotes.filter(anec => anec.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    

    const vote = (id) => {
        dispatch(voteFor(id))
        dispatch(setNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`, 5))
    }

    return (
        <div>
            {anecdotes.sort((a,b) => b.votes- a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}
export default AnecdoteList