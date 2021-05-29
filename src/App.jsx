import {
  createMuiTheme,
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core';
import { MainLayout } from './components';
import { MainPage } from './views';
import './assets/styles/index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0e101c',
    },
    secondary: {
      main: '#bf1650',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Open Sans',
    ].join(','),
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <MainLayout>
          <MainPage />
        </MainLayout>
      </StylesProvider>
    </MuiThemeProvider>
  );
};

export default App;
