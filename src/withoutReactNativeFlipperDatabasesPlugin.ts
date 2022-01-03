import { ExpoConfig } from '@expo/config-types';
import { withDangerousMod } from '@expo/config-plugins';
import fs from 'fs';
import path from 'path';

function getSrcDir(pkg: string | undefined): string {
  const parts = pkg?.split(".") || [];

  return path.join("./android/app/src/debug/java", ...parts);
}

function withoutReactNativeFlipperDatabasesPlugin(config: ExpoConfig) {
  return withDangerousMod(config, [
    "android",
    async (c) => {
      const debugSrcDir = getSrcDir(config.android?.package);
      const flipperFilePath = path.join(debugSrcDir, "ReactNativeFlipper.java");
      const flipperJavaFile = fs.readFileSync(flipperFilePath, { encoding: "utf-8" });

      const updatedFile = flipperJavaFile.split("\n").flatMap((line) => {
        if(line.match(/^\s*import com\.facebook\.flipper\.plugins\.databases\.DatabasesFlipperPlugin;\s*$/)) {
          // remove the database plugin import
          return [];
        } else if(line.match(/^\s*client\.addPlugin\(new DatabasesFlipperPlugin\(context\)\);\s*/)) {
          // remove the database plugin setup
          return [];
        }

        return [line];
      }).join("\n");

      fs.writeFileSync(flipperFilePath, updatedFile, { encoding: "utf-8" });

      return c;
    }
  ]);
};

export default withoutReactNativeFlipperDatabasesPlugin;
