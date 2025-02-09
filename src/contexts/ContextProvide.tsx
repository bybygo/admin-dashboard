import React, { createContext, useContext, useState } from 'react';

export type ThemeMode = 'Light' | 'Dark';

interface StateContextProps {
  chat: boolean;
  cart: boolean;
  userProfile: boolean;
  notification: boolean;
  currentColor: string;
  currentMode: ThemeMode;
  activeMenu: boolean;
  screenSize: number | undefined;
  setScreenSize: (size: number) => void;
  handleClick: (clicked: string) => void;
  isClicked: { chat: boolean; cart: boolean; userProfile: boolean; notification: boolean };
  initialState: { chat: boolean; cart: boolean; userProfile: boolean; notification: boolean };
  setIsClicked: React.Dispatch<
    React.SetStateAction<{
      chat: boolean;
      cart: boolean;
      userProfile: boolean;
      notification: boolean;
    }>
  >;
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentColor: (color: string) => void;
  setCurrentMode: (mode: ThemeMode) => void;
  setMode: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setColor: (color: string) => void;
  themeSettings: boolean;
  setThemeSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const StateContext = createContext<StateContextProps>({} as StateContextProps);

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState<ThemeMode>('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMode(e.target.value as ThemeMode);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color: string) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked: string) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        chat: isClicked.chat,
        cart: isClicked.cart,
        userProfile: isClicked.userProfile,
        notification: isClicked.notification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
