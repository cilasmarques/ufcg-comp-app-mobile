import { NavigationContainer } from '@react-navigation/native';

// ROUTES
import { PublicDrawerRoutes } from "./PublicDrawerRoutes";
import { PrivateDrawerRoutes } from "./PrivateDrawerRoutes";
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
      {authStatus ? <PrivateDrawerRoutes /> : <PublicDrawerRoutes />}
    </NavigationContainer>
  )
}

export default MainRouter;