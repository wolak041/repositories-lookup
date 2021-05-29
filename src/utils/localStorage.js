export const getFoldersFromLocalStorage = () => JSON.parse(localStorage.getItem('savedFolders'));

export const setFoldersToLocalStorage = (folders) =>
  localStorage.setItem('savedFolders', JSON.stringify(folders));
