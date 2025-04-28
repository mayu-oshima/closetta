import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

//ユーザー情報
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, orderBy, query, limit, FieldValue } from 'firebase/firestore';

type latestOrderType = {
  name: string;
  postal: string;
  address: string;
  phone: string;
  payment: string;
  credit: {
    credit_num: string;
    security_code: string;
    expiry_month: string;
    expiry_year: string;
    times: string;
  },
  conveni: string;
  timestamp: FieldValue;
};

type userContextType = {
  userAccount: User | null;
  latestOrder: latestOrderType | null;
  setLatestOrder: React.Dispatch<React.SetStateAction<latestOrderType | null>>;
};

const userContext = createContext<userContextType | null>(null);

type userProviderProps = {
  children: ReactNode;
}

export const UserProvider = ({children}: userProviderProps) => {
  const [userAccount, setUserAccount] = useState<User | null>(null);

  const [latestOrder, setLatestOrder] = useState<latestOrderType | null>(null);

  const user = auth.currentUser;
  if(user) {
    console.log(user.uid);
  }

  useEffect(() => {
    const fetchOrders = async () => {
      if(!user) return;

      const ordersRef = collection(db, 'users', user.uid, 'orders');
      const q = query(ordersRef, orderBy('timestamp', 'desc'), limit(1));
      const snapshot = await getDocs(q);
      console.log(snapshot);

      if(!snapshot.empty) {
        const doc = snapshot.docs[0];
        console.log('hello');
        console.log(doc);

        setLatestOrder(doc.data() as any);
      }
    }

    fetchOrders();
  }, [user]);


  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUserAccount(currentUser);
    });
  }, []);

  return <userContext.Provider value={{userAccount, latestOrder, setLatestOrder}}>{children}</userContext.Provider>
};

export const useUser = () => {
  const context = useContext(userContext);
  if(!context) {
    throw new Error('ユーザーデータがありません');
  }
  return context;
};
