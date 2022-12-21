import { createContext, useContext, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export const AuthContext = createContext({
  user: null,
  auth: null,
  handleAuthSuccess: () => { },
  handleAuthFailure: () => { },
  handleLogout: () => { },
});

export const AuthProvider = ({ children }) => {
  const userAsyncStorage = (async () => {
    return AsyncStorage.getItem('@user')
      .then((u) => JSON.parse(u));
  })();

  const authAsyncStorage = (async () => {
    return AsyncStorage.getItem('@auth')
      .then((a) => JSON.parse(a));
  })();

  const [auth, setAuth] = useState(authAsyncStorage);
  const [user, setUser] = useState(userAsyncStorage);

  const handleAuthSuccess = async (authentication, userCredentials) => {
    await AsyncStorage.setItem('@auth', JSON.stringify(authentication));
    await AsyncStorage.setItem('@user', JSON.stringify(userCredentials));
    setAuth(authentication);
    setUser(userCredentials);
  };

  const handleAuthFailure = () => {
    AsyncStorage.removeItem('@user');
    AsyncStorage.removeItem('@auth');
    setAuth(null);
    setUser(null);
  };

  const handleLogout = () => {
    AsyncStorage.removeItem('@user');
    AsyncStorage.removeItem('@auth');
    setAuth(null);
    setUser(null);
  };

  const authProviderData = useMemo(() => ({
    auth,
    user,
    handleAuthSuccess,
    handleAuthFailure,
    handleLogout,
  }), [auth, user]);

  return (
    <AuthContext.Provider value={authProviderData}>
      {children}
    </AuthContext.Provider>
  );
};
