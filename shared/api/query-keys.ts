export const queryKeys = {
  token: {
    'get-my-tokens': ['token', 'get-my-tokens'],
  },
  color: {
    'get-colors': ['color', 'get-colors'],
    'get-my-today-color': (today: string) => [
      'color',
      'get-my-today-color',
      today,
    ],
  },
  profile: {
    'get-my-profile': ['profile', 'get-my-profile'],
  },
  feed: {
    'get-today-my-feed': ['feed', 'get-today-my-feed'],
    'get-random-feeds': ['feed', 'get-random-feeds'],
    'get-today-color-feeds': ['feed', 'get-today-color-feeds'],
    'get-feed-detail': (feedId: number) => ['feed', 'get-feed-detail', feedId],
    'get-infinite-color-feeds': (color: string) => [
      'feed',
      'get-infinite-color-feeds',
      color,
    ],
    'get-infinite-my-color-feeds': (color: string) => [
      'feed',
      'get-infinite-my-color-feeds',
      color,
    ],
  },
};
