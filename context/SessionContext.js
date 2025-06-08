import { createContext, useState } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [totalSessions, setTotalSessions] = useState(null); 
  const [currentSession, setCurrentSession] = useState(1);
  const [isBreak, setIsBreak] = useState(false);
  const [studyTimeMinutes] = useState(40);
  const [breakTimeMinutes] = useState(7);

  const resetSession = () => {
    setCurrentSession(1);
    setIsBreak(false);
  };

  const incrementSession = () => {
    setCurrentSession((prev) => prev + 1);
  };

  return (
    <SessionContext.Provider
      value={{
        totalSessions,
        setTotalSessions,
        currentSession,
        setCurrentSession,
        isBreak,
        setIsBreak,
        studyTimeMinutes,
        breakTimeMinutes,
        resetSession,
        incrementSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};


