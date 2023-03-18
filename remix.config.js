/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    // **/*.component.*
    ignoredRouteFiles: ["**/.*"],
    // appDirectory: "app",
    // assetsBuildDirectory: "public/build",
    // serverBuildPath: "build/index.js",
    // publicPath: "/build/",
    future: {
        unstable_tailwind: true,
    },
};
