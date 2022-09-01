import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import todosApi from '../../common/todosApi'

export const fetchAsyncToDos = createAsyncThunk(
  'todos/fetchAsyncToDos',
  async () => {
    const response = await todosApi.get('/todo')
    return response.data
  }
)

export const fetchAsyncListOfTodos = createAsyncThunk(
  'todos/fetchAsyncListOfTodos',
  async (id) => {
    const response = await todosApi.get(`/todo/${id}`)
    return response.data
  }
)

export const deleteAsyncSingleTodo = createAsyncThunk(
  'todos/deleteAsyncSingleTodo',
  async (data) => {
    const { todoId, id } = data
    const response = await todosApi.delete(`todo/${todoId}/itemInTodo/${id}`)
    return response.data
  }
)

export const updateAsyncSingleTodo = createAsyncThunk(
  'todos/updateAsyncSingleTodo',
  async (data) => {
    const { todoId, id, status } = data
    let newStatus = !status

    const response = await todosApi.put(`todo/${todoId}/itemInTodo/${id}`, {
      status: newStatus,
    })

    return response.data
  }
)

export const fetchAsyncSingleTodo = createAsyncThunk(
  'todos/fetchAsyncSingleTodo',
  async (data) => {
    const { todoId, id } = data
    const response = await todosApi.get(`/todo/${todoId}/itemInTodo/${id}`)
    return response.data
  }
)

const initialState = {
  todos: [],
  listOfTodos: [],
  selectedSingleTodo: [],
  isLoading: false,
  error: null,
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncToDos.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchAsyncToDos.fulfilled, (state, action) => {
        state.isLoading = false
        state.todos = action.payload
      })
      .addCase(fetchAsyncToDos.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(fetchAsyncListOfTodos.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchAsyncListOfTodos.fulfilled, (state, action) => {
        state.isLoading = false
        state.listOfTodos = action.payload
      })
      .addCase(fetchAsyncListOfTodos.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(deleteAsyncSingleTodo.fulfilled, (state, action) => {
        const { id } = action.payload
        console.log(current(state.listOfTodos))

        const newTodos = state.listOfTodos.todo.filter((todo) => todo.id !== id)
        state.listOfTodos = {
          id: state.listOfTodos.id,
          name: state.listOfTodos.name,
          todo: [...newTodos],
        }

        state.isLoading = false
      })
      .addCase(updateAsyncSingleTodo.fulfilled, (state, action) => {
        const { id } = action.payload
        console.log(action.payload)
        const newTodos = state.listOfTodos.todo.filter((todo) => todo.id !== id)

        state.listOfTodos = {
          id: state.listOfTodos.id,
          name: state.listOfTodos.name,
          todo: [...newTodos, action.payload],
        }
        state.isLoading = false
      })
      .addCase(fetchAsyncSingleTodo.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedSingleTodo = action.payload
      })
  },
})

export const selectAllTodos = (state) => state.todos.todos
export const selectListOfTodos = (state) => state.todos.listOfTodos
export const selectSelectedSingleTodo = (state) =>
  state.todos.selectedSingleTodo

export default todosSlice.reducer
