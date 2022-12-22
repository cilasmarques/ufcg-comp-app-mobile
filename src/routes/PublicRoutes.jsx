import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/Login';

const { Navigator, Screen } = createNativeStackNavigator();

export const PublicRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={LoginScreen} />
    </Navigator>
  )
}
