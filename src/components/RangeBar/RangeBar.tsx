import { MIN_RANGE, MAX_RANGE } from '@/utils/constants';
import { types, useAppSelector } from '@/model';
import { StyledRangeBar, StyledRangeValue, StyledRangeInput } from './styles';

type RangeBarProps = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: number;
  isReady: boolean;
};

const RangeBar = ({ onChange, value, isReady }: RangeBarProps) => {
  const language = useAppSelector((state) => state.config.data.app.language);
  return (
    <StyledRangeBar>
      {isReady && (
        <StyledRangeValue value={value} language={language as types.Language}>
          {value}
        </StyledRangeValue>
      )}
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
};

export default RangeBar;
