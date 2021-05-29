import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { searchTypes } from '../../constants/searchTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  searchInput: {
    flex: 1,
  },
}));

const Search = ({ type = searchTypes.IN_GITHUB, setType, phrase, setPhrase }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={(event, nextView) => nextView && setType(nextView)}
      >
        <ToggleButton value={searchTypes.IN_GITHUB}>In GitHub</ToggleButton>
        <ToggleButton value={searchTypes.IN_SAVED}>In saved</ToggleButton>
      </ToggleButtonGroup>
      <TextField
        label="Search"
        variant="outlined"
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

Search.propTypes = {
  type: PropTypes.string,
  setType: PropTypes.func,
  phrase: PropTypes.string,
  setPhrase: PropTypes.func,
};

export default Search;
