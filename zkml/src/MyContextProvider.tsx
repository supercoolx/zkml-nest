import React, { ReactNode, useContext, useState } from "react";

interface MyContextType {
  selectedMenuItem: string;
  setSelectedMenuItem: (name: string | null) => void;
}

const MyContext = React.createContext<MyContextType | undefined>(undefined);

interface MyContextProps {
  children: ReactNode;
}

export const MyContextProvider: React.FC<MyContextProps> = ({ children }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  return (
    <MyContext.Provider
      value={{ selectedMenuItem, setSelectedMenuItem } as any}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
      throw new Error("useAppContext must be used within a WrapperProvider");
    }
    return context;
  };