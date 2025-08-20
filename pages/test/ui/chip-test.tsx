import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Chip } from '~/shared/ui/chip';

export default function ChipTest() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Chip
          label="Chip"
          type="solid"
          color="gray"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
        <Chip
          label="Chip"
          type="tinted"
          color="gray"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
        <Chip
          label="Chip"
          type="outlined"
          color="gray"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
      </View>
      <View style={styles.row}>
        <Chip
          label="Chip"
          type="solid"
          color="white"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
        <Chip
          label="Chip"
          type="tinted"
          color="white"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
        <Chip
          label="Chip"
          type="outlined"
          color="white"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
      </View>
      <View style={styles.row}>
        <Chip
          label="Chip"
          type="solid"
          color="red"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
        <Chip
          label="Chip"
          type="tinted"
          color="red"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
        <Chip
          label="Chip"
          type="outlined"
          color="red"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
      </View>
      <View style={styles.row}>
        <Chip
          label="Chip"
          type="solid"
          color="green"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
        <Chip
          label="Chip"
          type="tinted"
          color="green"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
        <Chip
          label="Chip"
          type="outlined"
          color="green"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
      </View>
      <View style={styles.row}>
        <Chip
          label="Chip"
          type="solid"
          color="blue"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
        <Chip
          label="Chip"
          type="tinted"
          color="blue"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
        <Chip
          label="Chip"
          type="outlined"
          color="blue"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
      </View>
      <View style={styles.row}>
        <Chip
          label="Chip"
          type="solid"
          color="purple"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
        <Chip
          label="Chip"
          type="tinted"
          color="purple"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
        <Chip
          label="Chip"
          type="outlined"
          color="purple"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
      </View>
      <View style={styles.row}>
        <Chip
          label="Chip"
          type="solid"
          color="pink"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
        <Chip
          label="Chip"
          type="tinted"
          color="pink"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
        <Chip
          label="Chip"
          type="outlined"
          color="pink"
          leftIcon={ChevronLeft}
          rightIcon={ChevronRight}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
    display: 'flex',
    rowGap: 16,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
