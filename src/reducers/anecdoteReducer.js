import { createSlice, current } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState : [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteFunction(state, action) {
      const newState = state.map(anec => anec.id === action.payload ? {...anec, votes : anec.votes + 1} : anec)
      return newState
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {createAnecdote, voteFunction, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer
