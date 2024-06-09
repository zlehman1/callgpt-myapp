module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      '@babel/preset-env', // Transpile modern JavaScript to be compatible with older environments
    ]
  };
};