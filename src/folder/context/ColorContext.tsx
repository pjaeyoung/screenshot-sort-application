import * as React from 'react';

const ColorStateContext = React.createContext<string>('');
const ColorDispatchContext = React.createContext<React.Dispatch<React.SetStateAction<string>>>(
  () => undefined,
);

const ColorProvider: React.FC = ({ children }) => {
  const [color, setColor] = React.useState('');
  return (
    <ColorStateContext.Provider value={color}>
      <ColorDispatchContext.Provider value={setColor}>{children}</ColorDispatchContext.Provider>
    </ColorStateContext.Provider>
  );
};

function useColorState(): string {
  const color = React.useContext(ColorStateContext);
  return color;
}

function useColorDispatch(): React.Dispatch<React.SetStateAction<string>> {
  const setColor = React.useContext(ColorDispatchContext);
  return setColor;
}

export { ColorProvider, useColorState, useColorDispatch };
