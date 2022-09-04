import Home from './pages/Home/Home'
import SharedLayout from './components/SharedLayout'
import SingleItemInTodo from './pages/SingleItemInTodo/SingleItemInTodo'
import Error from './pages/Error/Error'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/:todoId/:id" element={<SingleItemInTodo />} />
          <Route path="/*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
