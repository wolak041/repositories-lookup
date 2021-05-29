import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Repository } from '../../components';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > div:not(div:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
}));

const Repositories = ({ items = [] }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {items.length > 0 ? (
        items.map((item) => <Repository item={item} key={item.id} />)
      ) : (
        <Typography align="center" color="textSecondary">
          No results
        </Typography>
      )}
    </div>
  );
};

Repositories.propTypes = {
  items: PropTypes.array,
};

export default Repositories;
