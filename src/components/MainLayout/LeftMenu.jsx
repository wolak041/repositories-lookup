import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Fab, List, ListItem, ListItemText, Toolbar } from '@material-ui/core';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 220,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    margin: theme.spacing(2),
  },
}));

const LeftMenu = (props) => {
  const styles = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        root: props.className,
        paper: styles.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={styles.drawerContainer}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
      <Fab color="primary" size="medium" className={styles.addButton}>
        <Add />
      </Fab>
    </Drawer>
  );
};

LeftMenu.propTypes = {
  className: PropTypes.string,
};

export default LeftMenu;
