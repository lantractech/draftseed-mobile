import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from 'components/TabBarIcon';
import TabBarLabel from 'components/TabBarLabel';
import HomeScreen from 'screens/HomeScreen';
import CurrentStatsScreen from 'screens/CurrentStatsScreen/CurrentStatsScreen';
import SettingsScreen from 'screens/SettingsScreen';

const CurrentStatsStack = createStackNavigator({
  CurrentStats: CurrentStatsScreen,
});

CurrentStatsStack.navigationOptions = {
  tabBarVisible:false, //remove or set to true to display the primary icon tab bar for all options in this JS file
  tabBarLabel: ({ focused }) => (
    <TabBarLabel
      focused={focused}
      name={'Current Stats'} />
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-rocket' : 'md-rocket'}
    />
  ),
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarLabel
      focused={focused}
      name={'Home'} />
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarLabel
      focused={focused}
      name={'Settings'} />
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  CurrentStatsStack,
  HomeStack,
  SettingsStack,
});

