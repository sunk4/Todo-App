import { Outlet, Link } from 'react-router-dom'
import { AppBar, Typography, Toolbar, styled } from '@mui/material'

const SharedLayout = () => {
  const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
  })

  const StyledLink = styled(Typography)`
    text-decoration: none;
    color: inherit;
  `

  return (
    <>
      <AppBar position="sticky">
        <StyledToolbar>
          <StyledLink component={Link} to="/" variant="h5">
            ToDo App
          </StyledLink>
        </StyledToolbar>
      </AppBar>
      <Outlet />
    </>
  )
}

export default SharedLayout
