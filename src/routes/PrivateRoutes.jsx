import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/Dashboard/Dashboard';

const { Navigator, Screen } = createNativeStackNavigator();

export const PrivateRoutes = () => {
  return (
    <Navigator>
      <Screen name="Dashboard" component={DashboardScreen} />
    </Navigator>
  )
}
