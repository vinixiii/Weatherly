import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type User = FirebaseAuthTypes.User | null;

export interface AuthContextData {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<User>(null);

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  const handleAuthStateChanged = useCallback(
    (userInfo: User) => {
      setUser(userInfo);

      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChanged);

    return subscriber;
  }, [handleAuthStateChanged]);

  const authContextValues = useMemo((): AuthContextData => {
    return { user, setUser, signOut };
  }, [user]);

  if (initializing) return null;

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
}
