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
    'get-collected-color': ['color', 'get-collected-color'],
  },
  profile: {
    'get-my-profile': ['profile', 'get-my-profile'],
    'get-buddy-image': (buddyCharacter: string, buddyColor: string) => [
      'profile',
      'get-buddy-image',
      buddyCharacter,
      buddyColor,
    ],
    'get-my-feed-counts': ['profile', 'get-my-feed-counts'],
    'get-infinite-my-color-feeds': (color: string) => [
      'profile',
      'get-infinite-my-color-feeds',
      color,
    ],
  },
  home: {
    'get-today-my-feed': ['home', 'get-today-my-feed'],
    'get-random-feeds': ['home', 'get-random-feeds'],
    'get-today-color-feeds': ['home', 'get-today-color-feeds'],
  },
  feed: {
    'get-feed-detail': (feedId: number) => ['feed', 'get-feed-detail', feedId],
    'get-infinite-color-feeds': (color: string) => [
      'feed',
      'get-infinite-color-feeds',
      color,
    ],
  },
};
