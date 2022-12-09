import { useEffect, useMemo } from 'react';
import { css } from '@emotion/react';
import { useAppSelector, useAppDispatch, actions } from '@/model';

import { StyledLocation, StyledLocationContent } from './styles';

enum LocationText {
  'disabled' = 'Please enable GPS',
  'enabled' = 'You Arrived',
  'far' = 'You are {{distance}} km away from office.',
}

function Location() {
  const dispatch = useAppDispatch();
  const { gps, coordinates, distance, inDistance } = useAppSelector(
    (state) => state.config.data.user
  );
  const [currentLatitude, currentLongitude] = coordinates || [null, null];
  const text = useMemo(() => {
    if (!gps) return LocationText.disabled;
    if (inDistance) return LocationText.enabled;
    return LocationText.far.replace('{{distance}}', `${distance}`);
  }, [gps, distance, inDistance]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      const successHandler =
        (type: string) =>
        ({
          coords: { latitude, longitude },
        }: {
          coords: { latitude: number; longitude: number };
        }) => {
          dispatch(
            actions.updateUser({
              coordinates: [latitude, longitude],
              gps: true,
            })
          );
        };

      const errorHandler = (type: string) => (err: any) => {
        dispatch(actions.updateUser({ gps: false }));
        console.log(type, err);
        // 1	PERMISSION_DENIED	沒有獲取裝置定位的權限
        // 2	POSITION_UNAVAILABLE	位置資訊獲取錯誤
        // 3	TIMEOUT	在 Timeout 前未取得定位資訊
      };

      navigator.geolocation.getCurrentPosition(successHandler('get'), errorHandler('get'));

      const geoId = navigator.geolocation.watchPosition(
        successHandler('watch'),
        errorHandler('get')
      );

      return () => {
        navigator.geolocation.clearWatch(geoId);
      };
    } else {
      alert("The browser doesn't support GPS");
    }
  }, [dispatch]);

  return (
    <StyledLocation>
      GPS is {gps ? 'enabled' : 'disabled'}
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
