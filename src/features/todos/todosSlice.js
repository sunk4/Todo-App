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
    const response = await todosApi.delete(`/todo/${todoId}/itemInTodo/${id}`)
    return response.data
  }
)

export const updateAsyncSingleTodo = createAsyncThunk(
  'todos/updateAsyncSingleTodo',
  async (data) => {
    const { todoId, id, status } = data
    let newStatus = !status

    const response = await todosApi.put(`/todo/${todoId}/itemInTodo/${id}`, {
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

export const filterByStatusSingleTodo = createAsyncThunk(
  'todos/filterByStatusSingleTodo',
  async (data) => {
    const { id, status } = data

    if (status === undefined) {
      const response = await todosApi.get(`/todo/${id}/itemInTodo?status=`)
      return response.data
    } else {
      const response = await todosApi.get(
        `/todo/${id}/itemInTodo?status=${status}`
      )
      return response.data
    }
  }
)

export const deleteAsyncListTodo = createAsyncThunk(
  'todos/deleteAsyncListTodo',
  async (id) => {
    const response = await todosApi.delete(`/todo/${id}`)
    return response.data
  }
)

export const searchInTodosAsync = createAsyncThunk(
  'todos/searchInTodosAsync',
  async (text) => {
    const response = await todosApi.get(`/todo/1/itemInTodo?search=${text}`)
    return response.data
  }
)

export const createAsyncTodoList = createAsyncThunk(
  'todos/createAsyncTodoList',
  async (data) => {
    const { name } = data
    const response = await todosApi.post(`/todo`, {
      name,
    })
    return response.data
  }
)

export const createAsyncTodoInTodoList = createAsyncThunk(
  'todos/createAsyncTodoInTodoList',
  async (data) => {
    const { id, title, description, deadline } = data
    const response = await todosApi.post(`/todo/${id}/itemInTodo`, {
      title,
      description,
      deadline,
      status: false,
    })
    return response.data
  }
)

const initialState = {
  todos: [],
  listOfTodos: [],
  selectedSingleTodo: [],
  filteredTodos: [],
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

        const newTodos = state.filteredTodos.items.filter((todo) => {
          return todo.id !== id
        })
        state.filteredTodos = {
          count: state.filteredTodos.count - 1,
          items: newTodos,
        }

        state.isLoading = false
      })
      .addCase(updateAsyncSingleTodo.fulfilled, (state, action) => {
        const { id } = action.payload
        const newTodos = state.filteredTodos.items.filter(
          (todo) => todo.id !== id
        )
        state.filteredTodos = {
          count: state.filteredTodos.count,
          items: [...newTodos, action.payload],
        }
        state.isLoading = false
      })
      .addCase(fetchAsyncSingleTodo.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedSingleTodo = action.payload
      })
      .addCase(filterByStatusSingleTodo.fulfilled, (state, action) => {
        state.isLoading = false
        state.filteredTodos = action.payload
      })
      .addCase(deleteAsyncListTodo.fulfilled, (state, action) => {
        const { id } = action.payload
        state.isLoading = false
        const newTodos = state.todos.filter((todo) => todo.id !== id)
        state.todos = newTodos
      })
      .addCase(searchInTodosAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.filteredTodos = action.payload
      })
      .addCase(createAsyncTodoList.fulfilled, (state, action) => {
        state.isLoading = false
        state.todos = [...state.todos, action.payload]
      })
      .addCase(createAsyncTodoInTodoList.fulfilled, (state, action) => {
        state.isLoading = false
        // state.filteredTodos = [...state.filteredTodos.items, action.payload]

        state.filteredTodos = {
          count: state.filteredTodos.count + 1,
          items: [...state.filteredTodos.items, action.payload],
        }
      })
  },
})

export const selectAllTodos = (state) => state.todos.todos

export const selectListOfTodos = (state) => state.todos.listOfTodos
export const selectSelectedSingleTodo = (state) =>
  state.todos.selectedSingleTodo
export const selectFilteredTodos = (state) => state.todos.filteredTodos

export default todosSlice.reducer
