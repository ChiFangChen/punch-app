import { StyledRangeBar, StyledRangeValue, StyledRangeInput } from './styles';

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
      min="5"
      max="20"
      value={value}
      onChange={onChange}
      isReady={isReady}
    />
  </StyledRangeBar>
);

export default RangeBar;
