// import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Material UI
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// App assets
// import { AppContext } from './context/AppStore';
// import light from './themes/light';
import dark from '../themes/dark';

// App routes
import Header from '../components/Header';
import Home from './Home';
import Edit from './Edit';
import NoPage from './NoPage';

function App() {
  // const [appState] = useContext(AppContext);
  // const appTheme = createTheme(appState.themeIsDark ? dark : light);
  const appTheme = createTheme(dark);
  // const home = '/';
  const home = '/apps/smartshopper';

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter basename={home}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />}>
            <Route path=":listId" element={<Edit />} />
            <Route path="new" element={<Edit />} />
          </Route>
          {/* <Route path="/settings" element={<Settings />} />
          <Route path="/download" element={<Download />} />
          <Route path="/upload" element={<Upload />} /> */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
