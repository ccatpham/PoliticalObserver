import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import LandingScreen from './screens/Landing';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import EducationScreen from './screens/Education';
import SearchScreen from './screens/Search';
import DashboardScreen from './screens/Dashboard';
import ProfileScreen from './screens/Profile';
import SettingsScreen from './screens/Settings';
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
/*
  Education - Search specifics, definitions
  Dashboard -
  Profile/Settings -
 */

const SearchStack = createStackNavigator({
  Search: SearchScreen,
});
const EducationStack = createStackNavigator({
  Education: EducationScreen,
});
const DashboardStack = createStackNavigator({
  Dashboard: DashboardScreen,
});
const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({navigate, navigation}) => ({
      headerTitle: 'Profile',
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text>Setting</Text>
        </TouchableOpacity>
      ),
    }),
  },
  Settings: {
    screen: SettingsScreen,
  },
});

const BottomTabNavigator = createBottomTabNavigator(
  {
    Search: SearchStack,
    Education: EducationStack,
    Dashboard: DashboardStack,
    Profile: ProfileStack,
  },
  {
    navigationOptions: {
      headerShown: false,
    },
  },
);

const AppNavigator = createStackNavigator({
  Landing: LandingScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
  Dashboard: BottomTabNavigator,
});

export default createAppContainer(AppNavigator);
