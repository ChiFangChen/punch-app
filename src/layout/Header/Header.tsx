import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components';
import { StyledNav, StyledNavLeft, StyledNavRight } from './styles';

const Header = () => {
  const { pathname } = useLocation();

  const nav = useMemo(() => {
    const isHome = ['/', '/home'].includes(pathname);
    return (
      <StyledNav>
        <StyledNavLeft>{isHome ? null : <Link to="/home">HOME</Link>}</StyledNavLeft>
        <StyledNavRight>{isHome ? <Link to="/settings">Settings</Link> : null}</StyledNavRight>
      </StyledNav>
    );
  }, [pathname]);

  return <header>{nav}</header>;
};

export default Header;
