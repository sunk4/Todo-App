import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useSelector } from 'react-redux'
import { TextField } from '@mui/material'
import {
  selectListOfTodos,
  deleteAsyncSingleTodo,
  updateAsyncSingleTodo,
  filterByStatusSingleTodo,
  selectFilteredTodos,
  deleteAsyncListTodo,
  searchInTodosAsync,
} from './todosSlice'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ModalCreateTask from './ModalCreateTask'
import { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import Input from '@mui/material/Input'
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
  console.log(count)

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
          <CircleOutlinedIcon />
        </Button>
        <Link to={`/${todoId}/${id}`}>
          <Typography className="" variant="subtitle1">
            {title}
          </Typography>
        </Link>
        <Button onClick={() => dispatch(deleteAsyncSingleTodo({ todoId, id }))}>
          <DeleteOutlineIcon />
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
          <ModalCreateTask open={open} handleClose={handleClose} />
          <Button onClick={() => dispatch(filterByStatusSingleTodo({ id }))}>
            All
          </Button>
          <Button
            onClick={() =>
              dispatch(filterByStatusSingleTodo({ id, status: true }))
            }
          >
            Active
          </Button>
          <Button
            onClick={() =>
              dispatch(filterByStatusSingleTodo({ id, status: false }))
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
