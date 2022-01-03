# disable-react-native-flipper-databases-expo-plugin

Disable the default React Native Flipper Database plugin (on Android) in EAS or expo prebuild

> Tested against Expo SDK 44

## Usage (Quick Guide)

**1.** Install the module: `yarn add -D @liamdawson/disable-react-native-flipper-databases-expo-plugin`

**2.** Add `@liamdawson/disable-react-native-flipper-databases-expo-plugin` configuration to the `plugins` section of your `app.json`, as per the example below.

## Configuration

```json
{
  "expo": {
    "..."
    "plugins": [
      "@liamdawson/disable-react-native-flipper-databases-expo-plugin"
    ]
  }
}
```
