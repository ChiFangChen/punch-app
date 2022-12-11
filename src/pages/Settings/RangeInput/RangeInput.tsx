import { useState, useEffect } from 'react';
import { RangeBar } from '@/components';
import { useAppSelector } from '@/model';

export type RangeInputProps = {
  onChange: (data: number) => void;
};

const RangeInput = ({ onChange }: RangeInputProps) => {
  const defaultValue = useAppSelector((state) => state.config.data.app.range);
  const [range, setRange] = useState(defaultValue);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    onChange(range);
  }, [onChange, range]);

  // use isReady to make sure when getting the input width is not empty
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <RangeBar
      onChange={(e) => {
        const value = Number(e.currentTarget.value);
        setRange(value);
      }}
      value={range}
      isReady={isReady}
    />
  );
};

export default RangeInput;
