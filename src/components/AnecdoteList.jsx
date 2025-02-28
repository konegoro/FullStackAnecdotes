import { useDispatch, useSelector } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

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

  const timeout = 5000;

  const dispatch = useDispatch()

  const voteHandler = (anecdote) => {
    const newAnecodte = {...anecdote, votes: anecdote.votes + 1}
    dispatch(updateVotes(anecdote.id, newAnecodte))

    //after create the anecodte, we will desplay a notification por five seconds
    dispatch(setNotification(`you voted for '${anecdote.content}'`, timeout))

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