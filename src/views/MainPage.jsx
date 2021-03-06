import { useCallback, useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { debounce } from '@material-ui/core';
import { Search } from '../components';
import { searchTypes } from '../constants/searchTypes';
import { searchGitHub } from '../services/searchRepositories';
import RepositoryList from './RepositoryList';
import RepositoryInfo from './RepositoryInfo';
import { FoldersContext } from '../contexts/FoldersContext';
import { SearchContext } from '../contexts/SearchContext';

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
  const { searchType, searchValue } = useContext(SearchContext);

  const [gitHubRepositories, setGitHubRepositories] = useState([]);
  const [folderRepositories, setFolderRepositories] = useState([]);

  const [expandedRepository, setExpandedRepository] = useState(null);

  useEffect(() => {
    setExpandedRepository(null);
  }, [searchType, currentFolder]);

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

  useEffect(() => {
    if (searchType === searchTypes.IN_SAVED && folders[currentFolder]) {
      const repositories = Object.values(folders[currentFolder]).filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFolderRepositories(repositories);
    }
  }, [currentFolder, folders, searchType, searchValue]);

  const repositories =
    searchType === searchTypes.IN_GITHUB ? gitHubRepositories : folderRepositories;

  return (
    <div className={styles.root}>
      {expandedRepository === null ? (
        <>
          <Search />
          <RepositoryList items={repositories} setExpandedRepository={setExpandedRepository} />
        </>
      ) : (
        <RepositoryInfo
          item={repositories[expandedRepository]}
          goBack={() => setExpandedRepository(null)}
        />
      )}
    </div>
  );
};

export default MainPage;
