import { useContext } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

// Material UI
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// App assets
import { AppContext } from '../context/AppStore';
import light from '../themes/light';
import dark from '../themes/dark';

// App routes
import Layout from './Layout';
import Home from './Home';
import EditList from './EditList';
import NewList from './NewList';
import Settings from './Settings';
import Download from './Download';
import Upload from './Upload';
import NoPage from './NoPage';

export default function App() {
  const [appState] = useContext(AppContext);
  const appTheme = createTheme(appState.themeIsDark ? dark : light);
  // const home = '/';
  const home = '/apps/mylist';

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="edit/:listId" element={<EditList />} />
      <Route path="new" element={<NewList />} />
      <Route path="settings" element={<Settings />} />
      <Route path="download" element={<Download />} />
      <Route path="upload" element={<Upload />} />
      <Route path="*" element={<NoPage />} />
    </Route >
  ), { basename: home });

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
