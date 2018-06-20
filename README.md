# TopStream

**Note: Only Android build setup**

## Environment setup (prerequisites)

To run React Native, the Android SDK and other prerequisites are required. Follow the instructions in the [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) section of the official React Native docs to get the right prerequisites.

Click "Building Projects with Native Code", then follow the instructions until the "Creating a new application" section.

## Install

    npm install
    
## Development

Start the Android emulator or connect a device over usb.

	emulator -list-avds
	
	emulator @[EMULATOR NAME]

#### Run the bundler

    react-native start
    
#### Build the app

While the bundler is running, in another terminal run the following command:

    react-native run-android

## Release APK (production build)


#### Generating a signing key

The local machine must have a key generated for it to build the project in production.

Follow the instructions in the Generating Signed APK section of the docs under ["Generating a signing key"](https://facebook.github.io/react-native/docs/signed-apk-android.html#generating-a-signing-key). After generating the .keystore file, move it from the current working directory to `android/app` in this project.


#### Build command

Once the keystore is moved, the following command will build the APK.

    cd android && ./gradlew assembleRelease


To find the APK go to:

    android/app/build/outputs/apk/app-release.apk

    
### Troubleshooting

If a development version of the app is installed when the release build is ran, the build will fail. Uninstall the development version of the app and rerun the production release build.