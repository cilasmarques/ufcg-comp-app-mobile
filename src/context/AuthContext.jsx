import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { REACT_APP_EMAIL_DOMAIN } from '@env';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export const AuthContext = createContext({
  user: null,
  handleLogout: () => { },
  handleAuthFailure: () => { },
  handleAuthSuccess: () => { },
  handleGetAuthStatus: () => { },
});

export const AuthProvider = ({ children }) => {
  const userAsyncStorage = (async () => {
    return AsyncStorage.getItem('@user')
      .then((u) => JSON.parse(u));
  })();

  const [user, setUser] = useState(userAsyncStorage);

  const handleAuthSuccess = useCallback(async (accessToken) => {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
    });

    const userCredentials = await response.json();
    const emailRegex = new RegExp(`[a-z0-9.]+${REACT_APP_EMAIL_DOMAIN}`);

    if (emailRegex.test(userCredentials.email)) {
      setUser(userCredentials);
      AsyncStorage.setItem('@user', JSON.stringify(userCredentials));
    } else {
      Alert.alert("Email inválido");
    }
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    AsyncStorage.removeItem('@user');
  }, []);

  const handleGetAuthStatus = useCallback(() => {
    // return true;
    return !!user?.email;
  }, [user]);

  const handleAuthFailure = () => {
    setUser(null);
    AsyncStorage.removeItem('@user');
  };

  const authProviderData = useMemo(() => ({
    user,
    handleLogout,
    handleAuthFailure,
    handleAuthSuccess,
    handleGetAuthStatus,
  }), [user, handleAuthSuccess, handleLogout, handleGetAuthStatus]);

  return (
    <AuthContext.Provider value={authProviderData}>
      {children}
    </AuthContext.Provider>
  );
};
