// import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";
// import typescript from "@rollup/plugin-typescript";
// import dts from "rollup-plugin-dts";

// //NEW
// import terser from "@rollup/plugin-terser";
// import peerDepsExternal from "rollup-plugin-peer-deps-external";

// const packageJson = require("./package.json");

// export default [
//   {
//     input: "src/components/Button/index.ts",
//     output: [
//       {
//         file: packageJson.main,
//         format: "esm",
//         sourcemap: true,
//       },
//     ],
//     plugins: [
//       // NEW
//       typescript(),
//       peerDepsExternal(),

//       resolve(),
//       commonjs(),

//       // NEW
//       terser(),
//     ],
//   },
//   {
//     input: "dist/cjs/types/src/index.d.ts",
//     output: [{ file: "dist/index.d.ts", format: "esm" }],
//     plugins: [dts.default()],
//     external: [/\.css$/],
//   },
// ];

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const components = [
  { name: "Button", entry: "src/index.ts" },
  { name: "Input", entry: "src/index.ts" },
];

function createComponentConfig(component) {
  return {
    input: component.entry,
    output: [
      {
        file: `dist/${component.name.toLowerCase()}.cjs`,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript(),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      terser(),
      postcss({
        extract: true,
        modules: true,
      }),
    ],
  };
}

const rollupConfigs = components.map(createComponentConfig);

rollupConfigs.push({
  input: "dist/types/src/index.d.ts",
  output: [{ file: "dist/index.d.ts", format: "cjs" }],
  plugins: [dts.default()],
  external: [/\.css$/],
});

export default rollupConfigs;
