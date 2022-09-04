import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
} from '@mui/material'
import { WorkOutlineOutlined } from '@mui/icons-material'
import { selectAllTodos } from './todosSlice'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import ModalCreateList from './ModalCreateList'
import { useDispatch } from 'react-redux'
import { fetchAsyncListOfTodos, filterByStatusSingleTodo } from './todosSlice'

const Sidebar = () => {
  const dispatch = useDispatch()

  const todosList = useSelector(selectAllTodos)

  let renderListOfTodos = null

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  renderListOfTodos = todosList?.map((todo) => {
    const { name, id } = todo

    return (
      <ListItem key={id} disablePadding>
        <ListItemButton
          onClick={() => {
            dispatch(fetchAsyncListOfTodos(id))
            dispatch(filterByStatusSingleTodo({ id }))
          }}
        >
          <ListItemIcon>
            <WorkOutlineOutlined />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    )
  })

  return (
    <List>
      <Typography variant="h5">My lists</Typography>

      {renderListOfTodos}
      <Button onClick={handleOpen}>Create ToDo List</Button>
      <ModalCreateList open={open} handleClose={handleClose} />
    </List>
  )
}

export default Sidebar
