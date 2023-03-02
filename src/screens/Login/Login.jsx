import { useEffect, useState } from 'react';
import { View, Button, ActivityIndicator, Image } from "react-native"
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// CONSTANTS
import { REACT_APP_GOOGLE_ANDROID_CLIENT_ID } from "../../utils/constants";

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
    androidClientId: REACT_APP_GOOGLE_ANDROID_CLIENT_ID,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (response?.type === 'success') {
      handleAuthUser(response.authentication);
    } else {
      handleAuthFailure();
    }
  }, [response]);

  const handleAuthUser = async (authentication) => {
    setIsLoading(true);
    try {
      const response = await authStudent(authentication);
      const userData = response.data.user;
      handleAuthSuccess(authentication, userData);
    } catch (error) {
      console.error(error);
      handleAuthFailure();
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/retangular-name.png')} style={{
        width: 300,
        height: 100,
        resizeMode: 'contain',
      }}/>
      {isLoading ?
        <ActivityIndicator size="large" color="#004A8F" /> :
        <Button
          disabled={!request}
          title={"Fazer login com o Google"}
          onPress={() => promptAsync({
            useProxy: false, //Set to false in production
            showInRecents: true
          })}
        />
      }
    </View>
  )
}

export default LoginScreen;