import { StyledRangeBar, StyledRangeValue, StyledRangeInput } from './styles';

type RangeBarProps = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: number;
};

const RangeBar = ({ onChange, value }: RangeBarProps) => (
  <StyledRangeBar>
    <StyledRangeValue value={value}>{value}</StyledRangeValue>
    <StyledRangeInput
      type="range"
      id="range"
      name="range"
      min="5"
      max="20"
      value={value}
      onChange={onChange}
    />
  </StyledRangeBar>
);

export default RangeBar;
