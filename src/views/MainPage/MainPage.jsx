import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

  useEffect(() => {
    const getRepositories = async () => {
      const repositories = await searchGitHub(searchValue);
      setRepositories(repositories);
    };

    searchType === searchTypes.IN_GITHUB && searchValue.length > 2 && getRepositories();
  }, [searchType, searchValue]);

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
