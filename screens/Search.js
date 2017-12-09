import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { format } from 'date-fns';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }
  handleSearchSubmit() {
    this.props.navigation.navigate('SearchResults', this.state.searchTerm);
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.input}
          placeholder="Search Query"
          onChangeText={(text) => this.setState({ searchTerm: text })}  
        />
        <TouchableHighlight 
          onPress={this.handleSearchSubmit}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Search
          </Text>
        </TouchableHighlight>
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
});