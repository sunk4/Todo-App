import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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

const initialState = {
  todos: [],
  listOfTodos: [],
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
  },
})

export const selectAllTodos = (state) => state.todos.todos
export const selectListOfTodos = (state) => state.todos.listOfTodos

export default todosSlice.reducer
