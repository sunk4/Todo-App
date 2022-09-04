import { Grid } from '@mui/material'
import Sidebar from '../features/todos/Sidebar'
import SingleList from '../features/todos/SingleList'

const Home = () => {
  return (
    <Grid padding={4} container spacing={2} mt={2}>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={5}>
        <SingleList />
      </Grid>
    </Grid>
  )
}

export default Home
