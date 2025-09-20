import { Href, useRouter } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import { useAuth } from '~/shared/auth';
import { CustomText } from '~/shared/ui/text';

export default function SettingShortcuts() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText style={styles.title}>My Account</CustomText>
      </View>
      <ShortcutItem
        type="link"
        title="Change Name"
        href="/settings/change-name"
      />
      <ShortcutItem type="action" title="Log out" onPress={() => signOut()} />
      <ShortcutItem type="text" title="Version" description="1.0.0" />
      <ShortcutItem
        type="action"
        title="Term and Conditions"
        onPress={() => {
          openBrowserAsync('https://www.google.com');
        }}
      />
      <ShortcutItem
        type="action"
        title="Privacy Policy"
        onPress={() => {
          openBrowserAsync('https://www.google.com');
        }}
      />
      <ShortcutItem
        type="action"
        title="Feedback"
        onPress={() => {
          openBrowserAsync('https://www.google.com');
        }}
      />
      <ShortcutItem type="action" title="Delete Account" onPress={() => {}} />
    </View>
  );
}

export interface ShortcutItemProps {
  href?: Href;
  type: 'link' | 'action' | 'text';
  title: string;
  description?: string;
  onPress?: () => void;
}

function ShortcutItem({
  type,
  title,
  description,
  href,
  onPress,
}: ShortcutItemProps) {
  const theme = useAnimatedTheme();

  const router = useRouter();

  const handlePress = () => {
    switch (type) {
      case 'link': {
        if (href) {
          router.push(href);
        }
        break;
      }
      case 'action': {
        onPress?.();
        break;
      }
      case 'text': {
        break;
      }
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.item}>
      <CustomText style={styles.text}>{title}</CustomText>
      {type === 'text' ? (
        <CustomText style={styles.description}>{description}</CustomText>
      ) : (
        <ChevronRight size={24} color={theme.value.color['gray-5']} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
    paddingHorizontal: 20,
  },
  header: {
    display: 'flex',
    paddingHorizontal: 4,
  },
  title: {
    color: 'white',
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    columnGap: 6,
  },
  text: {
    color: 'white',
    fontSize: theme.fontSize['md'],
    flex: 1,
  },
  description: {
    color: 'white',
    fontSize: theme.fontSize['md'],
  },
}));
