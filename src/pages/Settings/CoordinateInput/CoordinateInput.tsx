import { forwardRef, ForwardedRef } from 'react';
import { useAppSelector } from '@/model';
import { TextInput } from '@/components';

export type CoordinateInputProps = {
  name: 'latitude' | 'longitude';
};

const CoordinateInput = forwardRef(
  ({ name }: CoordinateInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const defaultValue = useAppSelector((state) => state.config.data.app[name]);
    return <TextInput type="text" id={name} name={name} ref={ref} defaultValue={defaultValue} />;
  }
);

export default CoordinateInput;
