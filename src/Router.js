import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LandingScreen from './screens/Landing';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import EducationScreen from './screens/Education';
import SearchScreen from './screens/Search';
import DashboardScreen from './screens/Dashboard';
import ProfileScreen from './screens/Profile';
import SettingsScreen from './screens/Settings';
import IssuesScreen from './screens/Issues';

import PoliticalCompassEcon from './screens/PoliticalCompassEconomic';
import PoliticalCompassSocial from './screens/PoliticalCompassSocial';
import PoliticalCompassLanding from './screens/PoliticalCompassLanding';
import PoliticalCompassResults from './screens/PoliticalCompassResults';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SearchStack = props => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        initialParams={props.route.params}
      />
    </Stack.Navigator>
  );
};

const EducationStack = props => {
  return (
    <Stack.Navigator
      initialRouteName="Education"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="Education"
        component={EducationScreen}
        initialParams={props.route.params}
      />
      <Stack.Screen name="Issues" component={IssuesScreen} />
    </Stack.Navigator>
  );
};

const DashboardStack = props => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        initialParams={props.route.params}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = props => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={props.route.params}
      />
      <Stack.Screen
        name="PoliticalCompassLanding"
        component={PoliticalCompassLanding}
      />
      <Stack.Screen
        name="PoliticalCompassEconomic"
        component={PoliticalCompassEcon}
      />
      <Stack.Screen
        name="PoliticalCompassSocial"
        component={PoliticalCompassSocial}
      />
      <Stack.Screen
        name="PoliticalCompassResults"
        component={PoliticalCompassResults}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = props => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{gestureEnabled: false, headerShown: false}}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        initialParams={props.route.params}
      />
      <Tab.Screen
        name="Education"
        component={EducationStack}
        initialParams={props.route.params}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        initialParams={props.route.params}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        initialParams={props.route.params}
      />
    </Tab.Navigator>
  );
};

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
