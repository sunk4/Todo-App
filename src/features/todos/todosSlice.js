import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import todosApi from '../../common/todosApi'

export const fetchAsyncToDos = createAsyncThunk(
  'todos/fetchAsyncToDos',
  async () => {
    const response = await todosApi.get('/todo')
    return response.data
  }
)

const initialState = {
  todos: [],
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
  },
})

export const selectAllTodos = (state) => state.todos.todos

export default todosSlice.reducer
