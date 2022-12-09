import { useCallback, useRef } from 'react';
import { css } from '@emotion/react';
import { Title, Label, TextInput } from '@/components';
import { MIN_RANGE, MAX_RANGE } from '@/utils/constants';
import { useAppDispatch, useAppSelector, actions } from '@/model';
import {
  StyledSettings,
  StyledSettingBlock,
  StyledSettingBlockTitle,
  StyledSettingItem,
} from './styles';
import RangeBarContainer from './RangeBarContainer';
import { RangeBarContainerProps } from './RangeBarContainer/RangeBarContainer';

function Settings() {
  const dispatch = useAppDispatch();
  const { range, latitude, longitude } = useAppSelector((state) => state.config.data.app);
  const rangeRef = useRef(range);
  const latitudeRef = useRef<HTMLInputElement>(null);
  const longitudeRef = useRef<HTMLInputElement>(null);

  const onRangeChange: RangeBarContainerProps['onChange'] = useCallback(
    (data) => {
      rangeRef.current = data;
    },
    [rangeRef]
  );

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
    } else if (-90 > res.latitude || res.latitude > 90) {
      alert('latitude should be between -90 and 90');
      return;
    }

    if (Number.isNaN(res.longitude)) {
      alert('longitude should be number');
      return;
    } else if (-180 > res.longitude || res.longitude > 180) {
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
              <RangeBarContainer onChange={onRangeChange} defaultValue={range} />
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
            <TextInput
              type="text"
              id="latitude"
              name="latitude"
              ref={latitudeRef}
              defaultValue={latitude}
            />
          </StyledSettingItem>

          <StyledSettingItem>
            <Label htmlFor="longitude">Longitude</Label>
            <TextInput
              type="text"
              id="longitude"
              name="longitude"
              ref={longitudeRef}
              defaultValue={longitude}
            />
          </StyledSettingItem>
        </StyledSettingBlock>
      </div>

      <div
        css={css`
          text-align: center;
        `}
      >
        <button
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
}

export default Settings;
