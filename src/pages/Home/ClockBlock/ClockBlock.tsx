import { css } from '@emotion/react';
import { getTimeDetail } from '@/utils/time';

import { StyledClockBlock, StyledClock } from './styles';
import ClockButton from './ClockButton';

function ClockBlock() {
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

      <ClockButton />
    </StyledClockBlock>
  );
}

export default ClockBlock;
