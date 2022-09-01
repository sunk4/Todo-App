import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import { selectAllTodos } from './todosSlice'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { useState } from 'react'
import ModalCreateList from './ModalCreateList'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import { fetchAsyncListOfTodos } from './todosSlice'

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

  renderListOfTodos = todosList.map((todo) => {
    const { name, id } = todo
    return (
      <ListItem key={id} disablePadding>
        <ListItemButton onClick={() => dispatch(fetchAsyncListOfTodos(id))}>
          <ListItemIcon>
            <WorkOutlineOutlinedIcon />
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
      <Button onClick={handleOpen}>Create List</Button>
      <ModalCreateList open={open} handleClose={handleClose} />
    </List>
  )
}

export default Sidebar
