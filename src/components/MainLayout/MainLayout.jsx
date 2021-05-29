import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LeftMenu from './LeftMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '240px auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `"header header"
    "sidebar content"`,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    gridArea: 'header',
  },
  leftMenu: {
    gridArea: 'sidebar',
  },
  toolbar: {
    justifyContent: 'space-between',
    gridArea: 'content',
  },
  navTitle: {
    fontWeight: 'bold',
  },
  content: {
    margin: `${theme.spacing(2)}px auto`,
  },
}));

const MainLayout = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Typography variant="h5" className={styles.navTitle}>
            GitHub repositories
          </Typography>
          <AccountCircle fontSize="large" />
        </Toolbar>
      </AppBar>
      <LeftMenu className={styles.leftMenu} />
      <Container className={styles.content}>{props.children}</Container>
    </div>
  );
};

export default MainLayout;
