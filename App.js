/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Login from './screens/Login';
import AppContainer from './AppContainer';
import AuthService from './services/AuthService';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

export default class App extends Component<{}> {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      checkingAuth: true,
    };
    this.onLogin = this.onLogin.bind(this);
  }
  componentDidMount() {
    const authService = new AuthService();
    authService.getAuthInfo((err, authInfo) => {
      console.log(err, authInfo);
      if (!err && authInfo !== undefined) {
        return this.setState({
          checkingAuth: false,
          isLoggedIn: authInfo !== null,
        });
      }
      return this.setState({
        checkingAuth: false,
        isLoggedIn: false,
      });
    });
  }
  onLogin() {
    this.setState({ isLoggedIn: true });
  }
  render() {
    if (this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large" />
        </View>
      )
    }
    if (this.state.isLoggedIn) {
      return (
        <AppContainer />
      )
    }
    return (
      <Login onLogin={this.onLogin} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 30,
  },
})