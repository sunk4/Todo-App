import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useSelector } from 'react-redux'
import { selectListOfTodos } from './todosSlice'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ModalCreateTask from './ModalCreateTask'
import { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import Input from '@mui/material/Input'
const SingleList = () => {
  const listOfTodos = useSelector(selectListOfTodos)
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const { name, id, Todo: todos } = listOfTodos

  let renderListOfTodos = null

  renderListOfTodos = todos.map((todo) => {
    const { id, title, deadline } = todo
    return (
      <Box key={id}>
        <Button>
          <CircleOutlinedIcon />
        </Button>
        <Typography variant="subtitle1">
          {title} {deadline}
        </Typography>
        <Button>
          <DeleteOutlineIcon />
        </Button>
      </Box>
    )
  })

  return (
    <>
      <Container maxWidth="sm">
        <Box key={id} sx={{ bgcolor: '#cfe8fc', height: '80vh' }}>
          <Typography variant="h6">{name} </Typography>
          <Typography variant="h6">{todos.length} task remaining </Typography>
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
