const WebpackCdnUploadPlugin = require("webpack-cdn-upload-plugin");
const pkgVersion = require("./package.json").version;
const pkgName = require("./package.json").name;
const axios = require("axios");

module.exports = {
    css: {
        extract: false,
    },
    filenameHashing: false,
    configureWebpack: {
        optimization: {
            splitChunks: false,
        },
        plugins: [],
    },
};

if (process.env.npm_lifecycle_event == "build:demo") {
    module.exports.configureWebpack.plugins.push(
        new WebpackCdnUploadPlugin({
            async upload(content, name) {
                if (!name.endsWith("app.js")) {
                    // We ignore sourcemap file
                    return;
                }
                let repo = "release";
                if (pkgVersion.toLowerCase().endsWith("snapshot")) {
                    repo = "snapshot";
                }
                // let url = "http://localhost:8491/jsrepo/v1_0/webpackupload/sandbox/" + repo + "/" + pkgName + "/" + pkgVersion
                let url =
                    "https://services.aeris-data.fr/cdn/jsrepo/v1_0/webpackupload/sandbox/" +
                    repo +
                    "/" +
                    "unidoodemo" +
                    "/" +
                    pkgVersion;
                console.log(url);

                await axios({
                    method: "post",
                    url: url,
                    headers: {},
                    data: {
                        content: content,
                    },
                });

                url = url.replace("webpackupload", "download");
                return url;
            },
        })
    );
}