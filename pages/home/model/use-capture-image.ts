import type { Image } from 'react-native-image-crop-picker';
import { create } from 'zustand';

interface CaptureImageState {
  image: Image | null;
  setImage: (image: Image) => void;
  resetImage: () => void;
}

export const useCaptureImage = create<CaptureImageState>((set) => ({
  image: null,
  setImage: (image) => set({ image }),
  resetImage: () => set({ image: null }),
}));
