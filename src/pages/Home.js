import { Grid } from '@mui/material'
import Sidebar from '../features/todos/Sidebar'
import SingleList from '../features/todos/SingleList'

const Home = () => {
  return (
    <Grid padding={4} container spacing={2} mt={2}>
      <Grid item sm={3} xs={12}>
        <Sidebar />
      </Grid>
      <Grid item sm={5} xs={12}>
        <SingleList />
      </Grid>
    </Grid>
  )
}

export default Home
