import Grid from '@mui/material/Unstable_Grid2'
import Sidebar from '../../features/todos/Sidebar/Sidebar'
import SingleList from '../../features/todos/SingleList/SingleList'

const Home = () => {
  return (
    <Grid container spacing={2} columns={16}>
      <Grid paddingLeft={3} xs={4}>
        <Sidebar />
      </Grid>
      <Grid xs={8}>
        <SingleList />
      </Grid>
    </Grid>
  )
}

export default Home
