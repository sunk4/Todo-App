import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import {
  selectSelectedSingleTodo,
  fetchAsyncSingleTodo,
} from '../features/todos/todosSlice'
import { useParams } from 'react-router-dom'

const SingleItemInTodo = () => {
  const dispatch = useDispatch()
  const { todoId, id } = useParams()

  const selectedTodo = useSelector(selectSelectedSingleTodo)

  useEffect(() => {
    dispatch(fetchAsyncSingleTodo({ todoId, id }))
  }, [dispatch, todoId, id])

  console.log(selectedTodo)

  return <div>SingleItemInTodo</div>
}

export default SingleItemInTodo
