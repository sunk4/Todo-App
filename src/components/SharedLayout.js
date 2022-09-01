import { Outlet } from 'react-router-dom'
import { AppBar, Typography, Toolbar, styled } from '@mui/material'

const SharedLayout = () => {
  const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
  })
  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <Typography
            variant="h5"
            sx={{ display: { xs: 'block', sm: 'block' } }}
          >
            ToDo App
          </Typography>
        </StyledToolbar>
      </AppBar>
      <Outlet />
    </>
  )
}

export default SharedLayout
