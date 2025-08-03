module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  plugins.push([
    'react-native-unistyles/plugin',
    {
      root: './app',
      autoProcessImports: [
        '~/shared',
        '~/entities',
        '~/features',
        '~/widgets',
        '~/pages',
      ],
    },
  ]);

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
