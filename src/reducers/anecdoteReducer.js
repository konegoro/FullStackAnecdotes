import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anedcotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState : [],
  reducers: {
    voteFunction(state, action) {
      const newState = state.map(anec => anec.id === action.payload ? {...anec, votes : anec.votes + 1} : anec)
      return newState
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newNote))
  }
}

export const updateVotes = (id, newAnec) => {
  return async dispatch => {
    await anecdoteService.update(id, newAnec) //update the anecdote in the backend
    dispatch(voteFunction(id)) //update the anecodte in the frontend
  }
}

export const {voteFunction, setAnecdotes, appendAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer
