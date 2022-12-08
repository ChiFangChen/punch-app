import { useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Title, Label, TextInput, RangeBar } from '@/components';
import {
  StyledSettings,
  StyledSettingBlock,
  StyledSettingBlockTitle,
  StyledSettingItem,
} from './styles';

function Settings() {
  const [range, setRange] = useState(5);
  const latitudeRef = useRef<HTMLInputElement>(null);
  const longitudeRef = useRef<HTMLInputElement>(null);

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
              <RangeBar
                onChange={(e) => {
                  setRange(Number(e.currentTarget.value));
                }}
                value={range}
              />
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
            <TextInput type="text" id="latitude" name="latitude" ref={latitudeRef} />
          </StyledSettingItem>

          <StyledSettingItem>
            <Label htmlFor="longitude">Longitude</Label>
            <TextInput type="text" id="longitude" name="longitude" ref={longitudeRef} />
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
          onClick={() => {
            console.log(range, latitudeRef.current?.value, longitudeRef.current?.value);
          }}
        >
          SAVE
        </button>
      </div>
    </StyledSettings>
  );
}

export default Settings;
