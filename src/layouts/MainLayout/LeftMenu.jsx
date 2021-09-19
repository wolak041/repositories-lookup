import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { useContext, useState } from 'react';
import { FoldersContext } from '../../contexts/FoldersContext';
import { SearchContext } from '../../contexts/SearchContext';
import { searchTypes } from '../../constants/searchTypes';

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
  emptyText: {
    padding: theme.spacing(1),
  },
  newFolder: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    '& > :first-child': {
      marginBottom: theme.spacing(1),
    },
  },
  activeFolder: {
    backgroundColor: theme.palette.action.selected,
  },
}));

const LeftMenu = (props) => {
  const styles = useStyles();

  const [newFolderName, setNewFolderName] = useState(null);

  const { folders, setFolder, currentFolder, setCurrentFolder } = useContext(FoldersContext);
  const { setSearchType } = useContext(SearchContext);
  const [error, setError] = useState(false);

  const folderNames = Object.keys(folders);
  const createNewFolder = () => {
    const isAlreadyCreated = folderNames?.some((name) => name === newFolderName);

    if (!isAlreadyCreated) {
      setFolder((prev) => ({ ...prev, [newFolderName]: {} }));
      setNewFolderName(null);
    } else setError(true);
  };

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
          {folderNames.length > 0 ? (
            folderNames.map((name, index) => (
              <ListItem
                button
                key={name}
                onClick={() => {
                  setCurrentFolder(name);
                  setSearchType(searchTypes.IN_SAVED);
                }}
                className={currentFolder === name ? styles.activeFolder : ''}
              >
                <ListItemText primary={name} />
              </ListItem>
            ))
          ) : (
            <Typography color="textSecondary" className={styles.emptyText}>
              No folders
            </Typography>
          )}
          {newFolderName && (
            <div className={styles.newFolder}>
              <TextField
                label="New folder"
                variant="outlined"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className={styles.searchInput}
                error={error}
              />
              <Button variant="contained" color="primary" onClick={createNewFolder}>
                Save
              </Button>
            </div>
          )}
        </List>
      </div>
      <Fab
        color="primary"
        size="medium"
        onClick={() => setNewFolderName('New folder')}
        className={styles.addButton}
      >
        <Add />
      </Fab>
    </Drawer>
  );
};

LeftMenu.propTypes = {
  className: PropTypes.string,
};

export default LeftMenu;
