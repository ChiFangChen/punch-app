import { HashRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from '@/layout';
import Home from '@/pages/Home';
import Settings from '@/pages/Settings';
import NoMatch from '@/pages/NoMatch';
import { store } from '@/model';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
