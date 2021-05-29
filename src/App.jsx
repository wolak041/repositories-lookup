import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import './assets/styles/index.css';

const theme = createMuiTheme({});

const App = () => {
  return <MuiThemeProvider theme={theme}></MuiThemeProvider>;
};

export default App;
