import {
  ListRenderItem,
  FlashList as ShopifyFlashList,
  type FlashListProps as ShopifyFlashListProps,
} from '@shopify/flash-list';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

interface FlashListProps<TItem> extends ShopifyFlashListProps<TItem> {
  data: TItem[];
  renderItem: ListRenderItem<TItem>;
}

export default function FlashList<TItem>({
  renderScrollComponent,
  ...flashListProps
}: FlashListProps<TItem>) {
  return (
    <ShopifyFlashList
      renderScrollComponent={(props) => <KeyboardAwareScrollView {...props} />}
      {...flashListProps}
    />
  );
}
