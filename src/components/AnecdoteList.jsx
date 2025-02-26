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
  const anecs = useSelector(state => [...state].sort((a, b) => b.votes - a.votes))

  return(
    <ul>
      {anecs.map(anec =>
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