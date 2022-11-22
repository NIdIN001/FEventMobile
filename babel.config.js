module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['transform-inline-environment-variables'],
    env: {
      production: {
        plugins: [["transform-inline-environment-variables",{
          path: '.env.production'
        }]]
      },
      development: {
        plugins: [["transform-inline-environment-variables",{
          path: '.env.development'
        }]]
      }
    }
  };
};
