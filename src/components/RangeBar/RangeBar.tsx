import { StyledRangeBar, StyledRangeValue, StyledRangeInput } from './styles';
import { MIN_RANGE, MAX_RANGE } from '@/utils/constants';

type RangeBarProps = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: number;
  isReady: boolean;
};

const RangeBar = ({ onChange, value, isReady }: RangeBarProps) => (
  <StyledRangeBar>
    {isReady && <StyledRangeValue value={value}>{value}</StyledRangeValue>}
    <StyledRangeInput
      type="range"
      id="range"
      name="range"
      min={MIN_RANGE}
      max={MAX_RANGE}
      value={value}
      onChange={onChange}
      isReady={isReady}
    />
  </StyledRangeBar>
);

export default RangeBar;
