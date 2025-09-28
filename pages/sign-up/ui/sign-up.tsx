import { getLogger } from '@logtape/logtape';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Logo from '~/assets/icons/logo-big.svg';
import { useAuthStore } from '~/shared/auth';
import { Button, ButtonText } from '~/shared/ui/button';
import { CustomText } from '~/shared/ui/text';

const logger = getLogger('bibbid');

interface LoginResult {
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
        logger.info({ accessToken, refreshToken });

        signIn({ accessToken, refreshToken });
      } else {
        const error = extractErrorWithRegex(url);
        logger.error({ error });
      }
    }
  };

  return (
    <View style={signUpStyles.container}>
      <View style={signUpStyles.content}>
        <Logo height={28} width={53} />
        <View>
          <CustomText style={signUpStyles.text}>One color a day</CustomText>
          <CustomText style={signUpStyles.text}>
            BBD is how you meet yourself
          </CustomText>
        </View>
      </View>
      <View style={signUpStyles.footer}>
        <CustomText style={signUpStyles.loginDescription}>
          Let&apos;s get started
        </CustomText>
        <LoginButton type="google" onPress={() => handleGoogleLogin()} />
      </View>
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
    <Button size="xl" onPress={onPress} style={signUpStyles.loginButton}>
      <ButtonText size="lg" style={signUpStyles.loginButtonText}>
        Google Login
      </ButtonText>
    </Button>
  );
}

const signUpStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    rowGap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 28,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -60 }],
  },
  text: {
    fontSize: theme.fontSize['lg'],
    textAlign: 'center',
    color: 'white',
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginDescription: {
    fontSize: theme.fontSize['sm'],
    color: theme.color['gray-5'],
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
    fontWeight: theme.fontWeight['semibold'],
    color: 'white',
    textAlign: 'center',
    fontSize: theme.fontSize['md'],
  },
}));
