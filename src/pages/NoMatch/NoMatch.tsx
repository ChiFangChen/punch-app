import { Link } from 'react-router-dom';

function NoMatch() {
  return (
    <div>
      No Match Page
      <Link to="/home">Go Home</Link>
    </div>
  );
}

export default NoMatch;
