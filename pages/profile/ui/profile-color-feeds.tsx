import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { CustomText } from '~/shared/ui/text';

interface ProfileColorFeedsProps {
  color: string;
}

const MOCK_DATA = {
  amount: 100,
};

export default function ProfileColorFeeds({ color }: ProfileColorFeedsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText style={styles.title}>{color}</CustomText>
        <CustomText style={[styles.amount]}>{MOCK_DATA.amount}</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 20,
    columnGap: 8,
    height: 56,
  },
  title: {
    color: 'white',
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  amount: {
    fontSize: theme.fontSize['xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
}));
