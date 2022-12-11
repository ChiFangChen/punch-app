import { useAppSelector } from '@/model';
import ListItem from './ListItem';
import { StyledRecordList } from './styles';

function RecordList() {
  const { isReady, data: history } = useAppSelector((state) => state.history);

  return (
    <StyledRecordList>
      {isReady
        ? history.map(({ timestamp, action, address }) => {
            return (
              <ListItem key={timestamp} timestamp={timestamp} action={action} address={address} />
            );
          })
        : 'loading'}
    </StyledRecordList>
  );
}

export default RecordList;
