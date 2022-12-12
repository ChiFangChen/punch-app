import { StyledClockBlock } from './styles';
import Clock from './Clock';
import ClockButton from './ClockButton';

const ClockBlock = () => (
  <StyledClockBlock>
    <Clock />
    <ClockButton />
  </StyledClockBlock>
);

export default ClockBlock;
