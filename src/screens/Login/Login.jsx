import { View, Button, Text } from "react-native"
import { useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import { REACT_APP_GOOGLE_CLIENT_ID } from '@env';

import { useAuth } from "../../context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const { handleAuthSuccess, handleAuthFailure } = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: REACT_APP_GOOGLE_CLIENT_ID
  });

  useEffect(() => {
    if (response?.type === 'success') {
      handleAuthSuccess(response.authentication.accessToken);
    } else {
      handleAuthFailure();
    }
  }, [response]);

  return (
    <View>
      <Text>COMPUTAÇÃO@UFCG</Text>
      <Button
        disabled={!request}
        title={"Login"}
        onPress={() => { promptAsync() }}
      />
    </View>
  )
}

export default LoginScreen;