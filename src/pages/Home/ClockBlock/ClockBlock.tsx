import { css } from '@emotion/react';

import { StyledClockBlock, StyledClock, StyledClockButton } from './styles';

enum ClockButton {
  'disabled' = 'Out of range',
  'enabled' = 'Clock ',
  'far' = 'Out of range',
}

const addZero = (num: string): string => (num.length < 2 ? `0${num}` : num);
const getHourStatusText = (hourStatus: string): string => `${hourStatus[0]}.${hourStatus[1]}`;

function ClockBlock() {
  const text = ClockButton.enabled + 'in';

  const now = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const [time, hourStatus] = now.split(' ');
  const [hour, minute] = time.split(':');
  const buttonStatus = 'in';

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
            {addZero(hour)}:{addZero(minute)}
          </div>
          <div
            css={css`
              font-size: 22px;
            `}
          >
            {getHourStatusText(hourStatus)}
          </div>
        </div>
      </StyledClock>

      <StyledClockButton buttonStatus={buttonStatus}>{text}</StyledClockButton>
    </StyledClockBlock>
  );
}

export default ClockBlock;
