import { NavigationContainer } from '@react-navigation/native';

// ROUTES
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const MainRouter = () => {
  const { auth } = useAuth();
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    const status = auth && (auth._z !== null);
    setAuthStatus(status);
  }, [auth])

  return (
    <NavigationContainer>
      {authStatus ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  )
};

export default MainRouter;