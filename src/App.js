import Home from './pages/Home'
import SharedLayout from './components/SharedLayout'
import SingleItemInTodo from './pages/SingleItemInTodo'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/:todoId/:id" element={<SingleItemInTodo />}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
