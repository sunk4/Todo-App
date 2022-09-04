import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
  Box,
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

  const [selectedIndex, setSelectedIndex] = useState('')
  const handleListItemClick = (id) => {
    setSelectedIndex(id)
  }

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
            handleListItemClick(id)
          }}
          selected={selectedIndex === id}
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
    <List
      sx={{
        '&& .Mui-selected': {
          color: '#1976d2',
        },

        '& .MuiListItemButton-root:hover': {
          color: '#1976d2',
        },
      }}
    >
      <Typography variant="h6">My lists</Typography>
      {renderListOfTodos}
      <Button
        sx={{ mt: 4 }}
        variant="contained"
        type="button"
        onClick={handleOpen}
      >
        Create ToDo List
      </Button>
      <ModalCreateList open={open} handleClose={handleClose} />
    </List>
  )
}

export default Sidebar
