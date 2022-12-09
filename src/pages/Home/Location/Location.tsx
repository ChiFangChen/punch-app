import { useEffect, useState, useMemo } from 'react';
import { css } from '@emotion/react';
import { useAppSelector } from '@/model';
import { getDistance } from '@/utils/getDistance';

import { StyledLocation, StyledLocationContent } from './styles';

enum LocationText {
  'disabled' = 'You Arrived',
  'enabled' = 'You Arrived',
  'far' = 'You are {{distance}} km away from office.',
}

function Location() {
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);
  const {
    data: { latitude, longitude },
  } = useAppSelector((state) => state.config);
  const [currentLatitude, currentLongitude] = currentPosition || [null, null];
  const distance = useMemo(
    () =>
      currentLatitude && currentLongitude
        ? Math.ceil(getDistance(latitude, longitude, currentLatitude, currentLongitude))
        : undefined,
    [latitude, longitude, currentLatitude, currentLongitude]
  );
  const text = LocationText.far.replace('{{distance}}', `${distance}`);

  useEffect(() => {
    if ('geolocation' in navigator) {
      const successHandler =
        (type: string) => (position: { coords: { latitude: number; longitude: number } }) => {
          setCurrentPosition([position.coords.latitude, position.coords.longitude]);
        };

      const errorHandler = (type: string) => (err: any) => {
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
  }, [setCurrentPosition]);

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
