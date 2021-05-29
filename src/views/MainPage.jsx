import { useCallback, useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { debounce } from '@material-ui/core';
import { Search } from '../components';
import { searchTypes } from '../constants/searchTypes';
import { searchGitHub } from '../services/searchRepositories';
import RepositoryList from './RepositoryList';
import RepositoryInfo from './RepositoryInfo';
import { FoldersContext } from '../contexts/FoldersContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > div:not(div:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const MainPage = () => {
  const styles = useStyles();

  const { folders, currentFolder } = useContext(FoldersContext);

  const [searchType, setSearchType] = useState(searchTypes.IN_GITHUB);
  const [searchValue, setSearchValue] = useState('');

  const [gitHubRepositories, setGitHubRepositories] = useState([]);

  const [expandedRepository, setExpandedRepository] = useState(null);

  const loadGitHubRepositories = async (searchValue) => {
    const repositories = await searchGitHub(searchValue);
    setGitHubRepositories(repositories);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGitHubSearch = useCallback(debounce(loadGitHubRepositories, 300), []);

  useEffect(() => {
    if (searchType === searchTypes.IN_GITHUB && searchValue.length > 2) {
      debouncedGitHubSearch(searchValue);
    }
  }, [debouncedGitHubSearch, searchType, searchValue]);

  return (
    <div className={styles.root}>
      {expandedRepository === null ? (
        <>
          <Search
            type={searchType}
            setType={setSearchType}
            phrase={searchValue}
            setPhrase={setSearchValue}
          />
          {searchType === searchTypes.IN_GITHUB ? (
            <RepositoryList
              items={gitHubRepositories}
              setExpandedRepository={setExpandedRepository}
            />
          ) : (
            <RepositoryList
              items={Object.values(folders[currentFolder])}
              setExpandedRepository={setExpandedRepository}
            />
          )}
        </>
      ) : (
        <RepositoryInfo
          item={gitHubRepositories[expandedRepository]}
          goBack={() => setExpandedRepository(null)}
        />
      )}
    </div>
  );
};

export default MainPage;
