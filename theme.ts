const color = {
  // gray
  'gray-1': '#171719',
  'gray-2': '#222729',
  'gray-3': '#353C3F',
  'gray-4': '#4A5256',
  'gray-5': '#6E777C',
  'gray-6': '#8D979C',
  'gray-7': '#AEB7BC',
  'gray-8': '#CFD6D9',
  'gray-9': '#E7EDF0',
  'gray-10': '#F1F4F6',
  'gray-11': '#F7F9FA',

  // red
  'red-1': '#DE1B28',
  'red-2': '#EE323E',
  'red-3': '#FF4955',
  'red-4': '#FF6670',
  'red-5': '#FF828A',
  'red-6': '#FFA1A7',
  'red-7': '#FFC2C5',
  'red-8': '#FFE0E2',
  'red-9': '#FFF4F5',

  // orange
  'orange-1': '#ED4C0C',
  'orange-2': '#FA662B',
  'orange-3': '#FF7943',
  'orange-4': '#FF8A5C',
  'orange-5': '#FFA582',
  'orange-6': '#FFBFA6',
  'orange-7': '#FFD3C2',
  'orange-8': '#FFE8E0',
  'orange-9': '#FFF7F4',

  // yellow
  'yellow-1': '#FFC300',
  'yellow-2': '#FFD105',
  'yellow-3': '#FFDB3B',
  'yellow-4': '#FFE365',
  'yellow-5': '#FFE882',
  'yellow-6': '#FFEFA6',
  'yellow-7': '#FFF4C2',
  'yellow-8': '#FFF7D5',
  'yellow-9': '#FF334B',

  // green
  'green-1': '#04AF60',
  'green-2': '#0EC36F',
  'green-3': '#1ED47F',
  'green-4': '#3BE093',
  'green-5': '#5FECAA',
  'green-6': '#81F4BE',
  'green-7': '#A3F8D1',
  'green-8': '#CBFCE6',
  'green-9': '#E3FFF3',

  // blue
  'blue-1': '#1758D9',
  'blue-2': '#3470E9',
  'blue-3': '#4C82EF',
  'blue-4': '#6797F5',
  'blue-5': '#8BB2FF',
  'blue-6': '#A5C3FF',
  'blue-7': '#BED4FF',
  'blue-8': '#D8E5FF',
  'blue-9': '#EFF4FF',

  // purple
  'purple-1': '#652BF8',
  'purple-2': '#7843FF',
  'purple-3': '#8E61FF',
  'purple-4': '#A481FF',
  'purple-5': '#BDA4FF',
  'purple-6': '#CBB8FF',
  'purple-7': '#DDD0FF',
  'purple-8': '#ECE5FF',
  'purple-9': '#F7F5FF',

  // pink
  'pink-1': '#F01ACD',
  'pink-2': '#F941DA',
  'pink-3': '#FA60E1',
  'pink-4': '#FF84EA',
  'pink-5': '#FFA4F0',
  'pink-6': '#FFBCF4',
  'pink-7': '#FFD3F8',
  'pink-8': '#FFE5FB',
  'pink-9': '#FFF6FE',

  // opacity black
  'opacity-black-80': 'rgba(0, 0, 0, 0.8)',
  'opacity-black-50': 'rgba(0, 0, 0, 0.6)',
  'opacity-black-16': 'rgba(0, 0, 0, 0.16)',
  'opacity-black-8': 'rgba(0, 0, 0, 0.08)',
  'opacity-black-4': 'rgba(0, 0, 0, 0.04)',
  'opacity-black-2': 'rgba(0, 0, 0, 0.02)',

  // opacity white
  'opacity-white-80': 'rgba(255, 255, 255, 0.8)',
  'opacity-white-50': 'rgba(255, 255, 255, 0.6)',
  'opacity-white-16': 'rgba(255, 255, 255, 0.16)',
  'opacity-white-8': 'rgba(255, 255, 255, 0.08)',
  'opacity-white-4': 'rgba(255, 255, 255, 0.04)',
  'opacity-white-2': 'rgba(255, 255, 255, 0.02)',
};

const radius = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 16,
};

const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 26,
  '4xl': 32,
};

const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const lightTheme = {
  color,
  radius,
  fontSize,
  fontWeight,
} as const;

export const darkTheme = {
  color,
  radius,
  fontSize,
  fontWeight,
} as const;
