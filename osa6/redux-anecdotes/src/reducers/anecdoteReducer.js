import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data : anecdotes
    })
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}
export const voteFor = (id) => {
  return async dispatch => {
    await anecdoteService.voteFor(id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const toChange = state.find(a => a.id === id)
      const changedAnec = {
        ...toChange,
        votes: toChange.votes+1
      }
      return state.map(anec =>
        anec.id !== id ? anec : changedAnec
      )
    case 'INIT':
      return action.data
    default:
    return state
  }
}

export default anecdoteReducer