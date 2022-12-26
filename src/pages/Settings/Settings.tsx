import { useRef, useMemo, useEffect } from 'react';
import { css } from '@emotion/react';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  LocalToastTarget,
  useLocalToast,
  DefaultToastData,
  ToastPlacement,
} from 'react-local-toast';
import { Title, Label } from '@/components';
import { MIN_RANGE, MAX_RANGE } from '@/utils/constants';
import { useAppSelector, useAppDispatch, actions } from '@/model';
import {
  StyledSettings,
  StyledSettingBlock,
  StyledSettingBlockTitle,
  StyledSettingItem,
} from './styles';
import { RangeInputProps } from './RangeInput/RangeInput';
import RangeBarContainer from './RangeInput';
import CoordinateInput from './CoordinateInput';

const validationSchema = (t: TFunction) =>
  yup.object({
    latitude: yup
      .number()
      .min(-90, t('latitude-limit') as string)
      .max(90, t('latitude-limit') as string)
      .required(t('latitude-number') as string),
    longitude: yup
      .number()
      .min(-180, t('longitude-limit') as string)
      .max(180, t('longitude-limit') as string)
      .required(t('longitude-number') as string),
  });

const reactLocalToastOptions: {
  type: DefaultToastData['type'];
  placement: ToastPlacement;
} = {
  type: 'error',
  placement: 'right',
};

const Settings = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const dispatch = useAppDispatch();
  const { showToast, removeAllToasts } = useLocalToast();
  const rangeRef = useRef(MIN_RANGE);
  const resolver = useMemo(() => yupResolver(validationSchema(t)), [language]);
  const defaultValues = useAppSelector((state) => ({
    latitude: state.config.data.app.latitude,
    longitude: state.config.data.app.longitude,
  }));
  const { handleSubmit, register, formState } = useForm({ defaultValues, resolver });

  const onRangeChange: RangeInputProps['onChange'] = (data) => {
    rangeRef.current = data;
  };

  const onSave = (data: any) => {
    const res = {
      range: rangeRef.current,
      ...data,
    };

    if (MIN_RANGE > res.range || res.range > MAX_RANGE) {
      showToast(
        'range',
        t('range-limit', { min: MIN_RANGE, max: MAX_RANGE }),
        reactLocalToastOptions
      );
      return;
    }

    dispatch(actions.saveAppConfig(res));
  };

  // error handler
  useEffect(() => {
    removeAllToasts();

    Object.keys(formState.errors).forEach((errorKey) => {
      showToast(
        errorKey,
        formState.errors[errorKey as 'longitude' | 'latitude']?.message || '',
        reactLocalToastOptions
      );
    });
  }, [formState.errors]);

  return (
    <StyledSettings>
      <Title>{t('settings')}</Title>

      <form onSubmit={handleSubmit(onSave)} noValidate>
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
                <CoordinateInput
                  min={-90}
                  max={90}
                  {...register('latitude', {
                    valueAsNumber: true,
                  })}
                />
              </LocalToastTarget>
            </StyledSettingItem>

            <StyledSettingItem>
              <Label htmlFor="longitude">{t('longitude')}</Label>
              <LocalToastTarget name="longitude">
                <CoordinateInput
                  min={-180}
                  max={180}
                  {...register('longitude', {
                    valueAsNumber: true,
                  })}
                />
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
            type="submit"
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
          >
            {t('save')}
          </button>
        </div>
      </form>
    </StyledSettings>
  );
};

export default Settings;
