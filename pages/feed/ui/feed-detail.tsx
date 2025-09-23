import getFeedDetailOptions from '../model/get-feed-detail-options';
import ColorFeeds from './color-feeds';
import { SuspenseQuery } from '@suspensive/react-query';
import { overlay } from 'overlay-kit';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { FeedInfo } from '~/features/feed';
import { ProfileModal } from '~/features/user';
import { CustomText } from '~/shared/ui/text';

export default function FeedDetail({ feedId }: { feedId: number }) {
  return (
    <SuspenseQuery {...getFeedDetailOptions(feedId)}>
      {({ data }) => (
        <ScrollView style={styles.container}>
          <FeedInfo
            image={data.image}
            color={data.color}
            profileImage={data.uploader.buddyImage}
            createdAt={data.createdAt}
            name={data.uploader.buddyName}
            description={data.uploader.introduction ?? ''}
            onOptionPress={() =>
              overlay.open(({ isOpen, close }) => (
                <ProfileModal
                  visible={isOpen}
                  onClose={close}
                  feedId={data.feedId}
                  profileImage={data.uploader.buddyImage}
                  name={data.uploader.buddyName}
                  createdAt={data.uploader.createdAt}
                />
              ))
            }
          />
          <View style={styles.otherFeedsContainer}>
            <CustomText style={styles.otherFeedsTitle}>
              More {data.color.displayName}
            </CustomText>
            <ColorFeeds color={data.color.displayName} />
          </View>
        </ScrollView>
      )}
    </SuspenseQuery>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  otherFeedsContainer: {
    flex: 1,
    paddingVertical: 16,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 12,
  },
  otherFeedsTitle: {
    paddingHorizontal: 20,
    color: 'white',
    fontSize: theme.fontSize['md'],
    fontWeight: theme.fontWeight['medium'],
  },
}));
