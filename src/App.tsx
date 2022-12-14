import { HashRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { LocalToastProvider } from 'react-local-toast';
import Layout from '@/layout';
import Home from '@/pages/Home';
import Settings from '@/pages/Settings';
import NoMatch from '@/pages/NoMatch';
import { store } from '@/model';

const App = () => (
  <Provider store={store}>
    <LocalToastProvider>
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

      <Toaster />
    </LocalToastProvider>
  </Provider>
);

export default App;
