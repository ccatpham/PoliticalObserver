import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import LandingScreen from './screens/Landing';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import SearchScreen from './screens/Search';
import NotificationsScreen from './screens/Notifications';
import DashboardScreen from './screens/Dashboard';
import ProfileScreen from './screens/Profile';
import SettingsScreen from './screens/Settings';

const SearchStack = createStackNavigator({
  Search: SearchScreen,
});
const NotificationsStack = createStackNavigator({
  Notifications: NotificationsScreen,
});
const DashboardStack = createStackNavigator({
  Dashboard: DashboardScreen,
});
const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

const BottomTabNavigator = createBottomTabNavigator(
  {
    Search: SearchStack,
    Notifications: NotificationsStack,
    Dashboard: DashboardStack,
    Profile: ProfileStack,
    Settings: SettingsStack,
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
