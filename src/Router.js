import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, styles} from './styles';

import LandingScreen from './screens/Landing';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Registration/Register';
import RegisterDemographicsScreen from './screens/Registration/RegisterDemographics';
import RegisterPersonalityScreen from './screens/Registration/RegisterPersonality';
import RegisterPoliticalScreen from './screens/Registration/RegisterPolitical';
import TermsAndConditionsScreen from './screens/Registration/TermsAndConditions';
import PrivacyPolicyScreen from './screens/Registration/PrivacyPolicy';
import EducationScreen from './screens/Education/Education';
import DashboardScreen from './screens/Dashboard/Dashboard';
import NotificationScreen from './screens/Dashboard/Notification';
import CompareDataScreen from './screens/Dashboard/CompareData';
import ProfileScreen from './screens/Profile/Profile';
import SettingsScreen from './screens/Profile/Settings';
import PersonalityLanding from './screens/Profile/PersonalityQuiz/PersonalityLanding';
import PersonalityMind from './screens/Profile/PersonalityQuiz/PersonalityMind';
import PersonalityEnergy from './screens/Profile/PersonalityQuiz/PersonalityEnergy';
import PersonalityNature from './screens/Profile/PersonalityQuiz/PersonalityNature';
import PersonalityTactic from './screens/Profile/PersonalityQuiz/PersonalityTactic';
import PersonalityResults from './screens/Profile/PersonalityQuiz/PersonalityResults';
import EditDemographics from './screens/Profile/Demographics/EditDemographic';
import DemographicInsights from './screens/Profile/Demographics/DemographicInsights';
import IssuesScreen from './screens/Education/Issues/Issues';
import IssueDetailsScreen from './screens/Education/Issues/IssueDetails';
import IssueDataScreen from './screens/Education/Issues/IssueData';
import PoliticiansScreen from './screens/Education/Politicians/Politicians';
import PoliticianDetailsScreen from './screens/Education/Politicians/PoliticianDetails';
import TopicsScreen from './screens/Education/Topics/Topics';
import TopicDetailsScreen from './screens/Education/Topics/TopicDetails';
import PoliticalCompassEcon from './screens/Profile/PoliticalCompass/PoliticalCompassEconomic';
import PoliticalCompassSocial from './screens/Profile/PoliticalCompass/PoliticalCompassSocial';
import PoliticalCompassInfo from './screens/Profile/PoliticalCompass/PoliticalCompassInfo';
import PoliticalCompassLanding from './screens/Profile/PoliticalCompass/PoliticalCompassLanding';
import PoliticalCompassResults from './screens/Profile/PoliticalCompass/PoliticalCompassResults';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const EducationStack = props => {
  return (
    <Stack.Navigator
      initialRouteName="Education"
      screenOptions={{
        gestureEnabled: false,
        headerTintColor: colors.black,
        headerStyle: styles.navigationBar,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Education"
        component={EducationScreen}
        initialParams={props.route.params}
      />
      <Stack.Screen name="Issues" component={IssuesScreen} />
      <Stack.Screen name="Issue Details" component={IssueDetailsScreen} />
      <Stack.Screen name="Issue Data" component={IssueDataScreen} />
      <Stack.Screen name="Politicians" component={PoliticiansScreen} />
      <Stack.Screen
        name="Politician Details"
        component={PoliticianDetailsScreen}
      />
      <Stack.Screen name="Topics" component={TopicsScreen} />
      <Stack.Screen name="Topic Details" component={TopicDetailsScreen} />
    </Stack.Navigator>
  );
};

const DashboardStack = props => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        gestureEnabled: false,
        headerTintColor: colors.black,
        headerStyle: styles.navigationBar,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        initialParams={props.route.params}
      />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Compare Data" component={CompareDataScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = props => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        gestureEnabled: false,
        headerTintColor: colors.black,
        headerStyle: styles.navigationBar,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={props.route.params}
      />
      <Stack.Screen
        name="Political Compass Landing"
        component={PoliticalCompassLanding}
      />
      <Stack.Screen
        name="Political Compass Info"
        component={PoliticalCompassInfo}
      />
      <Stack.Screen
        name="Political Compass Economic"
        component={PoliticalCompassEcon}
      />
      <Stack.Screen
        name="Political Compass Social"
        component={PoliticalCompassSocial}
      />
      <Stack.Screen
        name="Political Compass Results"
        component={PoliticalCompassResults}
      />
      <Stack.Screen
        name="Personality Landing"
        component={PersonalityLanding}
        initialParams={props.route.params}
      />
      <Stack.Screen
        name="Personality Mind"
        component={PersonalityMind}
        initialParams={props.route.params}
      />
      <Stack.Screen
        name="Personality Energy"
        component={PersonalityEnergy}
        initialParams={props.route.params}
      />
      <Stack.Screen
        name="Personality Nature"
        component={PersonalityNature}
        initialParams={props.route.params}
      />
      <Stack.Screen
        name="Personality Tactic"
        component={PersonalityTactic}
        initialParams={props.route.params}
      />
      <Stack.Screen
        name="Personality Results"
        component={PersonalityResults}
        initialParams={props.route.params}
      />
      <Stack.Screen
        name="Edit Demographics"
        component={EditDemographics}
        initialParams={props.route.params}
      />
      <Stack.Screen
        name="Demographic Insights"
        component={DemographicInsights}
        initialParams={props.route.params}
      />
      <Stack.Screen name="Issues" component={IssuesScreen} />
      <Stack.Screen name="Issue Details" component={IssueDetailsScreen} />
      <Stack.Screen name="Issue Data" component={IssueDataScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = props => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{gestureEnabled: false, headerShown: false}}
      tabBarOptions={{style: styles.tabBar, showLabel: false}}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        initialParams={props.route.params}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <Image
                  style={styles.tabBarIconSelected}
                  source={require('../res/icons/dashboardIcon.png')}
                />
              );
            } else {
              return (
                <Image
                  style={styles.tabBarIconUnselected}
                  source={require('../res/icons/dashboardIcon.png')}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Education"
        component={EducationStack}
        initialParams={props.route.params}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <Image
                  style={styles.tabBarIconSelected}
                  source={require('../res/icons/educationIcon.png')}
                />
              );
            } else {
              return (
                <Image
                  style={styles.tabBarIconUnselected}
                  source={require('../res/icons/educationIcon.png')}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        initialParams={props.route.params}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <Image
                  style={styles.tabBarIconSelected}
                  source={require('../res/icons/profileIcon.png')}
                />
              );
            } else {
              return (
                <Image
                  style={styles.tabBarIconUnselected}
                  source={require('../res/icons/profileIcon.png')}
                />
              );
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        gestureEnabled: false,
        headerTintColor: colors.black,
        headerStyle: styles.navigationBar,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Register Demographics"
        component={RegisterDemographicsScreen}
      />
      <Stack.Screen
        name="Register Personality"
        component={RegisterPersonalityScreen}
      />
      <Stack.Screen
        name="Register Political"
        component={RegisterPoliticalScreen}
      />
      <Stack.Screen
        name="Terms And Conditions"
        component={TermsAndConditionsScreen}
      />
      <Stack.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
