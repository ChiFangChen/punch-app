import Location from './Location';
import ClockBlock from './ClockBlock';
import History from './History';

import { StyledHome } from './styles';

const Home = () => (
  <StyledHome>
    <Location />

    <ClockBlock />

    <History />
  </StyledHome>
);

export default Home;
