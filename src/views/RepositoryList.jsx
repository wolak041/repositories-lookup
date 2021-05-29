import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Repository } from '../components';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > div:not(div:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
}));

const RepositoryList = ({ items = [], setExpandedRepository }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {items.length > 0 ? (
        items.map((item, index) => (
          <Repository onClick={() => setExpandedRepository(index)} item={item} key={item.id} />
        ))
      ) : (
        <Typography align="center" color="textSecondary">
          No results
        </Typography>
      )}
    </div>
  );
};

RepositoryList.propTypes = {
  items: PropTypes.array,
  setExpandedRepository: PropTypes.func,
};

export default RepositoryList;
