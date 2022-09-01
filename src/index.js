import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'normalize.css'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import {
  fetchAsyncListOfTodos,
  fetchAsyncToDos,
} from './features/todos/todosSlice'

store.dispatch(fetchAsyncToDos())
store.dispatch(fetchAsyncListOfTodos(1))
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
