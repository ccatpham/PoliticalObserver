# Political Observer Mobile App

## Overview

Political Observer is an educational application that encourages users to become 
more informed and involved with U.S politics by providing an interactive learning 
experience on current events and the U.S governmental system. 

Politics and government directly impact every aspect of our lives. 
In spite of this, only 61.4 percent of citizens participated in the 2016 
presidential election. Local elections suffer even lower voter turnout hovered 
between 11 to 44 percent. Political Observer addresses this issue by providing 
one convenient application for users to learn about the various aspects of the 
U.S political system, voice their opinion on trending policy issues, and track 
their political affiliation over time through an easily navigable interface. 
Users often hesitate to get involved because they think they’re uninformed about 
politics and how the government works. Clunky UIs further serve as a barrier and 
have been a source of frustration for end-users and we aim to increase involvement 
by combating these issues. No other apps combine both political education and 
self reporting data tracking. As the number of users continues to grow, this will 
provide a valuable and unique data set that can easily be marketed to provide 
revenue for the application.

## Key Features

1. Easy access to publicly recorded information.
2. Educational section with definitions and explanation of political topics.
3. Political questionnaire's and interactive experiences such as polling on hot
topics to aggregate data and assist users in determining their affiliation on the 
political spectrum


## Dependencies

This project is built with React Native to support iOS and Android. 
React-Native is an open source framework developed by Facebook that provides a 
javascript API to access the native methods of each respective platform. 
This allows us to build a cross platform app from a unified codebase. 
Unlike other cross platform frameworks such as Cordova or Sencha which render 
HTML in a web view, React Native leverages each platform's native UI layers, 
resulting in an app that looks, feels and performs like a native app.

You can learn more about React Native here: 
https://facebook.github.io/react-native/

Node.js
You'll need to install Node.js and its package manager npm in order to set up 
and run this project. We recommend using the lateset LTS version of Node which 
can be found here: https://nodejs.org/en/

Xcode
The latest stable release of Xcode 9 is required to build and run the iOS project

Android Studio
Android studio is required to build and run the Android project

## Repository Instructions
Never work off of Master or Develop branches.
Always start a new branch off of Develop as feature/branchname.
Always comment your commits and explain what you did.

Before committing code run `eslint src/* --fix` in project root 
to fix ESLint/Prettier errors and standardize code.

When your feature branch is complete, submit a pull request.
Please explain in detail what the pull request accomplishes and link to any
project docs or card related to the feature or fix.
Assign yourself as an Assignee and the rest of the team as Reviewers.
Assign a label to the pull request if applicable such as bug, feature, etcetera.


## Installation

After cloning the project repository, open the root of the project in a
terminal. To confirm you're in the project root you should have a package.json
file in your current working directory.

You can now install the remaining dependencies with the following terminal 
command: `npm install`

### iOS

Next, for iOS we need to install the dependencies as cocoa pods.
Navigate to /ios folder in the root project directory and run: `pod install` 

If errors persist try: `pod install --repo-update`

## Running on simulator

It's recommended to run the project through Xcode or Android Studio for the benefits of error reporting and tracing.

### iOS

#### Xcode

1.  Use Xcode to open the iOS workspace file located at /ios/PoliticalObserver.xcworkspace
2.  Select a simulator and run the project.
    - Xcode will launch a separate terminal window to run the React packager
      which manages a javascript bundle necessary to run the app
      
#### Terminal
1. Navigate to project root directory.
2. Run: `npm run ios` or `react-native run-ios`

### Android

#### Android Studio

1.  Use Android Studio to open the project located at /android
2.  Use AVD to boot an Android simulator
3.  Open a terminal at the root of the repository and run `npm start`
    - This will start the react packager which manages a javascript bundle
      necessary to run the app
4.  Build and run the project using Android Studio
5. If emulator has issues connecting to the packager, run: `adb reverse tcp:8081 tcp:8081`

#### Terminal
1. Navigate to project root directory.
2. Start the packager by running: `npm start`
3. Install and run the project on an emulator by running: 
`npm run android` or `react-native run-android`
4. If emulator has issues connecting to the packager, run: `adb reverse tcp:8081 tcp:8081`
