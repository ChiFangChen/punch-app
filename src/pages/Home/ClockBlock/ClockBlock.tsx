import { css } from '@emotion/react';
import { useAppDispatch, actions } from '@/model';
import { getTimeDetail } from '@/utils/time';

import { StyledClockBlock, StyledClock, StyledClockButton } from './styles';

enum ClockButton {
  'disabled' = 'Out of range',
  'enabled' = 'Clock ',
  'far' = 'Out of range',
}

function ClockBlock() {
  const dispatch = useAppDispatch();
  const buttonStatus = 'in';
  const text = ClockButton.enabled + buttonStatus;

  const { displayTime, displayStatus } = getTimeDetail();

  const onPunch = () => {
    dispatch(
      actions.appendHistoryAsync({
        action: `clock ${buttonStatus}`,
        address: '新北市...',
        timestamp: Date.now(),
      })
    );
  };

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

      <StyledClockButton buttonStatus={buttonStatus} onClick={onPunch}>
        {text}
      </StyledClockButton>
    </StyledClockBlock>
  );
}

export default ClockBlock;
