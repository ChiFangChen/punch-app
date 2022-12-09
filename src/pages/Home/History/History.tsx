import RecordItem from './RecordItem';
import { StyledHistory } from './styles';
interface Record {
  timestamp: number;
  action: 'clock in' | 'clock out';
  address: string;
}

function History() {
  const history: Record[] = [{ timestamp: 1670562432530, action: 'clock in', address: '新北市' }];

  return (
    <StyledHistory>
      <h3>Recent clocking history</h3>

      <div>
        {history.map(({ timestamp, action, address }) => {
          return (
            <RecordItem key={timestamp} timestamp={timestamp} action={action} address={address} />
          );
        })}
      </div>
    </StyledHistory>
  );
}

export default History;
