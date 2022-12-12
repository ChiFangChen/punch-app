import { useMemo } from 'react';
import { css } from '@emotion/react';
import { useAppSelector } from '@/model';
import { useUserGPS } from '@/hooks';
import { Loading } from '@/components';

import { StyledLocation, StyledLocationContent } from './styles';

enum LocationText {
  'disabled' = 'Please enable GPS',
  'enabled' = 'You Arrived',
  'far' = 'You are {{distance}} km away from office.',
}

const Location = () => {
  const { gps, coordinates, distance, inDistance } = useAppSelector(
    (state) => state.config.data.user
  );
  const [currentLatitude, currentLongitude] = coordinates || [null, null];

  const title = useMemo(() => {
    let status = '...';
    if (gps) status = 'enabled';
    else if (gps !== undefined) status = 'disabled';
    return `GPS is ${status}`;
  }, [gps]);

  const text = useMemo(() => {
    if (!gps) {
      return (
        <span
          css={css`
            color: #1f38ba;
          `}
        >
          {LocationText.disabled}
        </span>
      );
    }
    if (inDistance) return LocationText.enabled;
    return LocationText.far.replace('{{distance}}', `${distance}`);
  }, [gps, distance, inDistance]);

  useUserGPS();

  return (
    <StyledLocation>
      {title}
      <StyledLocationContent>
        <div
          css={css`
            text-align: left;
          `}
        >
          <div
            css={css`
              font-weight: 500;
            `}
          >
            Current position
          </div>
          <div
            css={css`
              font-size: 12px;
            `}
          >
            <div>Latitude: {currentLatitude || '?'},</div>
            <div>Longitude: {currentLongitude || '?'}</div>
          </div>
        </div>

        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
          `}
        >
          {gps === undefined || distance === undefined ? <Loading size={24} /> : text}
        </div>
      </StyledLocationContent>
    </StyledLocation>
  );
};

export default Location;
