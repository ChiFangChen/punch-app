import { useRef } from 'react';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import {
  LocalToastTarget,
  useLocalToast,
  DefaultToastData,
  ToastPlacement,
} from 'react-local-toast';
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

const reactLocalToastOptions: {
  type: DefaultToastData['type'];
  placement: ToastPlacement;
} = {
  type: 'error',
  placement: 'right',
};

const Settings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { showToast, removeAllToasts } = useLocalToast();
  const rangeRef = useRef(MIN_RANGE);
  const latitudeRef = useRef<HTMLInputElement>(null);
  const longitudeRef = useRef<HTMLInputElement>(null);

  const onRangeChange: RangeInputProps['onChange'] = (data) => {
    rangeRef.current = data;
  };

  const onSave = () => {
    removeAllToasts();

    const res = {
      range: rangeRef.current,
      latitude: Number(latitudeRef.current?.value),
      longitude: Number(longitudeRef.current?.value),
    };

    if (MIN_RANGE > res.range || res.range > MAX_RANGE) {
      showToast(
        'range',
        t('range-limit', { min: MIN_RANGE, max: MAX_RANGE }),
        reactLocalToastOptions
      );
      return;
    }

    if (Number.isNaN(res.latitude)) {
      if (latitudeRef.current) latitudeRef.current.focus();
      showToast('latitude', t('latitude-number'), reactLocalToastOptions);
      return;
    }
    if (res.latitude < -90 || res.latitude > 90) {
      if (latitudeRef.current) latitudeRef.current.focus();
      showToast('latitude', t('latitude-limit'), reactLocalToastOptions);
      return;
    }

    if (Number.isNaN(res.longitude)) {
      if (longitudeRef.current) longitudeRef.current.focus();
      showToast('longitude', t('longitude-number'), reactLocalToastOptions);
      return;
    }
    if (res.longitude < -180 || res.longitude > 180) {
      if (longitudeRef.current) longitudeRef.current.focus();
      showToast('longitude', t('longitude-limit'));
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
            <LocalToastTarget name="longitude">
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
            </LocalToastTarget>
          </StyledSettingItem>
        </StyledSettingBlock>

        <StyledSettingBlock>
          <StyledSettingBlockTitle>{t('set-location')}</StyledSettingBlockTitle>

          <StyledSettingItem>
            <Label htmlFor="latitude">{t('latitude')}</Label>
            <LocalToastTarget name="latitude">
              <CoordinateInput ref={latitudeRef} name="latitude" />
            </LocalToastTarget>
          </StyledSettingItem>

          <StyledSettingItem>
            <Label htmlFor="longitude">{t('longitude')}</Label>
            <LocalToastTarget name="longitude">
              <CoordinateInput ref={longitudeRef} name="longitude" />
            </LocalToastTarget>
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
