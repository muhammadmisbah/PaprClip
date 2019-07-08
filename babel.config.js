module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    retainLines: true,
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@auth': './src/auth',
            '@common': './src/common',
            '@config': './src/config',
            '@dashboard': './src/dashboard',
            '@profile': './src/profile',
            '@navigation': './src/navigation',
            '@snack': './src/snack',
            '@utils': './src/utils',
          },
        },
      ],
      'transform-inline-environment-variables',
    ],
  };
};
