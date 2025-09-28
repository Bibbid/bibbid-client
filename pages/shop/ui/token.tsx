import getOfferingsOptions from '../model/get-offerings-options';
import TokenStatusButton from './token-status-button';
import { ErrorBoundary } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { Suspense } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import AlertTriangle from '~/assets/icons/alert-triangle.svg';
import { Image } from '~/shared/ui/image';
import { Loading } from '~/shared/ui/loading';
import { NavBackButton, TopNavigation } from '~/shared/ui/navigation';
import { CustomText } from '~/shared/ui/text';

export default function Token() {
  const { top } = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView style={[styles.container, { paddingTop: top }]}>
      <TopNavigation
        left={<NavBackButton />}
        right={<TokenStatusButton />}
        style={styles.topNavigation}
      />
      <View style={styles.header}>
        <View style={styles.overlay}>
          <Image
            style={styles.overlayBackground}
            source={require('~/assets/images/overlay-background.png')}
          />
          <View style={styles.overlayContent}>
            <CustomText style={styles.overlayContentText}>
              {`Get Token for\nCustomize`}
            </CustomText>
            <CustomText style={styles.overlayContentDescription}>
              BBD is how you meet yourself
            </CustomText>
          </View>
        </View>
      </View>
      {/* TODO: Temporary disabled for submit */}
      {/* <Offerings /> */}
    </KeyboardAwareScrollView>
  );
}

function Offerings() {
  return (
    <ErrorBoundary fallback={<OfferingError />}>
      <Suspense fallback={<Loading />}>
        <SuspenseQuery {...getOfferingsOptions()}>
          {({ data }) => (
            <View>
              <CustomText>{JSON.stringify(data.all)}</CustomText>
            </View>
          )}
        </SuspenseQuery>
      </Suspense>
    </ErrorBoundary>
  );
}

// function OfferingItem({ offering }: { offering: PurchasesOffering }) {
//   return <View>{offering.identifier}</View>;
// }

function OfferingError() {
  const theme = useAnimatedTheme();

  return (
    <View style={styles.error}>
      <AlertTriangle color={theme.value.color['gray-11']} />
      <CustomText style={styles.errorTitle}>
        Failed to load offerings
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    position: 'relative',
  },
  topNavigation: {
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  header: {
    position: 'relative',
    width: '100%',
    height: 360,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayBackground: {
    width: '100%',
    height: '100%',
  },
  overlayContent: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    textAlign: 'left',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    zIndex: 1,
  },
  overlayContentText: {
    color: 'white',
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  overlayContentDescription: {
    color: theme.color['gray-9'],
    fontSize: theme.fontSize['md'],
  },
  error: {
    flex: 1,
    marginTop: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 8,
  },
  errorTitle: {
    color: theme.color['gray-7'],
    fontSize: theme.fontSize['lg'],
    fontWeight: theme.fontWeight['semibold'],
  },
}));
