import { useFormik } from 'formik'
import { Input, Button, Modal, Box } from '@mui/material'
import * as Yup from 'yup'
import { createAsyncTodoList } from '../todosSlice'
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
              name="name"
              type="text"
              placeholder="Name of Todo list"
              value={formik.values.name || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <p>{formik.errors.name}</p>
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
