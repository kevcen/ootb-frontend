const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          "@codler/react-native-keyboard-aware-scroll-view",
          "@ptomasroos/react-native-multi-slider",
        ],
      },
    },
    argv
  );
  return config;
};
