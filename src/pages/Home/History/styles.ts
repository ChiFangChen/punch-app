import styled from '@emotion/styled';

const StyledHistory = styled('div')`
  flex: 1;
  align-self: flex-start;
  display: inline-block;
`;

const StyledHistoryItem = styled('div')`
  margin: 20px 0;

  & > div:first-of-type {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    align-items: center;

    & > span {
      font-size: 12px;
    }
  }

  & > div:last-of-type {
    font-size: 12px;
  }
`;

export { StyledHistory, StyledHistoryItem };
