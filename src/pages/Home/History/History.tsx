import { css } from '@emotion/react';
import { useAppSelector } from '@/model';
import RecordItem from './RecordItem';
import { StyledHistory } from './styles';

function History() {
  const { isReady, data: history } = useAppSelector((state) => state.history);

  return (
    <StyledHistory>
      <h3>Recent clocking history</h3>

      <div
        css={css`
          height: 238px;
          overflow: auto;
        `}
      >
        {isReady
          ? history.map(({ timestamp, action, address }) => {
              return (
                <RecordItem
                  key={timestamp}
                  timestamp={timestamp}
                  action={action}
                  address={address}
                />
              );
            })
          : 'loading'}
      </div>
    </StyledHistory>
  );
}

export default History;
