import React from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen/HomeScreen';
import PredictionScreen from './screens/PredictionScreen/PredictionScreen';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';


const vars = {
  appTitle: 'Castly',
  appColor: {
    background: {
      weather: 'rgb(168, 198, 205)',
      normal: 'rgb(240, 240, 240)',
      dark: 'rgb(26, 26, 26)',
      card: 'rgb(245, 245, 245)',
    },
    font: {
      normal: 'rgb(26, 26, 26)',
      dark: 'rgb(235, 235, 235)',
      card: 'rgb(26, 26, 26)',
    },
  },
  fontSize: {
    mini: 8,
    small: 10,
    medium: 16,
    large: 20,
    xlarge: 24
  },
};

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: vars.appColor.background.dark,
  },
  headerLayoutPreset: 'center',
  headerTintColor: 'rgb(245, 245, 245)',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: 'System',
  },
};


const PredictionStack = createStackNavigator(
  {
    PredictionScreen: {
      screen: PredictionScreen
    },
  },
  {
    defaultNavigationOptions
  },
);

const HomeStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen
    },
  },
  {
    defaultNavigationOptions
  },
);

const SettingsStack = createStackNavigator(
  {
    SettingsScreen: {
      screen: SettingsScreen
    },
  },
  {
    defaultNavigationOptions
  }
);


const TabNavigator = createBottomTabNavigator(
  {
    HomeStack:
    {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) =>
        <MaterialCommunityIcons
          size={20}
          name='home-outline'
          color={tintColor}
          style={{paddingBottom: 15, paddingTop: 20}}
        />,
      },
    },
    PredictionStack:
    {
      screen: PredictionStack,
      navigationOptions: {
        tabBarLabel: 'Predictions',
        tabBarIcon: ({tintColor}) =>
        <MaterialCommunityIcons
          size={20}
          name='cloud-outline'
          color={tintColor}
          style={{paddingBottom: 15, paddingTop: 20}}
        />,
      },
    },
    SettingsStack: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({tintColor}) =>
        <MaterialCommunityIcons
          size={20}
          name='tune'
          color={tintColor}
          style={{paddingBottom: 15, paddingTop: 20}}
        />,
        tabBarVisible: false,
      }
    }
  },
  {
    lazy: false,
    initialRouteName: 'HomeStack',
    defaultNavigationOptions: {
      tabBarOptions: {
        style: {
          backgroundColor: 'rgb(30, 30, 30)',
          paddingBottom: 4,
          paddingHorizontal: 20,
        },
        activeTintColor: 'rgb(245, 245, 245)',
        inactiveTintColor: 'rgb(150, 150, 150)',
      },
    },
  }
);


const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
};



//// THINGS TO USE JUST IN CASE

// navigationOptions: {
//   headerStyle: {
//     elevation: 0,
//     shadowOpacity: 0
//   }
// },
// headerMode: 'none',
// navigationOptions: {
//   headerVisible: false
// },
