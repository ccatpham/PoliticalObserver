# PoliticalObserver

Political Observer app.

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

## Running on simulator

### iOS

#### Xcode

1.  Use Xcode to open the iOS workspace file located at /ios/PoliticalObserver.xcworkspace
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
