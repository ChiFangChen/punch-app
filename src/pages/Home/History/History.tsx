import { StyledHistory, StyledHistoryItem } from './styles';

function History() {
  return (
    <StyledHistory>
      <h3>Recent clocking history</h3>

      <div>
        <StyledHistoryItem>
          <div>
            01/11 @ 07:10 A.M <span>Clock in</span>
          </div>
          <div>新北市.......</div>
        </StyledHistoryItem>

        <StyledHistoryItem>
          <div>
            01/11 @ 07:10 P.M <span>Clock Out</span>
          </div>
          <div>新北市.......</div>
        </StyledHistoryItem>
      </div>
    </StyledHistory>
  );
}

export default History;
