import { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { debounce } from '@material-ui/core';
import { Search } from '../../components';
import { searchTypes } from '../../constants/searchTypes';
import { searchGitHub } from '../../services/searchRepositories';
import Repositories from './Repositories';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > div:not(div:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const MainPage = (props) => {
  const styles = useStyles();

  const [searchType, setSearchType] = useState(searchTypes.IN_GITHUB);
  const [searchValue, setSearchValue] = useState('');

  const [repositories, setRepositories] = useState([]);

  const setGitHubRepositories = async (searchValue) => {
    const repositories = await searchGitHub(searchValue);
    setRepositories(repositories);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(setGitHubRepositories, 300), []);

  useEffect(() => {
    if (searchType === searchTypes.IN_GITHUB && searchValue.length > 2) {
      debouncedSearch(searchValue);
    }
  }, [debouncedSearch, searchType, searchValue]);

  return (
    <div className={styles.root}>
      <Search
        type={searchType}
        setType={setSearchType}
        phrase={searchValue}
        setPhrase={setSearchValue}
      />
      <Repositories items={repositories} />
    </div>
  );
};

export default MainPage;
