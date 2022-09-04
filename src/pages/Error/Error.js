import errorImage from '../../assets/images/error_404.svg'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
const Wrapper = () => {
  return (
    <Box sx={{ width: '100%', mt: 6, maxHeight: '60%' }}>
      <Stack spacing={4} justifyContent="center" alignItems="center">
        <Box
          component="img"
          sx={{
            height: 400,
            width: 600,
            maxHeight: { xs: 300, md: 400 },
            maxWidth: { xs: 400, md: 600 },
          }}
          src={errorImage}
          alt="404 not found"
        ></Box>
        <Typography variant="h4">Ops..., Page Not Found</Typography>
        <Button component={Link} variant="contained" to="/">
          Go Back?
        </Button>
      </Stack>
    </Box>
  )
}

export default Wrapper
