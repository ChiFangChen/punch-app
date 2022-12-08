import { Outlet } from 'react-router-dom';
import Header from '../Header';
import { StyledLayout, StyledContent } from './styles';

const Layout = () => (
  <StyledLayout>
    <Header></Header>

    <StyledContent>
      <Outlet />
    </StyledContent>
  </StyledLayout>
);

export default Layout;
