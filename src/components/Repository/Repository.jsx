import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Paper, Typography } from '@material-ui/core';
import NavigateNext from '@material-ui/icons/NavigateNext';
import UserAvatar from '../UserAvatar/UserAvatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    cursor: 'pointer',
    '& > :not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
  fullName: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  nextButton: {
    marginLeft: 'auto',
  },
}));

const Repository = ({ item, onClick }) => {
  const styles = useStyles();

  return (
    <Paper variant="outlined" onClick={onClick} className={styles.root}>
      <UserAvatar logoUrl={item.owner.avatarUrl} />
      <Typography className={styles.fullName}>{item.fullName}</Typography>
      <IconButton className={styles.nextButton}>
        <NavigateNext />
      </IconButton>
    </Paper>
  );
};

Repository.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
};

export default Repository;
