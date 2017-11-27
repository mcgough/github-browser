import React, { Component } from 'react';
import AuthService from './AuthService';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

export default class Login extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showProgress: false,
      items: [],
      badCredentials: false,
      unknownError: false,
      success: false,
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this); 
  }
  handleLoginSubmit() {
    this.setState({ showProgress: true });
    const { username, password } = this.state;
    const authService = new AuthService();
    authService.login({ username, password }, 
      (results) => {
        this.setState(Object.assign({
          showProgress: false
        }, results));
        if (results.success && this.props.onLogin) {
          this.props.onLogin();
        }
    });
  }
  render() {
    let errorMessage = <View />
    if (!this.state.success && this.state.badCredentials) {
      errorMessage = <Text style={styles.error}>
        Either the username or password were incorrect
      </Text>
    }
    if (!this.state.success && this.state.unknownError) {
      errorMessage = <Text style={styles.error}>
        There was an unexpected error
      </Text>
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo}
          source={require('./assets/img/octocat.png')} />
        <Text style={styles.heading}>Github Browser</Text>
        <TextInput style={styles.input}
          onChangeText={(text) => this.setState({ username: text })}
          placeholder="Github Username" />
        <TextInput style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="Github Password"
          secureTextEntry="true" />
        <TouchableHighlight 
          onPress={this.handleLoginSubmit}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Log In
          </Text>
        </TouchableHighlight>
        {errorMessage}
        <ActivityIndicator
          animating={this.state.showProgress}
          size="large"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 0,
    width: '100%',
  },
  logo: {
    height: 55,
    width: 66,
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    marginBottom: 10,
  },
  input: {
    height: 50,
    padding: 4,
    marginBottom: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec',
    width: '90%',
  },
  button: {
    height: 50,
    backgroundColor: '#48bbec',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center',
  },
  error: {
    color: 'red',
  },
  loader: {

  },
});