import { useState, createContext, useEffect } from 'react';
import { getFoldersFromLocalStorage, setFoldersToLocalStorage } from '../utils/localStorage';

export const FoldersContext = createContext({
  folders: {},
  setFolder: () => {},
  currentFolder: null,
  setCurrentFolder: () => {},
});

const FoldersContextProvider = (props) => {
  const [folders, setFolder] = useState({});
  const [currentFolder, setCurrentFolder] = useState(null);

  useEffect(() => {
    const savedFolders = getFoldersFromLocalStorage();
    setFolder(savedFolders || {});
  }, []);

  useEffect(() => {
    setFoldersToLocalStorage(folders);
  }, [folders]);

  return (
    <FoldersContext.Provider value={{ folders, setFolder, currentFolder, setCurrentFolder }}>
      {props.children}
    </FoldersContext.Provider>
  );
};

export default FoldersContextProvider;
