# PoliticalObserver

Political Observer app.

## Installation

After cloning the project repository, open the root of the project in a
terminal. To confirm you're in the project root you should have a package.json
file in your current working directory.

You can now install the remaining dependencies with the following terminal 
command: `npm install`

## Running on simulator

### iOS

#### Xcode

1.  Use Xcode to open the iOS workspace file located at /ios/nasm.xcworkspace
2.  Select a simulator and run the project.
    - Xcode will launch a separate terminal window to run the React packager
      which manages a javascript bundle necessary to run the app
      
#### Terminal
Navigate to project root directory.

Run: `npm run ios` or `react-native run-ios`

### Android

#### Android Studio

1.  Use Android Studio to open the project located at /android
2.  Use AVD to boot an Android simulator
3.  Open a terminal at the root of the repository and run `npm start`
    - This will start the react packager which manages a javascript bundle
      necessary to run the app
4.  Build and run the project using Android Studio

#### Terminal
Navigate to project root directory.

Run: `npm run android` or `react-native run-android`
