"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getSrcDir(pkg) {
    const parts = (pkg === null || pkg === void 0 ? void 0 : pkg.split(".")) || [];
    return path_1.default.join("./android/app/src/debug/java", ...parts);
}
function withoutReactNativeFlipperDatabasesPlugin(config) {
    return (0, config_plugins_1.withDangerousMod)(config, [
        "android",
        async (c) => {
            var _a;
            const debugSrcDir = getSrcDir((_a = config.android) === null || _a === void 0 ? void 0 : _a.package);
            const flipperFilePath = path_1.default.join(debugSrcDir, "ReactNativeFlipper.java");
            const flipperJavaFile = fs_1.default.readFileSync(flipperFilePath, { encoding: "utf-8" });
            const updatedFile = flipperJavaFile.split("\n").flatMap((line) => {
                if (line.match(/^\s*import com\.facebook\.flipper\.plugins\.databases\.DatabasesFlipperPlugin;\s*$/)) {
                    // remove the database plugin import
                    return [];
                }
                else if (line.match(/^\s*client\.addPlugin\(new DatabasesFlipperPlugin\(context\)\);\s*/)) {
                    // remove the database plugin setup
                    return [];
                }
                return [line];
            }).join("\n");
            fs_1.default.writeFileSync(flipperFilePath, updatedFile, { encoding: "utf-8" });
            return c;
        }
    ]);
}
;
exports.default = withoutReactNativeFlipperDatabasesPlugin;
