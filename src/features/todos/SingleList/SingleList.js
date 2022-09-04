import { useSelector } from 'react-redux'
import { TextField, Container, Box, Typography, Button } from '@mui/material'
import {
  selectListOfTodos,
  deleteAsyncSingleTodo,
  updateAsyncSingleTodo,
  filterByStatusSingleTodo,
  selectFilteredTodos,
  deleteAsyncListTodo,
  searchInTodosAsync,
} from '../todosSlice'
import ModalCreateTask from '../ModalCreateTask/ModalCreateTask'
import { useState } from 'react'
import { DeleteOutline, CircleOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const SingleList = () => {
  const listOfTodos = useSelector(selectListOfTodos)
  const filteredTodos = useSelector(selectFilteredTodos)

  const [searchInputValue, setSearchInputValue] = useState('')

  const handleSearchInput = (e) => {
    setSearchInputValue(e.target.value)

    if (!searchInputValue) {
      dispatch(filterByStatusSingleTodo({ id: 1 }))
    } else {
      dispatch(searchInTodosAsync(searchInputValue))
    }
  }

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const { id, name } = listOfTodos

  const { count } = filteredTodos

  let renderListOfTodos = null

  renderListOfTodos = filteredTodos.items?.map((todo) => {
    const { title, todoId, id, status } = todo

    return (
      <Box key={id}>
        <Button
          onClick={() =>
            dispatch(updateAsyncSingleTodo({ todoId, id, status }))
          }
        >
          <CircleOutlined />
        </Button>
        <Link to={`/${todoId}/${id}`}>
          <Typography className={status ? 'test' : null} variant="subtitle1">
            {title}
          </Typography>
        </Link>
        <Button onClick={() => dispatch(deleteAsyncSingleTodo({ todoId, id }))}>
          <DeleteOutline />
        </Button>
      </Box>
    )
  })

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '80vh' }}>
          <Typography variant="h6">{name} </Typography>
          <Typography variant="h6">{count} task remaining</Typography>
          <Button onClick={() => dispatch(deleteAsyncListTodo(id))}>
            Delete {name}
          </Button>
          <TextField
            id="standard-search"
            label="Search in Todos"
            type="search"
            variant="standard"
            name={name}
            onChange={(e) => handleSearchInput(e)}
          />
          {renderListOfTodos}
          <Button onClick={handleOpen}>Create List</Button>
          <ModalCreateTask open={open} handleClose={handleClose} id={id} />
          <Button onClick={() => dispatch(filterByStatusSingleTodo({ id }))}>
            All
          </Button>
          <Button
            onClick={() =>
              dispatch(filterByStatusSingleTodo({ id, status: false }))
            }
          >
            Active
          </Button>
          <Button
            onClick={() =>
              dispatch(filterByStatusSingleTodo({ id, status: true }))
            }
          >
            Done
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default SingleList
