// createContext.js
import { createContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [value, setValue] = useState('Hello, world!');

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };