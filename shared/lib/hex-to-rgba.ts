interface HexToRgbaProps {
  hex: string;
  alpha: number;
}

export default function hexToRgba({ hex, alpha = 1 }: HexToRgbaProps): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
