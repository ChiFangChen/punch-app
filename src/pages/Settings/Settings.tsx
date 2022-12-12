import { useRef } from 'react';
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
      alert(`range should be between ${MIN_RANGE} and ${MAX_RANGE}`);
      return;
    }

    if (Number.isNaN(res.latitude)) {
      alert('latitude should be number');
      return;
    }
    if (res.latitude < -90 || res.latitude > 90) {
      alert('latitude should be between -90 and 90');
      return;
    }

    if (Number.isNaN(res.longitude)) {
      alert('longitude should be number');
      return;
    }
    if (res.longitude < -180 || res.longitude > 180) {
      alert('longitude should be between -180 and 180');
      return;
    }

    dispatch(actions.saveAppConfigAsync(res));
  };

  return (
    <StyledSettings>
      <Title>Settings</Title>

      <div>
        <StyledSettingBlock>
          <StyledSettingBlockTitle>Set clockIn range</StyledSettingBlockTitle>
          <StyledSettingItem>
            <Label htmlFor="range">Range in KM</Label>
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
                {MIN_RANGE}KM
              </span>
              <RangeBarContainer onChange={onRangeChange} />
              <span
                css={css`
                  color: #8cbaef;
                  font-weight: bold;
                `}
              >
                {MAX_RANGE}KM
              </span>
            </div>
          </StyledSettingItem>
        </StyledSettingBlock>

        <StyledSettingBlock>
          <StyledSettingBlockTitle>Set office location</StyledSettingBlockTitle>

          <StyledSettingItem>
            <Label htmlFor="latitude">Latitude</Label>
            <CoordinateInput ref={latitudeRef} name="latitude" />
          </StyledSettingItem>

          <StyledSettingItem>
            <Label htmlFor="longitude">Longitude</Label>
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
          SAVE
        </button>
      </div>
    </StyledSettings>
  );
};

export default Settings;
