// /** @type {import('@remix-run/dev').AppConfig} */
// module.exports = {
//     // **/*.component.*
//     ignoredRouteFiles: ["**/.*"],
//     // appDirectory: "app",
//     // assetsBuildDirectory: "public/build",
//     // serverBuildPath: "build/index.js",
//     // publicPath: "/build/",
//     tailwind: true,
//     future: {
//         v2_errorBoundary: true,
//         v2_meta: true,
//     },
// };

/** @type {import('@remix-run/dev').AppConfig} */
export default {
    ignoredRouteFiles: ["**/.*"],
    // appDirectory: "app",
    // assetsBuildDirectory: "public/build",
    // serverBuildPath: "build/index.js",
    // publicPath: "/build/",
    serverModuleFormat: "esm",
    tailwind: true,
    future: {
        v2_errorBoundary: true,
        v2_meta: true,
        v2_dev: true,
    },
    serverMinify: true,
    postcss: true,
};
