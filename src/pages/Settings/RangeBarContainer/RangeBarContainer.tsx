import { useState, useEffect } from 'react';
import { RangeBar } from '@/components';

export type RangeBarContainerProps = {
  onChange: (data: number) => void;
  defaultValue: number;
};

const RangeBarContainer = ({ onChange, defaultValue }: RangeBarContainerProps) => {
  const [range, setRange] = useState(() => defaultValue);
  const [isReady, setIsReady] = useState(false);

  // use isReady to make sure when getting the input width is not empty
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <RangeBar
      onChange={(e) => {
        const value = Number(e.currentTarget.value);
        setRange(value);
        onChange(value);
      }}
      value={range}
      isReady={isReady}
    />
  );
};

export default RangeBarContainer;
