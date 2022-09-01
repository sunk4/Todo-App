import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useSelector } from 'react-redux'
import {
  selectListOfTodos,
  deleteAsyncSingleTodo,
  updateAsyncSingleTodo,
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

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const { name, Todo: todos } = listOfTodos

  let renderListOfTodos = null

  renderListOfTodos = todos?.map((todo) => {
    const { deadline, title, todoId, id, status } = todo
    const newStatus = !status

    return (
      <Box key={id}>
        <Button
          onClick={() =>
            dispatch(updateAsyncSingleTodo({ todoId, id, newStatus }))
          }
        >
          <CircleOutlinedIcon />
        </Button>
        <Link to={id}>
          <Typography variant="subtitle1">
            {title} {deadline}
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
          <Typography variant="h6">{todos?.length} task remaining</Typography>
          <Input />
          {renderListOfTodos}
          <Button onClick={handleOpen}>Create List</Button>
          <ModalCreateTask open={open} handleClose={handleClose} />
        </Box>
      </Container>
    </>
  )
}

export default SingleList
