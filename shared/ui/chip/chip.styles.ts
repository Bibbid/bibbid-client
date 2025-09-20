import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

export type ChipVariantsProps = UnistylesVariants<typeof chipStyles>;

export const chipIconColorMap = {
  solid: {
    gray: 'white',
    white: 'gray-3',
    red: 'white',
    orange: 'white',
    yellow: 'white',
    green: 'white',
    blue: 'white',
    purple: 'white',
    pink: 'white',
  },
  tinted: {
    gray: 'gray-5',
    white: 'white',
    red: 'red-3',
    orange: 'orange-3',
    yellow: 'yellow-3',
    green: 'green-3',
    blue: 'blue-3',
    purple: 'purple-3',
    pink: 'pink-3',
  },
  outlined: {
    gray: 'gray-5',
    white: 'white',
    red: 'red-3',
    orange: 'orange-3',
    yellow: 'yellow-3',
    green: 'green-3',
    blue: 'blue-3',
    purple: 'purple-3',
    pink: 'pink-3',
  },
} as const;

export const chipStyles = StyleSheet.create((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5.5,
    rowGap: 2,
    height: 32,
    variants: {
      type: {
        solid: {},
        tinted: {},
        outlined: {
          backgroundColor: 'transparent',
          borderWidth: 1,
        },
      },
      color: {
        gray: {
          backgroundColor: theme.color['gray-2'],
          borderColor: theme.color['gray-5'],
        },
        white: {
          backgroundColor: 'white',
          borderColor: 'white',
        },
        red: {
          backgroundColor: theme.color['red-3'],
          borderColor: theme.color['red-3'],
        },
        orange: {
          backgroundColor: theme.color['orange-3'],
          borderColor: theme.color['orange-3'],
        },
        yellow: {
          backgroundColor: theme.color['yellow-3'],
          borderColor: theme.color['yellow-3'],
        },
        green: {
          backgroundColor: theme.color['green-3'],
          borderColor: theme.color['green-3'],
        },
        blue: {
          backgroundColor: theme.color['blue-3'],
          borderColor: theme.color['blue-3'],
        },
        purple: {
          backgroundColor: theme.color['purple-3'],
          borderColor: theme.color['purple-3'],
        },
        pink: {
          backgroundColor: theme.color['pink-3'],
          borderColor: theme.color['pink-3'],
        },
      },
    },
    compoundVariants: [
      {
        type: 'tinted',
        styles: {
          backgroundColor: theme.color['opacity-white-4'],
        },
      },
      {
        type: 'outlined',
        styles: {
          backgroundColor: 'transparent',
        },
      },
    ],
  },
  text: {
    fontSize: theme.fontSize['sm'],
    variants: {
      type: {
        solid: {
          color: 'white',
        },
        tinted: {
          color: 'white',
        },
        outlined: {
          color: 'white',
        },
      },
      color: {
        gray: {},
        white: {},
        red: {},
        orange: {},
        yellow: {},
        green: {},
        blue: {},
        purple: {},
        pink: {},
      },
    },
    compoundVariants: [
      {
        type: 'outlined',
        color: 'gray',
        styles: {
          color: theme.color['gray-5'],
        },
      },
      {
        type: 'solid',
        color: 'white',
        styles: {
          color: theme.color['gray-3'],
        },
      },
      {
        type: 'outlined',
        color: 'red',
        styles: {
          color: theme.color['red-3'],
        },
      },
      {
        type: 'outlined',
        color: 'orange',
        styles: {
          color: theme.color['orange-3'],
        },
      },
      {
        type: 'outlined',
        color: 'yellow',
        styles: {
          color: theme.color['yellow-3'],
        },
      },
      {
        type: 'outlined',
        color: 'green',
        styles: {
          color: theme.color['green-3'],
        },
      },
      {
        type: 'outlined',
        color: 'blue',
        styles: {
          color: theme.color['blue-3'],
        },
      },
      {
        type: 'outlined',
        color: 'purple',
        styles: {
          color: theme.color['purple-3'],
        },
      },
      {
        type: 'outlined',
        color: 'pink',
        styles: {
          color: theme.color['pink-3'],
        },
      },
    ],
  },
}));
