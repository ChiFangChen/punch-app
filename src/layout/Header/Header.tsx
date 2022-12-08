import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StyledHeader, StyledNav } from './styles';

const Header = () => {
  const { pathname } = useLocation();

  const nav = useMemo(() => {
    const isHome = ['/', '/home'].includes(pathname);
    return (
      <StyledNav>
        <div>{isHome ? null : <Link to="/home">HOME</Link>}</div>
        <div>{isHome ? <Link to="/settings">Settings</Link> : null}</div>
      </StyledNav>
    );
  }, [pathname]);

  return <StyledHeader>{nav}</StyledHeader>;
};

export default Header;
