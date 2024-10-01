// Configuração do Babel para o projeto
module.exports = function (api) {
  api.cache(true);  // Cache para melhorar a performance

  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"]
  };
};
