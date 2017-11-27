/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Login from './Login';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';

export default class App extends Component<{}> {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
    this.onLogin = this.onLogin.bind(this);
  }
  onLogin() {
    console.log(this.state);
    this.setState({ isLoggedIn: true });
  }
  render() {
    if (this.state.isLoggedIn) {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Logged In!!!</Text>
        </View>
      )
    } else {
      return (
        <Login onLogin={this.onLogin} />
      );

    }
  }
}

const styles = StyleSheet.create({
  container: {

  },
  welcome: {

  },
})