import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import { Title, Label } from '@/components';
import { MIN_RANGE, MAX_RANGE } from '@/utils/constants';
import { useAppDispatch, actions } from '@/model';
import {
  StyledSettings,
  StyledSettingBlock,
  StyledSettingBlockTitle,
  StyledSettingItem,
} from './styles';
import { RangeInputProps } from './RangeInput/RangeInput';
import RangeBarContainer from './RangeInput';
import CoordinateInput from './CoordinateInput';

const Settings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const rangeRef = useRef(MIN_RANGE);
  const latitudeRef = useRef<HTMLInputElement>(null);
  const longitudeRef = useRef<HTMLInputElement>(null);

  const onRangeChange: RangeInputProps['onChange'] = (data) => {
    rangeRef.current = data;
  };

  const onSave = () => {
    const res = {
      range: rangeRef.current,
      latitude: Number(latitudeRef.current?.value),
      longitude: Number(longitudeRef.current?.value),
    };

    if (MIN_RANGE > res.range || res.range > MAX_RANGE) {
      alert(t('range-limit', { min: MIN_RANGE, max: MAX_RANGE }));
      return;
    }

    if (Number.isNaN(res.latitude)) {
      alert(t('latitude-number'));
      return;
    }
    if (res.latitude < -90 || res.latitude > 90) {
      alert(t('latitude-limit'));
      return;
    }

    if (Number.isNaN(res.longitude)) {
      alert(t('longitude-number'));
      return;
    }
    if (res.longitude < -180 || res.longitude > 180) {
      alert(t('longitude-limit'));
      return;
    }

    dispatch(actions.saveAppConfigAsync(res));
  };

  return (
    <StyledSettings>
      <Title>{t('settings')}</Title>

      <div>
        <StyledSettingBlock>
          <StyledSettingBlockTitle>{t('set-range')}</StyledSettingBlockTitle>
          <StyledSettingItem>
            <Label htmlFor="range">{t('range-unit')}</Label>
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <span
                css={css`
                  color: #1b76e0;
                  font-weight: bold;
                `}
              >
                {MIN_RANGE}
                {t('km')}
              </span>
              <RangeBarContainer onChange={onRangeChange} />
              <span
                css={css`
                  color: #8cbaef;
                  font-weight: bold;
                `}
              >
                {MAX_RANGE}
                {t('km')}
              </span>
            </div>
          </StyledSettingItem>
        </StyledSettingBlock>

        <StyledSettingBlock>
          <StyledSettingBlockTitle>{t('set-location')}</StyledSettingBlockTitle>

          <StyledSettingItem>
            <Label htmlFor="latitude">{t('latitude')}</Label>
            <CoordinateInput ref={latitudeRef} name="latitude" />
          </StyledSettingItem>

          <StyledSettingItem>
            <Label htmlFor="longitude">{t('longitude')}</Label>
            <CoordinateInput ref={longitudeRef} name="longitude" />
          </StyledSettingItem>
        </StyledSettingBlock>
      </div>

      <div
        css={css`
          text-align: center;
        `}
      >
        <button
          type="button"
          css={css`
            background: #4691c9;
            border: 1px solid gray;
            color: white;
            border-radius: 100%;
            height: 80px;
            width: 80px;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
          `}
          onClick={onSave}
        >
          {t('save')}
        </button>
      </div>
    </StyledSettings>
  );
};

export default Settings;
