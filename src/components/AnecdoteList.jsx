import { useDispatch, useSelector } from 'react-redux'
import { voteFunction } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleClick(anecdote.id)}>vote</button>
          </div>
    </li>
  )
}

const AnecdoteList  = () => {

  const dispatch = useDispatch()
  //sort anecdotes by votes
  const filterWord = useSelector(state => state.filter) // Get the filter word
  const sortedFilteredAnecs = useSelector(state => 
                                            state.anecdotes
                                            .filter(anecdote => anecdote.content.toLowerCase().includes(filterWord.toLowerCase())) // Filter by word
                                            .sort((a, b) => b.votes - a.votes) // Sort by votes
  )

  return(
    <ul>
      {sortedFilteredAnecs.map(anec =>
        <Anecdote
          key={anec.id}
          anecdote={anec}
          handleClick={() => 
            dispatch(voteFunction(anec.id))
          }
        />
      )}
    </ul>
  )
}

export default AnecdoteList 