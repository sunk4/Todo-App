import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { Input } from '@mui/material'
import * as Yup from 'yup'
import { createAsyncTodoInTodoList } from './todosSlice'
import { useDispatch } from 'react-redux'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
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
      handleClose()
    },
  })

  return (
    <>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <form onSubmit={formik.handleSubmit}>
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
            <Button type="submit">Submit</Button>
          </form>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </>
  )
}

export default ModalCreateList
