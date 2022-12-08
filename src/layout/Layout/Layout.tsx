import { Outlet } from 'react-router-dom';
import Header from '../Header';

const Layout = () => (
  <>
    <Header></Header>
    <Outlet />
  </>
);

export default Layout;
