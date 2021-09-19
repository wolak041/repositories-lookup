import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Fab,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import { UserAvatar } from '../components';
import { Add } from '@material-ui/icons';
import { formatDate } from '../utils/formatDate';
import { FoldersContext } from '../contexts/FoldersContext';

const useStyles = makeStyles((theme) => ({
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4),
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  info: {
    '& > div:not(div:last-child)': {
      marginBottom: theme.spacing(4),
    },
  },
  userInfo: {
    display: 'flex',
    '& > :first-child': {
      marginRight: theme.spacing(4),
    },
  },
  list: {
    minWidth: 220,
  },
}));

const RepositoryList = ({ item = {}, goBack }) => {
  const styles = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const { folders, setFolder } = useContext(FoldersContext);
  const folderNames = Object.keys(folders);

  const usedFolderNames = Object.entries(folders).reduce(
    (usedFolders, [name, repositories]) =>
      Object.keys(repositories).includes(item.id?.toString())
        ? [...usedFolders, name]
        : usedFolders,
    []
  );

  const handleMenuClick = (name) => {
    setFolder((prev) => ({ ...prev, [name]: { ...prev[name], [item.id]: item } }));
    setAnchorEl(null);
  };

  return (
    <div className={styles.root}>
      <div className={styles.navigation}>
        <IconButton onClick={goBack}>
          <NavigateBefore />
        </IconButton>
        <Fab onClick={(e) => setAnchorEl(e.currentTarget)} color="primary" size="medium">
          <Add />
        </Fab>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {folderNames.map((name) => (
            <MenuItem onClick={() => handleMenuClick(name)} key={name}>
              {name}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.userInfo}>
            <UserAvatar logoUrl={item.owner?.avatarUrl} width={100} height={100} />
            <div>
              <Typography>Owner name: {item.owner?.login}</Typography>
              <Typography>
                GitHub Link:{' '}
                <Link href={item.owner?.htmlUrl} target="_blank" rel="noopener noreferrer">
                  {item.owner?.htmlUrl}
                </Link>
              </Typography>
            </div>
          </div>
          <div>
            <Typography variant="h5">{item.name}</Typography>
            <Typography>Created at: {formatDate(item.createdAt)}</Typography>
            <Typography>Language: {item.language}</Typography>
          </div>
        </div>
        <div className={styles.list}>
          <List>
            {usedFolderNames.map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

RepositoryList.propTypes = {
  item: PropTypes.object,
  goBack: PropTypes.func,
};

export default RepositoryList;
