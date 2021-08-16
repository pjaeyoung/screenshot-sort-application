import * as React from 'react';

const EditModeStateContext = React.createContext<boolean>(false);
const EditModeDispatchContext = React.createContext<React.Dispatch<React.SetStateAction<boolean>>>(
  () => undefined,
);

const EditModeProvider: React.FC = ({ children }) => {
  const [canEdit, setCanEdit] = React.useState(false);
  return (
    <EditModeStateContext.Provider value={canEdit}>
      <EditModeDispatchContext.Provider value={setCanEdit}>
        {children}
      </EditModeDispatchContext.Provider>
    </EditModeStateContext.Provider>
  );
};

function useEditModeState(): boolean {
  const canEdit = React.useContext(EditModeStateContext);
  return canEdit;
}

function useEditModeDispatch(): React.Dispatch<React.SetStateAction<boolean>> {
  const setCanEdit = React.useContext(EditModeDispatchContext);
  return setCanEdit;
}

export { EditModeProvider, useEditModeState, useEditModeDispatch };
