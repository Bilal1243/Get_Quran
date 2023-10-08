import React, { createContext, useContext, useState } from 'react';

const chapterContext = createContext();

export const useGlobalState = () => {
  return useContext(chapterContext);
};

export const GlobalStateProvider = ({ children }) => {
  const [chapter, setChapter] = useState('');

  const updateGlobalState = (newState) => {
    console.log(newState)
    setChapter(newState);
  };

  return (
    <chapterContext.Provider value={{ chapter, updateGlobalState }}>
      {children}
    </chapterContext.Provider>
  );
};
