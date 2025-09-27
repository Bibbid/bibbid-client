import { showToast } from '../ui/toast';
import { Directory, File } from 'expo-file-system/next';
import * as MediaLibrary from 'expo-media-library';

interface DownloadToLibraryParams {
  url: string;
}

export default async function downloadToLibrary({
  url,
}: DownloadToLibraryParams) {
  try {
    const result = await File.downloadFileAsync(url, new Directory('bibbid'));

    const asset = await MediaLibrary.createAssetAsync(result.uri);

    return {
      ...result,
      assetId: asset.id,
      galleryUri: asset.uri,
    };
  } catch (error) {
    if (error instanceof Error) {
      showToast({
        text1: error.message,
        type: 'error',
      });
    } else {
      showToast({
        text1: 'An unknown error occurred',
        type: 'error',
      });
    }
  }
}
