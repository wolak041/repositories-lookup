import { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { searchTypes } from '../../constants/searchTypes';
import { SearchContext } from '../../contexts/SearchContext';

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

const Search = () => {
  const styles = useStyles();

  const { searchType, setSearchType, searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <div className={styles.root}>
      <ToggleButtonGroup
        value={searchType}
        exclusive
        onChange={(event, nextView) => nextView && setSearchType(nextView)}
      >
        <ToggleButton value={searchTypes.IN_GITHUB}>In GitHub</ToggleButton>
        <ToggleButton value={searchTypes.IN_SAVED}>In saved</ToggleButton>
      </ToggleButtonGroup>
      <TextField
        label="Search"
        variant="outlined"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

Search.propTypes = {
  type: PropTypes.string,
  phrase: PropTypes.string,
};

export default Search;
