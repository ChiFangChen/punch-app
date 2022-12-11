import { StyledClockBlock } from './styles';
import Clock from './Clock';
import ClockButton from './ClockButton';

function ClockBlock() {
  return (
    <StyledClockBlock>
      <Clock />
      <ClockButton />
    </StyledClockBlock>
  );
}

export default ClockBlock;
