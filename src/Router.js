import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LandingScreen from './screens/Landing';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Registration/Register';
import RegisterDemographicsScreen from './screens/Registration/RegisterDemographics';
import RegisterPersonalityScreen from './screens/Registration/RegisterPersonality';
import RegisterPoliticalScreen from './screens/Registration/RegisterPolitical';
import EducationScreen from './screens/Education/Education';
import DashboardScreen from './screens/Dashboard';
import ProfileScreen from './screens/Profile';
import SettingsScreen from './screens/Settings';
import PersonalityLanding from './screens/PersonalityLanding';
import PersonalityMind from './screens/PersonalityMind';
import PersonalityEnergy from './screens/PersonalityEnergy';
import PersonalityNature from './screens/PersonalityNature';
import PersonalityTactic from './screens/PersonalityTactic';
import PersonalityResults from './screens/PersonalityResults';
import EditDemographics from './screens/EditDemographic';
import DemographicInsights from './screens/DemographicInsights';
import VotedOnIssues from './screens/VotedOnIssues';
import IssuesScreen from './screens/Education/Issues/Issues';
import IssueDetailsScreen from './screens/Education/Issues/IssueDetails';
import IssueDataScreen from './screens/Education/Issues/IssueData';
import PoliticiansScreen from './screens/Education/Politicians/Politicians';
import PoliticianDetailsScreen from './screens/Education/Politicians/PoliticianDetails';
import TopicsScreen from './screens/Education/Topics/Topics';
import TopicDetailsScreen from './screens/Education/Topics/TopicDetails';
import PoliticalCompassEcon from './screens/PoliticalCompassEconomic';
import PoliticalCompassSocial from './screens/PoliticalCompassSocial';
import PoliticalCompassLanding from './screens/PoliticalCompassLanding';
import PoliticalCompassResults from './screens/PoliticalCompassResults';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
      <Stack.Screen
        name="Voted On Issues"
        component={VotedOnIssues}
        initialParams={props.route.params}
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
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
