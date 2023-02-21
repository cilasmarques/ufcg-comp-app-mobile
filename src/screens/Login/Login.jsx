import { useEffect } from 'react';
import { View, Button, Text, Alert } from "react-native"
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// ENVOIROMENT VARIABLES
const REACT_APP_GOOGLE_EXPO_CLIENT_ID="55679260638-cfumf5qacpehgjevtv2id46ij70d6t2d.apps.googleusercontent.com"
const REACT_APP_GOOGLE_ANDROID_CLIENT_ID="55679260638-u536a1pi7or0o5fgpudtsl0accctq5ot.apps.googleusercontent.com"

// CONTEXT
import { useAuth } from "../../context/AuthContext";

// SERVICES
import { authStudent } from '../../services/AuthService';

// STYLES
import styles from "./styles.login";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const { handleAuthSuccess, handleAuthFailure } = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: REACT_APP_GOOGLE_EXPO_CLIENT_ID,
    androidClientId: REACT_APP_GOOGLE_ANDROID_CLIENT_ID
  });

  useEffect(() => {
    if (response?.type === 'success') {
      handleAuthUser(response.authentication);
    } else {
      handleAuthFailure();
    }
  }, [response]);

  const handleAuthUser = async (authentication) => {
    const response = await authStudent(authentication);
    console.log(response)
    if (response?.status === 200) {
      const userData = response.data.user;
      handleAuthSuccess(authentication, userData);
    } else {
      Alert.alert("Email inválido");
      handleAuthFailure();
   }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> COMPUTAÇÃO@UFCG </Text>
      <Button
        disabled={!request}
        title={"Fazer login com o Google"}
        onPress={() => promptAsync({ 
          useProxy: false, //Set to false in production
          showInRecents: true
        })} 
      />
    </View>
  )
}

export default LoginScreen;