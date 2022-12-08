import Location from './Location';
import ClockBlock from './ClockBlock';
import History from './History';

import { StyledHome } from './styles';

function Home() {
  return (
    <StyledHome>
      <Location></Location>

      <ClockBlock></ClockBlock>

      <History></History>
    </StyledHome>
  );
}

export default Home;
