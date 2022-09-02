module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ['react-native-reanimated/plugin'],
      [
        "module-resolver",
        {
          alias: {
            components: "./src/components",
            context: "./src/context",
            hooks: "./src/hooks", 
            navigators: "./src/navigators",
            screens: "./src/screens",
            utils: "./src/utils",
          },
        },
      ],
    ],
  }
}