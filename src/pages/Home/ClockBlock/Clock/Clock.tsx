import { useMemo } from 'react';
import { css } from '@emotion/react';
import { useGetTime } from '@/hooks';
import { StyledClock } from './styles';

const Clock = () => {
  const { displayTime, displayStatus, timeFormat } = useGetTime();

  const memoClock = useMemo(
    () => (
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
    ),
    [timeFormat]
  );

  return memoClock;
};

export default Clock;
