import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector, actions } from '@/model';
import { Loading } from '@/components';
import Header from '../Header';
import { StyledLayout, StyledContent } from './styles';

const Layout = () => {
  const dispatch = useAppDispatch();
  const isReady = useAppSelector((state) => state.config.isReady);

  useEffect(() => {
    dispatch(actions.getAppConfigAsync());
    dispatch(actions.getHistory());
  }, [dispatch]);

  return (
    <StyledLayout>
      <Header />

      <StyledContent>{isReady ? <Outlet /> : <Loading />}</StyledContent>
    </StyledLayout>
  );
};

export default Layout;
