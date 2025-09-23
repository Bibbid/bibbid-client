import { REPORT_REASONS } from '../model/report-reson';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import type { FeedDetail } from '~/entities/feed';
import { useReportFeed, useReportUser } from '~/features/report';
import { Button, ButtonText } from '~/shared/ui/button';
import { Image } from '~/shared/ui/image';
import { Input } from '~/shared/ui/input';
import { RadioButton, RadioButtonGroup } from '~/shared/ui/radio';
import { TabButton, TabButtonGroup } from '~/shared/ui/tabs/tabs';
import { CustomText } from '~/shared/ui/text';
import { showToast } from '~/shared/ui/toast';

type ReportType = 'feed' | 'user';

interface FeedReportProps {
  data: FeedDetail;
}

export default function FeedReport({ data }: FeedReportProps) {
  const [reportType, setReportType] = useState<ReportType>('feed');
  const [reportReason, setReportReason] = useState<string>('');
  const [reportOtherReason, setReportOtherReason] = useState<string>('');

  const router = useRouter();

  const { mutateAsync: reportFeed, isPending: isReportFeedPending } =
    useReportFeed({
      onSuccess: () => {
        showToast({
          text1: 'Feed reported successfully',
          type: 'success',
        });
        router.replace(`/(authorized)/feed?color=${data.color.displayName}`);
      },
      onError: (error) => {
        showToast({
          text1: error.message,
          type: 'error',
        });
      },
    });
  const { mutateAsync: reportUser, isPending: isReportUserPending } =
    useReportUser({
      onSuccess: () => {
        showToast({
          text1: 'User reported successfully',
          type: 'success',
        });
      },
      onError: (error) => {
        showToast({
          text1: error.message,
          type: 'error',
        });
      },
    });

  const onSubmit = () => {
    if (reportType === 'feed') {
      reportFeed({
        reportedFeedId: data.feedId,
        reason: reportReason === 'other' ? reportOtherReason : reportReason,
      });
    } else {
      reportUser({
        reportedUserUuid: data.uploader.userUuid,
        reason: reportReason === 'other' ? reportOtherReason : reportReason,
      });
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <TabButtonGroup
        selected={reportType}
        onSelect={(value) => setReportType(value as ReportType)}>
        <TabButton value="feed" label="Feed" />
        <TabButton value="user" label="User" />
      </TabButtonGroup>
      <View style={styles.reportContent}>
        <Image
          style={styles.reportContentImage}
          source={
            reportType === 'feed'
              ? data.image.presignedUrl
              : data.uploader.buddyImage.presignedUrl
          }
          contentFit="cover"
        />
        <View style={styles.reportTextContainer}>
          <CustomText style={styles.reportContentTitle}>
            {`${data.uploader.buddyName}${reportType === 'feed' ? "'s Post" : ''}`}
          </CustomText>
          <CustomText style={styles.reportContentDescription}>
            {`${reportType === 'feed' ? 'Uploaded ' : 'Since '} ${format(data.createdAt, 'yyyy-MM-dd')}`}
          </CustomText>
        </View>
      </View>
      <RadioButtonGroup
        selected={reportReason}
        onSelect={setReportReason}
        style={styles.reportReasons}>
        {REPORT_REASONS.map((reason) => (
          <View key={reason.key} style={styles.reportReason}>
            <RadioButton value={reason.key} label={reason.name} />
            {reason.key === 'other' && reportReason === 'other' && (
              <Input
                placeholder="Please describe the reason"
                value={reportOtherReason}
                onChangeText={setReportOtherReason}
              />
            )}
          </View>
        ))}
      </RadioButtonGroup>
      <View style={styles.reportFooter}>
        <Button
          size="xl"
          style={styles.reportFooterButton}
          disabled={
            (reportReason === 'other' && reportOtherReason.length === 0) ||
            isReportFeedPending ||
            isReportUserPending
          }
          onPress={onSubmit}>
          <ButtonText size="md">Report</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
    paddingHorizontal: 20,
    rowGap: 16,
  },
  reportContent: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 74,
    backgroundColor: theme.color['gray-2'],
  },
  reportContentImage: {
    width: 50,
    height: 50,
  },
  reportTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 4,
  },
  reportContentTitle: {
    color: theme.color['gray-11'],
    fontSize: theme.fontSize['sm'],
    fontWeight: theme.fontWeight['semibold'],
  },
  reportContentDescription: {
    color: theme.color['opacity-white-50'],
    fontSize: theme.fontSize['sm'],
  },
  reportReasons: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
    paddingVertical: 8,
  },
  reportReason: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 8,
  },
  reportFooter: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
    backgroundColor: theme.color['gray-2'],
  },
  reportFooterButton: {
    width: '100%',
  },
}));
