import styled from '@emotion/styled';
import { MIN_RANGE, MAX_RANGE } from '@/utils/constants';

const StyledRangeBar = styled('div')`
  flex: 1;
  margin-right: 10px;
  margin-left: 10px;
  cursor: pointer;
  height: 50px;
  position: relative;
`;

type StyledRangeValueProps = {
  value: number;
};

const StyledRangeValue = styled('div')<StyledRangeValueProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  color: white;
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  pointer-events: none;
  transform: ${(prop) => {
    const input = document.getElementById('range');
    const inputWidth = input?.getBoundingClientRect().width || 0;
    const offset = ((inputWidth - 50) / (MAX_RANGE - MIN_RANGE)) * (prop.value - MIN_RANGE);
    return `translateX(${offset}px)`;
  }};
`;

type StyledRangeInputProps = {
  isReady: boolean;
};

const StyledRangeInput = styled('input')<StyledRangeInputProps>`
  width: 100%;
  flex: 1;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  height: 3px;
  background: #707070;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 50px;
    height: 50px;
    background: ${({ isReady }) => (isReady ? '#151111' : 'transparent')};
    border-radius: 100%;
    cursor: pointer;
    position: relative;
  }
`;

export { StyledRangeBar, StyledRangeValue, StyledRangeInput };
