import { CustomText } from '../text';
import { folderStyles } from './folder.styles';
import { View } from 'react-native';
import Edge from '~/assets/icons/edge.svg';
import { Image } from '~/shared/ui/image';

interface FolderProps {
  title: string;
  images: string[];
  amount: number;
  comment: string;
}

const ROTATE_ANGLE = [1, 0, 3];

export default function Folder({
  title,
  images,
  amount,
  comment,
}: FolderProps) {
  return (
    <View>
      <View style={folderStyles.header}>
        <View style={folderStyles.titleWrapper}>
          <CustomText style={folderStyles.title}>{title}</CustomText>
        </View>
        <Edge />
      </View>
      <View style={folderStyles.content}>
        <View style={folderStyles.contentOverlay} />
        {images.map((image, idx) => (
          <View
            key={`${image}-${idx}`}
            style={[
              folderStyles.contentImageWrapper,
              {
                transform: [
                  { rotate: `${ROTATE_ANGLE[idx % ROTATE_ANGLE.length]}deg` },
                ],
                zIndex: images.length - idx,
              },
            ]}>
            <Image source={{ uri: image }} style={folderStyles.contentImage} />
            <View style={folderStyles.contentImageFooter}>
              <CustomText style={folderStyles.contentImageFooterText}>
                {idx === 0 ? comment : ''}
              </CustomText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
