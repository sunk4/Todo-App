import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createAsyncTodoInTodoList } from './todosSlice'
import { useDispatch } from 'react-redux'
import { Input, Button, Modal, Box, Typography, Stack } from '@mui/material'

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

const ModalCreateList = ({ open, handleClose, id }) => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      deadline: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      description: Yup.string()
        .max(100, 'Must be 100 characters or less')
        .required('Required'),
      deadline: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      const { title, description, deadline } = values
      dispatch(createAsyncTodoInTodoList({ title, description, deadline, id }))
      formik.values.title = ''
      formik.values.description = ''
      formik.values.deadline = ''
      handleClose()
    },
  })

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style }}>
        <Stack spacing={4} justifyContent="center" alignItems="center">
          <Typography variant="h4">Create ToDo</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <Input
                name="title"
                type="text"
                placeholder="Title"
                value={formik.values.title || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (
                <p>{formik.errors.title}</p>
              ) : null}
              <Input
                name="description"
                type="text"
                placeholder="Description"
                value={formik.values.description || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description ? (
                <p>{formik.errors.description}</p>
              ) : null}
              <Input
                name="deadline"
                type="datetime-local"
                placeholder="Deadline"
                value={formik.values.deadline || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.deadline && formik.errors.deadline ? (
                <p>{formik.errors.deadline}</p>
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
