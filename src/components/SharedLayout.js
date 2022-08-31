import { Outlet } from 'react-router-dom'

const SharedLayout = () => {
  return (
    <div>
      <h1>Shared layour</h1>
      <Outlet />
    </div>
  )
}

export default SharedLayout
