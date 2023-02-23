import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Image, ImageBackground, Text, View } from 'react-native';

// CONTEXT
import { useAuth } from '../context/AuthContext';

// SCREENS
import DashboardScreen from '../screens/Activity/Dashboard/Dashboard';
import ActivityRegisterScreen from '../screens/Activity/Register/Register';
import ActivitiesListScreen from '../screens/Activity/List/List';

// STYLES
import styles from "./styles.router";

const { Navigator, Screen } = createDrawerNavigator();

export const PrivateRoutes = () => {
  const { handleLogout, user } = useAuth();

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView contentContainerStyle={styles.drawerContainer} {...props}>
        <Text style={styles.mainTitle}> COMPUTAÇÃO@UFCG </Text>

        <ImageBackground style={styles.imageBackgroundContainer}>
          <Image style={styles.image} source={{ uri: user?.picture }} />
          <Text style={styles.userData} >Olá, {user?.name}</Text>
        </ImageBackground>

        <View style={styles.itemsContainer}>
          <DrawerItemList {...props} />
          <DrawerItem label="Sair" onPress={handleLogout} />
        </View>
      </DrawerContentScrollView>
    );
  };

  return (
    <Navigator
      screenOptions={{
        headerTitle: "", //Maybe remove this line
        headerTintColor: '#FFFFFF',
        headerStyle: { backgroundColor: "#004A8F" }
      }}
      initialRouteName="Atividades Complementares"
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
