import { forwardRef, ForwardedRef } from 'react';
import { TextInput } from '@/components';

const CoordinateInput = forwardRef((props, ref: ForwardedRef<HTMLInputElement>) => (
  <TextInput ref={ref} {...props} type="number" step="any" />
));

export default CoordinateInput;
