import { css } from '@emotion/react';

import { StyledLocation, StyledLocationContent } from './styles';

enum LocationText {
  'disabled' = 'You Arrived',
  'enabled' = 'You Arrived',
  'far' = 'You are {{distance}} km away from office.',
}

function Location() {
  const [latitude, longitude] = [123, 23];
  const text = LocationText.far;

  return (
    <StyledLocation>
      GPS is enabled / disabled
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
          <div>
            <div>Latitude: {latitude},</div>
            <div>Longitude: {longitude}</div>
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