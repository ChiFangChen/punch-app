import styled from '@emotion/styled';

const StyledSettings = styled('div')`
  max-width: 500px;
  width: 90%;
`;

const StyledSettingBlock = styled('div')`
  margin: 32px 0;
`;

const StyledSettingBlockTitle = styled('div')`
  font-size: 24px;
  border-bottom: 1px solid;
  padding-bottom: 10px;
`;

const StyledSettingItem = styled('div')`
  display: flex;
  align-items: center;
  margin: 16px 0;
  font-size: 22px;

  & div:last-of-type {
    flex: 1;
  }
`;

export { StyledSettings, StyledSettingBlock, StyledSettingBlockTitle, StyledSettingItem };
