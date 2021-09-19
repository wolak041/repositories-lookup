import {
  createMuiTheme,
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core';
import { MainLayout } from './layouts';
import { MainPage } from './views';
import './assets/styles/index.css';
import FoldersContext from './contexts/FoldersContext';
import SearchContext from './contexts/SearchContext';

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
        <SearchContext>
          <FoldersContext>
            <MainLayout>
              <MainPage />
            </MainLayout>
          </FoldersContext>
        </SearchContext>
      </StylesProvider>
    </MuiThemeProvider>
  );
};

export default App;
