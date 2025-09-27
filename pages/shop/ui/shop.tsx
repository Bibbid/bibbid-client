import getItemListOptions from '../model/get-item-list-options';
import type { Item as ItemType } from '../model/schemas';
import usePurchaseItem from '../model/use-purchase-item';
import { SuspenseQuery } from '@suspensive/react-query';
import { useRouter } from 'expo-router';
import { overlay } from 'overlay-kit';
import { Suspense, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native-unistyles';
import { getMyTokensOptions } from '~/entities/shop';
import { Button, ButtonText } from '~/shared/ui/button';
import { Chip } from '~/shared/ui/chip';
import { FlashList } from '~/shared/ui/flash-list';
import { Image } from '~/shared/ui/image';
import { GeneralModal } from '~/shared/ui/modal';
import { CustomText } from '~/shared/ui/text';

export default function Shop() {
  const router = useRouter();

  const [isNeedMoreTokenModalVisible, setIsNeedMoreTokenModalVisible] =
    useState(false);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.header}>
        <CustomText style={styles.title}>Shop</CustomText>
        <CustomText style={styles.description}>
          Make your day colorful with items
        </CustomText>
      </View>
      <View style={styles.content}>
        <View style={styles.tokenContainer}>
          <View style={styles.tokenHeader}>
            <CustomText style={styles.tokenDescription}>Your Token</CustomText>
            <Suspense>
              <SuspenseQuery {...getMyTokensOptions()}>
                {({ data }) => (
                  <CustomText style={styles.tokenAmount}>
                    {data.tokenCount}p
                  </CustomText>
                )}
              </SuspenseQuery>
            </Suspense>
          </View>
          <Button
            size="xl"
            variant="solid-light"
            onPress={() => router.push('/(authorized)/shop/token')}>
            <ButtonText size="md">Buy Token</ButtonText>
          </Button>
        </View>
        <ItemList
          showNeedMoreTokenModal={() => {
            setIsNeedMoreTokenModalVisible(true);
          }}
        />
      </View>
      <NeedMoreTokenModal
        visible={isNeedMoreTokenModalVisible}
        close={() => {
          setIsNeedMoreTokenModalVisible(false);
        }}
        onAction={() => {
          router.push('/(authorized)/shop/token');
        }}
      />
    </KeyboardAwareScrollView>
  );
}

interface ItemListProps {
  showNeedMoreTokenModal: () => void;
}

function ItemList({ showNeedMoreTokenModal }: ItemListProps) {
  return (
    <View style={styles.itemListContainer}>
      <CustomText style={styles.itemTitle}>Items</CustomText>
      <Suspense>
        <SuspenseQuery {...getItemListOptions()}>
          {({ data }) => (
            <FlashList
              data={data}
              renderItem={({ item }) => (
                <Item
                  data={item}
                  showNeedMoreTokenModal={showNeedMoreTokenModal}
                />
              )}
              ItemSeparatorComponent={() => <View style={styles.gap} />}
            />
          )}
        </SuspenseQuery>
      </Suspense>
    </View>
  );
}

interface ItemProps {
  data: ItemType;
  showNeedMoreTokenModal: () => void;
}

function Item({ data, showNeedMoreTokenModal }: ItemProps) {
  const { mutateAsync: purchaseItem, isPending } = usePurchaseItem({
    onSuccess: () => {},
    onError: (error) => {
      showNeedMoreTokenModal();
    },
  });

  return (
    <Button
      style={styles.itemContainer}
      onPress={() =>
        overlay.open(({ isOpen, close }) => (
          <ItemInfoModal
            data={data}
            visible={isOpen}
            close={close}
            disableActionButton={isPending}
            onAction={() => {
              purchaseItem(data.itemId);
            }}
          />
        ))
      }>
      <Image
        source={{ uri: data.itemImage?.presignedUrl ?? '' }}
        style={styles.itemImage}
      />
      <View style={styles.itemInfo}>
        <CustomText style={styles.itemName}>{data.name}</CustomText>
        <View style={styles.itemAdditionalInfoContainer}>
          {data.myCount > 0 && (
            <Chip
              label={`${data.myCount > 99 ? '99+' : data.myCount} Owned`}
              type="tinted"
              color="white"
            />
          )}
          <Chip label={`${data.price}p`} type="tinted" color="gray" />
        </View>
      </View>
    </Button>
  );
}

interface ItemInfoModalProps {
  data: ItemType;
  visible: boolean;
  close: () => void;
  onAction: () => void;
  disableActionButton: boolean;
}

function ItemInfoModal({
  data,
  visible,
  close,
  onAction,
  disableActionButton,
}: ItemInfoModalProps) {
  return (
    <GeneralModal
      visible={visible}
      image={data.itemImage?.presignedUrl ?? ''}
      title="Get Item"
      subTitle={data.name}
      description={data.description}
      actionText={`Use ${data.price}p`}
      showCancelButton={false}
      disableActionButton={disableActionButton}
      onClose={close}
      onAction={() => {
        onAction();
        close();
      }}
    />
  );
}

interface NeedMoreTokenModalProps {
  visible: boolean;
  close: () => void;
  onAction: () => void;
}

function NeedMoreTokenModal({
  visible,
  close,
  onAction,
}: NeedMoreTokenModalProps) {
  return (
    <GeneralModal
      visible={visible}
      title="Oops!"
      description="You need more points!"
      actionText="Get Token"
      showCancelButton={false}
      onClose={close}
      onAction={onAction}
    />
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 4,
  },
  title: {
    color: 'white',
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  description: {
    color: theme.color['gray-9'],
    fontSize: theme.fontSize['md'],
  },
  content: {
    flex: 1,
    paddingVertical: 20,
    rowGap: 16,
  },
  tokenContainer: {
    padding: 12,
    rowGap: 8,
    backgroundColor: theme.color['gray-2'],
  },
  tokenHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tokenDescription: {
    color: 'white',
    fontSize: theme.fontSize['sm'],
  },
  tokenAmount: {
    color: 'white',
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  itemListContainer: {
    rowGap: 16,
  },
  itemTitle: {
    color: 'white',
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight['semibold'],
  },
  itemList: {
    rowGap: 12,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 12,
    columnGap: 8,
    backgroundColor: theme.color['gray-2'],
    height: 'auto',
  },
  itemImage: {
    width: 60,
    height: 60,
  },
  itemInfo: {
    rowGap: 4,
  },
  itemName: {
    color: 'white',
    fontSize: theme.fontSize['md'],
  },
  itemAdditionalInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: 8,
  },
  gap: {
    width: '100%',
    height: 12,
  },
}));
