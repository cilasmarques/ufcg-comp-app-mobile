import { NavigationContainer } from '@react-navigation/native';

// ROUTES
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { useAuth } from '../context/AuthContext';

const MainRouter = () => {
  const { handleGetAuthStatus } = useAuth();

  return (
    <NavigationContainer>
      {handleGetAuthStatus() ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  )
}

export default MainRouter;