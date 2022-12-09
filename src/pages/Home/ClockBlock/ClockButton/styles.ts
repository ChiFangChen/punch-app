import styled from '@emotion/styled';

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

export { StyledClockButton };
