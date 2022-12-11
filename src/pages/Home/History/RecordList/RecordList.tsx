import { css } from '@emotion/react';
import { useAppSelector } from '@/model';
import { Loading } from '@/components';
import ListItem from './ListItem';
import { StyledRecordList } from './styles';

function RecordList() {
  const { isReady, data: history } = useAppSelector((state) => state.history);

  return (
    <StyledRecordList>
      {isReady ? (
        history.map(({ timestamp, action, address }) => {
          return (
            <ListItem key={timestamp} timestamp={timestamp} action={action} address={address} />
          );
        })
      ) : (
        <div
          css={css`
            position: relative;
            left: 90px;
            top: 45px;
          `}
        >
          <Loading />
        </div>
      )}
    </StyledRecordList>
  );
}

export default RecordList;
