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
  render() {
    return (

      <View style={{ flex: 1 }}>
        <Text>Search Screen</Text>
      </View>

    )
  }
}