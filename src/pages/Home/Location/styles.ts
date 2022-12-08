import styled from '@emotion/styled';

const StyledLocation = styled('div')`
  flex: 1;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;
  padding: 20px 40px;
`;

const StyledLocationContent = styled('div')`
  display: flex;
  margin-top: 20px;

  & > * {
    flex: 1;
  }
`;

export { StyledLocation, StyledLocationContent };
