import { useDispatch, useSelector } from 'react-redux'
import { voteFunction } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleClick(anecdote)}>vote</button>
          </div>
    </li>
  )
}

const AnecdoteList  = () => {

  const dispatch = useDispatch()

  const voteHandler = (anecdote) => {
    dispatch(voteFunction(anecdote.id))

    //after create the anecodte, we will desplay a notification por five seconds
    dispatch(notificationChange(`you voted for '${anecdote.content}'`))
    setTimeout(() => dispatch(notificationChange('')), 5000)
  } 


  //sort anecdotes by votes
  const filterWord = useSelector(state => state.filter) // Get the filter word
  const sortedFilteredAnecs = useSelector(state => 
                                            [...state.anecdotes]
                                            .filter(anecdote => anecdote.content.toLowerCase().includes(filterWord.toLowerCase())) // Filter by word
                                            .sort((a, b) => b.votes - a.votes) // Sort by votes
  )

  return(
    <ul>
      {sortedFilteredAnecs.map(anec =>
        <Anecdote
          key={anec.id}
          anecdote={anec}
          handleClick={voteHandler}
        />
      )}
    </ul>
  )
}

export default AnecdoteList 