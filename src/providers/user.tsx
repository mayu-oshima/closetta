import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

//ユーザー情報
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../firebase';


const userContext = createContext<User | null>(null);

type userProviderProps = {
  children: ReactNode;
}

export const UserProvider = ({children}: userProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return <userContext.Provider value={user}>{children}</userContext.Provider>
};

export const useUser = () => useContext(userContext);
