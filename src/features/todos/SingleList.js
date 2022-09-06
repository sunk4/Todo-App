import { useSelector } from 'react-redux'
import { TextField, Typography, Button, Grid, styled } from '@mui/material'
import {
  selectListOfTodos,
  deleteAsyncSingleTodo,
  updateAsyncSingleTodo,
  filterByStatusSingleTodo,
  selectFilteredTodos,
  deleteAsyncListTodo,
  searchInTodosAsync,
} from './todosSlice'
import ModalCreateTask from './ModalCreateTask'
import { useState } from 'react'
import { DeleteOutline, CircleOutlined, Circle } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const SingleList = () => {
  const listOfTodos = useSelector(selectListOfTodos)
  const filteredTodos = useSelector(selectFilteredTodos)

  const { id, name } = listOfTodos
  const { count } = filteredTodos

  const dispatch = useDispatch()

  const [searchInputValue, setSearchInputValue] = useState('')
  const [open, setOpen] = useState(false)

  const StyledLink = styled(Typography)`
    text-decoration: none;
    color: inherit;
    &:hover {
      color: #1976d2;
      background-color: rgb(245, 245, 245);
    }
    ${({ status }) =>
      status &&
      `
    text-decoration: line-through;
  `}
  `

  const handleSearchInput = (e) => {
    setSearchInputValue(e.target.value)
   
    dispatch(searchInTodosAsync({id, searchInputValue }))
    
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = (todoId, id) => {
    dispatch(deleteAsyncSingleTodo({ todoId, id }))
  }

  const handleDeleteList = (id) => {
    let answer = window.confirm('Delete?')
    if (answer) {
      for (let i = 0; i < filteredTodos.count; i++) {
        let todoId = filteredTodos.items[i].todoId
        let id = filteredTodos.items[i].id
        dispatch(deleteAsyncSingleTodo({ todoId, id }))
      }
      setTimeout(() => {
        dispatch(deleteAsyncListTodo(id))
      }, 1000)
    }
  }

  let renderListOfTodos = null

  renderListOfTodos = filteredTodos.items?.map((todo) => {
    const { title, todoId, id, status } = todo

    return (
      <Grid
        key={id}
        container
        alignItems="center"
        justifyContent="center"
        marginBottom={2}
      >
        <Grid item xs={4}>
          <Button
            onClick={() =>
              dispatch(updateAsyncSingleTodo({ todoId, id, status }))
            }
          >
            {status ? <Circle /> : <CircleOutlined />}
          </Button>
        </Grid>
        <Grid item xs={4}>
          <StyledLink
            status={status ? 1 : 0}
            component={Link}
            to={`/${todoId}/${id}`}
            variant="h6"
          >
            {title}
          </StyledLink>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={() => handleDelete(todoId, id)}>
            <DeleteOutline />
          </Button>
        </Grid>
      </Grid>
    )
  })

  if (filteredTodos.length === 0) {
    return <></>
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="h6">{name} </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6">{count} task remaining</Typography>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  onClick={() => handleDeleteList(id)}
                  color="error"
                >
                  Delete {name}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{
                margin: 'normal',
                width: '80%',
              }}
              id="standard-search"
              label="Search in Todos"
              type="search"
              variant="standard"
              name={name}
              onChange={(e) => handleSearchInput(e)}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {renderListOfTodos}
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4}>
            <Button onClick={() => dispatch(filterByStatusSingleTodo({ id }))}>
              All
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={() =>
                dispatch(filterByStatusSingleTodo({ id, status: false }))
              }
            >
              Active
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={() =>
                dispatch(filterByStatusSingleTodo({ id, status: true }))
              }
            >
              Done
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleOpen}>
          Create ToDo
        </Button>
      </Grid>
      <ModalCreateTask open={open} handleClose={handleClose} id={id} />
    </Grid>
  )
}

export default SingleList
