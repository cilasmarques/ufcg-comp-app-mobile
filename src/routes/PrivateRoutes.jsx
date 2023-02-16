import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { useAuth } from '../context/AuthContext';

import DashboardScreen from '../screens/Dashboard/Dashboard';
import ActivityRegisterScreen from '../screens/Activity/Register';
import ActivitiesListScreen from '../screens/Activity/List';

const { Navigator, Screen } = createDrawerNavigator();

export const PrivateRoutes = () => {
  const { user } = useAuth();
  const { handleLogout } = useAuth();

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props} style={{ marginTop: 25, borderRadius: 5 }}>
        <DrawerItemList {...props} />
        <DrawerItem label="Sair" onPress={handleLogout} />
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
      <Screen name="Atividades Complementares" component={DashboardScreen} />
      <Screen name="Activity Register" component={ActivityRegisterScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Screen name="Activities List" component={ActivitiesListScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Navigator>
  );
}
