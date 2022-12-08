import styled from '@emotion/styled';

const StyledClockBlock = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 0 30px;
`;

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

type ClockButtonProps = {
  buttonStatus: 'in' | 'out';
};

const StyledClockButton = styled('button')<ClockButtonProps>`
  border: 2px solid gray;
  padding: 10px;
  font-size: 25px;
  border-radius: 20px;
  font-weight: bold;
  background-color: ${(props) => (props.buttonStatus === 'in' ? '#159ee6' : '#e68615')};
  color: white;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    color: inherit;
    background: transparent;
  }
`;

export { StyledClockBlock, StyledClock, StyledClockButton };
