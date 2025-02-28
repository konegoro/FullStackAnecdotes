import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import anecdoteService from '../services/anedcotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote= await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))

    //after create the anecodte, we will desplay a notification por five seconds
    dispatch(notificationChange(`you created ${content} anecdote`))
    setTimeout(() => dispatch(notificationChange('')), 5000)
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
    </>
  )
}

export default AnecdoteForm