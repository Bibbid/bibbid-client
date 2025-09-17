import getColorsOptions from '../model/get-colors-options';
import { FlashList } from '@shopify/flash-list';
import { SuspenseQuery } from '@suspensive/react-query';
import { Dot } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { create } from 'zustand';
import { Chip } from '~/shared/ui/chip';

const ALL_COLOR = {
  displayName: 'ALL',
  rgb: '#ffffff',
};

const useSelectedColor = create<{
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}>((set) => ({
  selectedColor: 'ALL',
  setSelectedColor: (color) => set({ selectedColor: color }),
}));

export default function ColorPalette() {
  return (
    <View style={styles.container}>
      <SuspenseQuery {...getColorsOptions()}>
        {({ data }) => (
          <FlashList
            data={[ALL_COLOR, ...data]}
            keyExtractor={({ displayName }) => displayName}
            renderItem={({ item: { displayName, rgb } }) => (
              <ChipButton displayName={displayName} rgb={rgb} />
            )}
            horizontal
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </SuspenseQuery>
    </View>
  );
}

interface ChipButtonProps {
  displayName: string;
  rgb: string;
}

function ChipButton({ displayName, rgb }: ChipButtonProps) {
  const { selectedColor, setSelectedColor } = useSelectedColor();

  return (
    <Pressable
      onPress={() => {
        setSelectedColor(displayName);
      }}
      style={{ opacity: selectedColor !== displayName ? 0.5 : 1 }}>
      <Chip label={displayName} leftIcon={Dot} customColor={rgb} />
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  separator: {
    width: 10,
  },
}));
