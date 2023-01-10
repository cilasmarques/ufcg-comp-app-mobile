import { useEffect } from 'react';
import { StyleSheet, View, Button, Text, Alert } from "react-native"

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import { REACT_APP_GOOGLE_EXPO_CLIENT_ID, REACT_APP_GOOGLE_ANDROID_CLIENT_ID, REACT_APP_EMAIL_DOMAIN } from '@env';

import { useAuth } from "../../context/AuthContext";
import { fetchUserByEmail, registerUser } from '../../services/userService';

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
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authentication.accessToken}`,
        'Content-Type': 'application/json'
      },
    });

    const userCredentials = await response.json();
    const emailRegex = new RegExp(`[a-z0-9.]+${REACT_APP_EMAIL_DOMAIN}`);

    if (emailRegex.test(userCredentials.email)) {
      const response = await fetchUserByEmail(userCredentials.email);
      if (response?.status === 200) {
        const userData = response.data.user;
        handleAuthSuccess(authentication, userData);
      } else {
        handleRegisterUser(authentication, userCredentials);
      }
    } else {
      Alert.alert("Email inválido");
    }
  };

  const handleRegisterUser = async (authentication, userCredentials) => {
    const userData = {
      "name": userCredentials.name,
      "email": userCredentials.email,
      "picture": userCredentials.picture,
      "role": "student",
    };

    const response = await registerUser(userData);
    if (response?.status === 200) {
      handleAuthSuccess(authentication, userData);
    } else {
      Alert.alert("Falha ao autenticar o usuário");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> COMPUTAÇÃO@UFCG </Text>
      <Button
        disabled={!request}
        title={"Fazer login com o Google"}
        onPress={() => promptAsync({ useProxy: true, showInRecents: true })} //TODO On Build: set the useProxy on build 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "#004A8F",
  },
});

export default LoginScreen;