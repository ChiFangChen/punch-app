import { css } from '@emotion/react';

import { StyledClockBlock, StyledClock, StyledClockButton } from './styles';
import { getTimeDetail } from '@/utils/time';

enum ClockButton {
  'disabled' = 'Out of range',
  'enabled' = 'Clock ',
  'far' = 'Out of range',
}

function ClockBlock() {
  const buttonStatus = 'in';
  const text = ClockButton.enabled + buttonStatus;

  const { displayTime, displayStatus } = getTimeDetail();

  return (
    <StyledClockBlock>
      <StyledClock>
        <div
          css={css`
            text-align: center;
          `}
        >
          <div
            css={css`
              font-size: 56px;
              font-weight: 600;
            `}
          >
            {displayTime}
          </div>
          <div
            css={css`
              font-size: 22px;
            `}
          >
            {displayStatus}
          </div>
        </div>
      </StyledClock>

      <StyledClockButton buttonStatus={buttonStatus}>{text}</StyledClockButton>
    </StyledClockBlock>
  );
}

export default ClockBlock;
