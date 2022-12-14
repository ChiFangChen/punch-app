import styled from '@emotion/styled';

const StyledClock = styled('div')`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 2px solid;
  margin-bottom: 40px;

  &:before {
    content: '';
    position: absolute;
    width: 185px;
    height: 185px;
    border-radius: 100%;
    border: 1px solid;
  }
`;

export { StyledClock };
