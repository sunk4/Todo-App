import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import {
  selectSelectedSingleTodo,
  fetchAsyncSingleTodo,
} from '../features/todos/todosSlice'
import { Link, useParams } from 'react-router-dom'
import React from 'react'
import Moment from 'react-moment'
import { Button, Typography, Box, Stack } from '@mui/material'

const SingleItemInTodo = () => {
  const dispatch = useDispatch()
  const { todoId, id } = useParams()

  const selectedTodo = useSelector(selectSelectedSingleTodo)
  const { deadline, description, title } = selectedTodo

  useEffect(() => {
    dispatch(fetchAsyncSingleTodo({ todoId, id }))
  }, [dispatch, todoId, id])

  return (
    <Box sx={{ width: '100%', mt: 6, maxHeight: '60%' }}>
      <Stack spacing={4} justifyContent="center" alignItems="center">
        <Typography variant="h2">Title: {title}</Typography>
        <Typography variant="h4">
          Deadline: <Moment fromNow>{deadline}</Moment>
        </Typography>
        <Typography variant="h5">Description: {description}</Typography>

        <Button component={Link} variant="contained" to="/">
          Go Back?
        </Button>
      </Stack>
    </Box>
  )
}

export default SingleItemInTodo
