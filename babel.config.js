module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      // o si no usas expo:
      // 'module:metro-react-native-babel-preset'
    ],
    ignore: ['**/*.js.flow'],
    plugins: [
      '@babel/plugin-transform-react-jsx',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './app',
          },
        },
      ],
    ],
  };
};