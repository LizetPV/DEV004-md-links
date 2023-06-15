export default {
    transform: {
        '^.+\\.(m?js|ts)$': 'babel-jest', // transpile mjs, mts, js, ts files
    },
 };
 transformIgnorePatterns: [
    "/node_modules/(?!nombre-del-modulo-que-quieres-transformar)/"
  ]