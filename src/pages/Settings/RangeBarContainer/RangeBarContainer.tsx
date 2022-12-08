import { useState } from 'react';
import { RangeBar } from '@/components';

export type RangeBarContainerProps = {
  onChange: (data: number) => void;
};

const RangeBarContainer = ({ onChange }: RangeBarContainerProps) => {
  const [range, setRange] = useState(5);

  return (
    <RangeBar
      onChange={(e) => {
        const value = Number(e.currentTarget.value);
        setRange(value);
        onChange(value);
      }}
      value={range}
    />
  );
};

export default RangeBarContainer;
