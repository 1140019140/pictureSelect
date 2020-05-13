
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addWebpackPlugin,
  setWebpackPublicPath,
  addDecoratorsLegacy
} = require("customize-cra");
const webpack = require("webpack");
const multipleEntry = require("react-app-rewire-multiple-entry")([
  // {
  //   entry: "src/entry/landing.js",
  //   template: "public/landing.html",
  //   outPath: "/landing.html"
  // }
]);
const path = require("path");

module.exports = override(

  fixBabelImports("import", {
    libraryName: "antd-mobile",
    libraryDirectory: "es",
    style: true // change importing css to less
  }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@brand-primary": "#FDAF30"
      // "@input-font-size": "13px",
      // "@h-spacing-lg": "16px"
    }
  }),
  addDecoratorsLegacy({
    "legacy": true
  }),
  addWebpackAlias({
    "api": path.resolve(__dirname, "src/api"),
    "views": path.resolve(__dirname, "src/views"),
    "components": path.resolve(__dirname, "src/components"),
    "store": path.resolve(__dirname, "src/store"),
    "utils": path.resolve(__dirname, "src/utils"),
    "route": path.resolve(__dirname, "src/route")
  }),
  setWebpackPublicPath(process.env.REACT_APP_BASENAME),
  addWebpackPlugin(new webpack.DefinePlugin({ BASE_URL: "/api" })),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src")
  }),
  multipleEntry.addMultiEntry,
  (config, env) => {
    require("react-app-rewire-postcss")(config, {
      plugins: loader => [
        require("postcss-flexbugs-fixes"),
        require("postcss-preset-env")({
          autoprefixer: {
            flexbox: "no-2009"
          },
          stage: 3
        }),
        require("postcss-aspect-ratio-mini")({}),
        require("postcss-px-to-viewport")({
          viewportWidth: 750, // (Number) The width of the viewport.
          viewportHeight: 1334, // (Number) The height of the viewport.
          unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
          viewportUnit: "vw", // (String) Expected units.
          selectorBlackList: [".ignore", ".hairlines"], // (Array) The selectors to ignore and leave as px.
          minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
          mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
          exclude: [
            /node_modules/
          ]
        }),
        // require("./src/utils/loader"),
        require("postcss-write-svg")({
          utf8: false
        }),
        require("postcss-viewport-units")({
          filterRule: rule => rule.nodes.findIndex(i => i.prop === 'content') === -1
        }),
        require("cssnano")({
          // preset: "advanced",
          preset: ['default', {
            autoprefixer: false,
            reduceIdents: false,
            "postcss-zindex": false
          }]
          // preset: "default",
          // autoprefixer: false, 
          // "postcss-zindex": false 
        })
      ]
    });
    return config;
  }
);

