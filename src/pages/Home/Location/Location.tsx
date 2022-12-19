import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import { useAppSelector } from '@/model';
import { useUserGPS } from '@/hooks';
import { Loading } from '@/components';

import { StyledLocation, StyledLocationContent } from './styles';

const Location = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { gps, coordinates, distance, inDistance } = useAppSelector(
    (state) => state.config.data.user
  );
  const [currentLatitude, currentLongitude] = coordinates || [null, null];

  const title = useMemo(() => {
    if (gps) return t('gps-enable');
    if (gps !== undefined) return t('gps-disable');
    return t('gps-loading');
  }, [gps, language]);

  const text = useMemo(() => {
    if (!gps) {
      return (
        <span
          css={css`
            color: #1f38ba;
          `}
        >
          {t('gps-disable-hint')}
        </span>
      );
    }
    if (inDistance) return t('gps-enable-hint');
    return t('far-from-office', { distance });
  }, [gps, distance, inDistance, language]);

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
            {t('position')}
          </div>
          <div
            css={css`
              font-size: 12px;
            `}
          >
            <div>
              {t('latitude')}: {currentLatitude || '?'},
            </div>
            <div>
              {t('longitude')}: {currentLongitude || '?'}
            </div>
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
          {gps === undefined || (gps && distance === undefined) ? <Loading size={24} /> : text}
        </div>
      </StyledLocationContent>
    </StyledLocation>
  );
};

export default Location;
