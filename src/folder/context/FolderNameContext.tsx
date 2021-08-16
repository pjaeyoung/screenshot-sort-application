import * as React from 'react';

const FolderNameStateContext = React.createContext<string>('');
const FolderNameDispatchContext = React.createContext<React.Dispatch<React.SetStateAction<string>>>(
  () => undefined,
);

const FolderNameProvider: React.FC = ({ children }) => {
  const [folderName, setFolderName] = React.useState('');
  return (
    <FolderNameStateContext.Provider value={folderName}>
      <FolderNameDispatchContext.Provider value={setFolderName}>
        {children}
      </FolderNameDispatchContext.Provider>
    </FolderNameStateContext.Provider>
  );
};

function useFolderNameState(): string {
  const folderName = React.useContext(FolderNameStateContext);
  return folderName;
}

function useFolderNameDispatch(): React.Dispatch<React.SetStateAction<string>> {
  const setFolderName = React.useContext(FolderNameDispatchContext);
  return setFolderName;
}

export { FolderNameProvider, useFolderNameState, useFolderNameDispatch };
