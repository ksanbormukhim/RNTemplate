module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@app/*': './src/app',
          '@assets/*': './src/assets',
          '@components/*': './src/components',
          '@context/*': './src/context',
          '@translations': './src/translations',
          '@utils/*': './src/utils',
        },
      },
    ],
  ],
};
