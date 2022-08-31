import TodosList from './features/todos/TodosList'
import SharedLayout from './components/SharedLayout'
import SingleTodoList from './features/todos/SingleTodoList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<TodosList />}></Route>
          <Route path="/:id" element={<SingleTodoList />}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
