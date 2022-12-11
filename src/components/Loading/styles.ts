import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

type StyledLoadingProps = {
  size: number;
};

const StyledLoading = styled('div')<StyledLoadingProps>`
  box-sizing: border-box;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: ${({ size }) => size / 8}px solid currentColor;
  border-radius: 50%;
  border-color: currentColor transparent transparent transparent;
  animation: ${rotate} 1s ease infinite;
`;

export { StyledLoading };
