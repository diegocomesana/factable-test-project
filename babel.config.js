const factablePlugin = require("factable").plugin;

module.exports = function (api) {
  api.cache(true);
  const presets = [];
  const plugins = [factablePlugin];

  return {
    presets,
    plugins,
  };
};
