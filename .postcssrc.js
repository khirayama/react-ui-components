module.exports = {
  "input": "./index.css",
  "output": "./bundle.css",
  "use": [
    "postcss-easy-import",
    "postcss-simple-vars",
    "postcss-nested",
    "autoprefixer",
    "cssnano"
  ],
  "postcss-easy-import": {
    "glob": true,
    "onImport": (sources) => {
      global.watchCSS(sources, this.from);
    }
  },
  "autoprefixer": {
    "browsers": ["last 2 versions"]
  }
};
