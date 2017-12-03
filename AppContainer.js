import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Feed from './screens/Feed';
import FeedItem from './screens/FeedItem';
import Search from './screens/Search';
import { Text } from 'react-native';

const FeedStack = StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Feed',
    },
  },
  FeedItem: {
    screen: FeedItem,
    navigationOptions: 
      ({ navigation }) => ({
        title: navigation.state.params.actor.login,
      })
  }
});

const Tabs = TabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <Icon name="rss-feed" size={35} color={tintColor} />
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor }) => <Icon name="search" size={35} color={tintColor} />
    }
  },
});

export default class AppContainer extends Component {
  render() {
    return (

      <Tabs />

    )
  }
}
