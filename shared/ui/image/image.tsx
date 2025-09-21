import { Image as ExpoImage, ImageProps as ExpoImageProps } from 'expo-image';

interface ImageProps extends Omit<ExpoImageProps, 'placeholder'> {}

const BLUR_HASH =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

export default function Image({ ...props }: ImageProps) {
  return <ExpoImage placeholder={{ blurhash: BLUR_HASH }} {...props} />;
}
