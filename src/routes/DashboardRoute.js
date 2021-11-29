import { Outlet } from 'react-router-dom';

const DashboardRoute = () => {
  return (
    <div>
      <div>dashboard</div>
      <Outlet />
    </div>
  )
};

export default DashboardRoute;
