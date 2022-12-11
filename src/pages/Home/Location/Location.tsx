import { useMemo } from 'react';
import { css } from '@emotion/react';
import { useAppSelector } from '@/model';
import { useUserGPS } from '@/hooks';

import { StyledLocation, StyledLocationContent } from './styles';

enum LocationText {
  'loading' = 'Positioning',
  'disabled' = 'Please enable GPS',
  'enabled' = 'You Arrived',
  'far' = 'You are {{distance}} km away from office.',
}

function Location() {
  const { gps, coordinates, distance, inDistance } = useAppSelector(
    (state) => state.config.data.user
  );
  const [currentLatitude, currentLongitude] = coordinates || [null, null];
  const text = useMemo(() => {
    if (gps === undefined) return LocationText.loading;
    if (!gps)
      return (
        <span
          css={css`
            color: #1f38ba;
          `}
        >
          {LocationText.disabled}
        </span>
      );
    if (inDistance) return LocationText.enabled;
    return LocationText.far.replace('{{distance}}', `${distance}`);
  }, [gps, distance, inDistance]);

  useUserGPS();

  return (
    <StyledLocation>
      GPS is {gps ? 'enabled' : gps === undefined ? '...' : 'disabled'}
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
            font-weight: 600;
          `}
        >
          {text}
        </div>
      </StyledLocationContent>
    </StyledLocation>
  );
}

export default Location;
