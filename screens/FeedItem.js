import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { format } from 'date-fns';

export default class Feed extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.navigation.state.params);
  }

  render() {
    const {
      created_at,
      actor,
      org,
      repo,
    } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
          <View style={{ marginLeft: 10, marginRight: 10, paddingTop: 15, paddingBottom: 15 }}>
            <Text style={{ color: '#333' }}>{format(created_at, 'M-DD-YYYY')}</Text>
            <Text style={{ color: '#333' }}>{actor.display_login}</Text>
            <Text style={{ color: '#333' }}>{org.login}</Text>
            <Text style={{ color: '#333' }}>{repo.name}</Text>
          </View>
      </View>
    )
  }
}
