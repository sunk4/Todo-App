import { useFormik } from 'formik'
import { Input, Button, Modal, Box, Typography, Stack } from '@mui/material'
import * as Yup from 'yup'
import { createAsyncTodoList, fetchAsyncToDos } from './todosSlice'
import { useDispatch } from 'react-redux'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  borderTop: '12px solid #1976d2',
  borderRadius: 4,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  width: 450,
  height: 380,
  maxWidth: { xs: 320, md: 400 },
  maxHeight: { xs: 400, md: 450 },
}

const ModalCreateList = ({ open, handleClose }) => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: (values) => {
      dispatch(createAsyncTodoList(values))
      handleClose()
      dispatch(fetchAsyncToDos())
    },
  })

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style }}>
        <Stack spacing={4} justifyContent="center" alignItems="center">
          <Typography variant="h4">Create ToDo List</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <Input
                name="name"
                type="text"
                placeholder="ToDo list name..."
                value={formik.values.name || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <p>{formik.errors.name}</p>
              ) : null}
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={handleClose}
              >
                Close
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Modal>
  )
}

export default ModalCreateList
