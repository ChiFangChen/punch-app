import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/layout';
import Home from '@/pages/Home';
import Settings from '@/pages/Settings';
import NoMatch from '@/pages/NoMatch';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
