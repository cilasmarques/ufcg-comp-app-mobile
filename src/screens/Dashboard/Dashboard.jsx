import { View, Button } from "react-native"
import { useAuth } from "../../context/AuthContext"

const DashboardScreen = () => {
  const { handleLogout } = useAuth();

  return (
    <View>
      <Button
        title={"Logout"}
        onPress={() => { handleLogout() }}
      />
    </View>
  )
}

export default DashboardScreen;