import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAuthStore } from '~/shared/auth';
import { Button, ButtonText } from '~/shared/ui/button';

interface LoginResult {
  //   error: ErrorApiResponse | null;
  type: 'success' | 'failure' | 'cancel';
  url: string | null;
}

export const useWarmUpBrowser = () => {
  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
};

const extractParamsWithRegex: (url: string) => {
  accessToken: string | null;
  refreshToken: string | null;
} = (url: string) => {
  const accessTokenMatch = url.match(/accessToken=([^&]+)/);
  const refreshTokenMatch = url.match(/refreshToken=([^&]+)/);

  return {
    accessToken: accessTokenMatch ? accessTokenMatch[1] : null,
    refreshToken: refreshTokenMatch ? refreshTokenMatch[1] : null,
  };
};

const extractErrorWithRegex = (url: string) => {
  const errorMatch = url.match(/error=([^&]+)/);
  return errorMatch ? errorMatch[1] : null;
};

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const signIn = useAuthStore((state) => state.signIn);

  useWarmUpBrowser();

  const handleGoogleLogin = async () => {
    const redirectUri = makeRedirectUri({
      scheme: 'bibbid',
    });

    const result = await WebBrowser.openAuthSessionAsync(
      `${process.env.EXPO_PUBLIC_API_URL}oauth2/authorization/google`,
      redirectUri
    );

    const { url } = result as LoginResult;

    if (result.type === 'success' && url) {
      const { accessToken, refreshToken } = extractParamsWithRegex(url);

      if (accessToken && refreshToken) {
        console.log('[INFO] sign in success', accessToken, refreshToken);

        signIn({ accessToken, refreshToken });
      } else {
        const error = extractErrorWithRegex(url);
        console.log('[ERROR]', error);
      }
    }
  };

  return (
    <View style={signUpstyles.container}>
      <LoginButton type="google" onPress={() => handleGoogleLogin()} />
    </View>
  );
}

function LoginButton({
  type,
  onPress,
}: {
  type: 'google' | 'apple';
  onPress: () => void;
}) {
  return (
    <Button onPress={onPress} style={signUpstyles.loginButton}>
      <ButtonText weight="600" style={signUpstyles.loginButtonText}>
        Google Login
      </ButtonText>
    </Button>
  );
}

const signUpstyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loginButton: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    width: '100%',
    color: 'white',
    textAlign: 'center',
  },
}));
