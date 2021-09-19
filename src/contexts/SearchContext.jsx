import { useState, createContext } from 'react';
import { searchTypes } from '../constants/searchTypes';

export const SearchContext = createContext({
  searchType: {},
  setSearchType: () => {},
  searchValue: '',
  setSearchValue: () => {},
});

const SearchContextProvider = (props) => {
  const [searchType, setSearchType] = useState(searchTypes.IN_GITHUB);
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchContext.Provider value={{ searchType, setSearchType, searchValue, setSearchValue }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
