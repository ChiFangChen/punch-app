import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector, actions } from '@/model';
import Header from '../Header';
import { StyledLayout, StyledContent } from './styles';

const Layout = () => {
  const dispatch = useAppDispatch();
  const isReady = useAppSelector((state) => state.config.isReady);

  useEffect(() => {
    dispatch(actions.getAppConfigAsync());
    dispatch(actions.getHistoryAsync());
  }, [dispatch]);

  return (
    <StyledLayout>
      <Header></Header>

      <StyledContent>{isReady ? <Outlet /> : 'loading...'}</StyledContent>
    </StyledLayout>
  );
};

export default Layout;
