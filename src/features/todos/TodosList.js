import { useSelector } from 'react-redux'
import { selectAllTodos } from './todosSlice'
import TodoCard from './TodoCard'
const TodosList = () => {
  const todosList = useSelector(selectAllTodos)
  const todoCount = todosList.length
  let renderTodos = ''

  renderTodos = todosList.map((todo) => {
    const { name, id } = todo

    return <TodoCard key={id} name={name} todoCount={todoCount} />
  })

  return <div>{renderTodos}</div>
}

export default TodosList
