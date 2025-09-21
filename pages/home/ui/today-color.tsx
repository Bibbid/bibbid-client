import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { ContinuousConfetti } from 'react-native-fast-confetti';
import { StyleSheet } from 'react-native-unistyles';
import { mmkv } from '~/shared/model';
import { Button, ButtonText } from '~/shared/ui/button';
import { CustomText } from '~/shared/ui/text';

export default function TodayColor() {
  const router = useRouter();

  const todayColor = mmkv.getString('todayColorRgb');
  const todayColorName = mmkv.getString('todayColorDisplayName');
  const todayColorShadow = mmkv.getString('todayColorShadow');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.title}>Ta-da!</CustomText>
        <View
          style={[
            styles.color,
            {
              backgroundColor: todayColor,
              boxShadow: `inset 0 -6px 6px 0 rgba(255, 255, 255, 0.16), inset 4px 4px 6px 0 ${todayColorShadow}`,
            },
          ]}
        />
        <View style={styles.descriptionWrapper}>
          <CustomText style={styles.descriptionHeader}>
            Today&apos;s Color
          </CustomText>
          <CustomText style={styles.descriptionBody}>
            {todayColorName}
          </CustomText>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          size="xl"
          onPress={() => router.push('/(authorized)/home')}
          style={styles.button}>
          <ButtonText style={styles.buttonText}>Go Home</ButtonText>
        </Button>
      </View>
      <ContinuousConfetti />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  color: {
    borderRadius: 9999,
    width: 80,
    height: 80,
  },
  descriptionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 8,
  },
  descriptionHeader: {
    color: theme.color['gray-7'],
    fontSize: theme.fontSize['sm'],
  },
  descriptionBody: {
    color: 'white',
    fontSize: theme.fontSize['xl'],
    fontWeight: theme.fontWeight['medium'],
  },
  footer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    bottom: 32,
  },
  button: {
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeight['semibold'],
    fontSize: theme.fontSize['md'],
  },
}));
