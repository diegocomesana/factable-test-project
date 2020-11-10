const factablePlugin = require("factable");

module.exports = function (api) {
  api.cache(true);
  const presets = [];
  const plugins = [factablePlugin];

  return {
    presets,
    plugins,
  };
};
