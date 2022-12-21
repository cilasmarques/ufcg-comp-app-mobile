import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { useAuth } from '../context/AuthContext';
import DashboardScreen from '../screens/Dashboard/Dashboard';

const { Navigator, Screen } = createDrawerNavigator();

export const PrivateDrawerRoutes = () => {
  const { user } = useAuth();
  const { handleLogout } = useAuth();

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props} style={{ marginTop: 25, borderRadius: 5 }}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={handleLogout} />
      </DrawerContentScrollView>
    );
  };

  return (
    <Navigator
      screenOptions={{
        headerTitle: "",
        headerTintColor: '#FFFFFF',
        headerStyle: {
          backgroundColor: "#004A8F"
        }
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Screen name="Horas Complementares" component={DashboardScreen} />
    </Navigator>
  );
}
