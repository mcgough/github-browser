import React, { Component } from 'react';
import AuthService from './../services/AuthService';
import FeedItem from './FeedItem';
import { Icon } from 'react-native-elements';
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { format } from 'date-fns';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedItems: [],
    };
    this.fetchFeed = this.fetchFeed.bind(this);
    this.renderFeedItem = this.renderFeedItem.bind(this);
    this.handleItemPressed = this.handleItemPressed.bind(this);
  }

  componentDidMount() {
    this.fetchFeed();
  }
  handleItemPressed(item) {
    this.props.navigation.navigate('FeedItem', item);
  }
  renderFeedItem(el) {
    const { actor, repo, org, created_at } = el.item;
    return (
      <TouchableOpacity
        onPress={() => this.handleItemPressed(el.item)}>
        <View style={styles.container}>
          <View><Image style={styles.avatar} source={{uri: actor.avatar_url}} /></View>
          <View style={{ marginLeft: 10, marginRight: 10, paddingTop: 15, paddingBottom: 15 }}>
            <Text style={{ color: '#333' }}>{format(created_at, 'M-DD-YYYY')}</Text>
            <Text style={{ color: '#333' }}>{actor.display_login}</Text>
            <Text style={{ color: '#333' }}>{org.login}</Text>
            <Text style={{ color: '#333' }}>{repo.name}</Text>
          </View>
          <Icon size={30} name="chevron-right" />
        </View>
      </TouchableOpacity>
    )
  }

  fetchFeed() {
    const authService = new AuthService();
    authService.getAuthInfo(async (err, authInfo) => {
      const url = 'https://api.github.com/users/'
        + authInfo.user.login
        + '/received_events';
      const response = await fetch(url, {
        headers: authInfo.header,
      });
      const responseData = await response.json();
      const feedItems = responseData.filter(ev => ev.type === 'PushEvent');
      this.setState({ feedItems: feedItems});
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ backgroundColor: '#F5FCFF' }} 
          data={this.state.feedItems} 
          renderItem={this.renderFeedItem}
          keyExtractor={(item, id) => item.id}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 1,
    backgroundColor: '#8FBCE6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 10,
    height: 60,
    width: 60,
    borderRadius: 30,
  },
})