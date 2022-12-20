import styled from '@emotion/styled';

const StyledNav = styled('nav')`
  padding: 20px 40px;
`;

const StyledNavLeft = styled('nav')`
  float: left;
`;

const StyledNavRight = styled('nav')`
  float: right;
  display: flex;
  align-items: center;

  > select {
    margin-left: 12px;
    height: 24.5px;
  }
`;

export { StyledNav, StyledNavLeft, StyledNavRight };
