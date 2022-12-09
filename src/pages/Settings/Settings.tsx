import { useCallback, useRef } from 'react';
import { css } from '@emotion/react';
import { Title, Label, TextInput } from '@/components';
import {
  StyledSettings,
  StyledSettingBlock,
  StyledSettingBlockTitle,
  StyledSettingItem,
} from './styles';
import RangeBarContainer from './RangeBarContainer';
import { RangeBarContainerProps } from './RangeBarContainer/RangeBarContainer';

function Settings() {
  const defaultValues = {
    range: 10,
    latitude: 23,
    longitude: 123,
  };
  const rangeRef = useRef(defaultValues.range);
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

    if (5 > res.range || res.range > 20) {
      alert('range should be between 5 and 20');
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

    console.log(res);
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
                5KM
              </span>
              <RangeBarContainer onChange={onRangeChange} defaultValue={defaultValues.range} />
              <span
                css={css`
                  color: #8cbaef;
                  font-weight: bold;
                `}
              >
                20KM
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
              defaultValue={defaultValues.latitude}
            />
          </StyledSettingItem>

          <StyledSettingItem>
            <Label htmlFor="longitude">Longitude</Label>
            <TextInput
              type="text"
              id="longitude"
              name="longitude"
              ref={longitudeRef}
              defaultValue={defaultValues.longitude}
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
