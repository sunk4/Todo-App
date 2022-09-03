import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import {
  selectSelectedSingleTodo,
  fetchAsyncSingleTodo,
} from '../../features/todos/todosSlice'
import { Link, useParams } from 'react-router-dom'
import React from 'react'
import Moment from 'react-moment'

const SingleItemInTodo = () => {
  const dispatch = useDispatch()
  const { todoId, id } = useParams()

  const selectedTodo = useSelector(selectSelectedSingleTodo)

  useEffect(() => {
    dispatch(fetchAsyncSingleTodo({ todoId, id }))
  }, [dispatch, todoId, id])

  const { deadline, status, text, title } = selectedTodo

  return (
    <div>
      <Link to="/">Back</Link>
      <div>
        <Moment fromNow>{deadline}</Moment>
      </div>
    </div>
  )
}

export default SingleItemInTodo
