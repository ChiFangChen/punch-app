import RecordList from './RecordList';
import { StyledHistory } from './styles';

function History() {
  return (
    <StyledHistory>
      <h3>Recent clocking history</h3>

      <RecordList />
    </StyledHistory>
  );
}

export default History;
