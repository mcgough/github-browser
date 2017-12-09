import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Text } from 'react-native';
import Feed from './screens/Feed';
import FeedItem from './screens/FeedItem';
import Search from './screens/Search';
import SearchResults from './screens/SearchResults';
import Location from './screens/Location';

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

const SearchStack = StackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Search',
    },
  },
  SearchResults: {
    screen: SearchResults,
    navigationOptions:
      ({ navigation }) => ({
        title: navigation.state.params,
      })      
  }
}, {
  mode: 'modal',
});

const Tabs = TabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <Icon name="rss-feed" size={35} color={tintColor} />
    }
  },
  Location: {
    screen: Location,
    navigationOptions: {
      tabBarLabel: 'Location',
      tabBarIcon: ({ tintColor }) => <Icon name="location-searching" size={30} color={tintColor} />      
    }
  },
  Search: {
    screen: SearchStack,
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
