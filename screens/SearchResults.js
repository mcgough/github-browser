import React, { Component } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { format } from 'date-fns';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      results: [],
      searchTerm: '',
    };
    this.renderResults = this.renderResults.bind(this);
    this.handleResultClick = this.handleResultClick.bind(this);
  }

  async componentDidMount() {
    const searchTerm = this.props.navigation.state.params;
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}&sort=stars&order=desc`);
    const json = await response.json();
    return this.setState(Object.assign(this.state,{
      isLoading: false,
      results: json.items,
      searchTerm: searchTerm,
    }));
  }

  handleResultClick(item) {
    console.log(item);
    // this.props.navigation.navigate('Repo', item);
  }

  renderResults(el) {
    const { owner, full_name, score, stargazers_count } = el.item;
    return(
      <TouchableOpacity
        onPress={() => this.handleResultClick(el.item)}>
        <View style={styles.resultContainer}>
          <View style={styles.resultDetailsContainer}>
            <Image style={styles.avatar} source={{uri: owner.avatar_url}} />
            <View>
              <Text style={{marginBottom: 5, fontSize: 14, fontWeight: 'bold' }}>{full_name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="stars" size={18} />
                <Text style={{ marginLeft: 5}}>{stargazers_count}</Text>
              </View>
            </View>
          </View>
          <Icon size={30} name="chevron-right" />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator
            animating={true}
            size="large" 
          /> 
        </View>
      )
    }
    return (
      <View style={{flex: 1}}>
        <FlatList
          style={{ backgroundColor: '#F5FCFF' }} 
          data={this.state.results} 
          renderItem={this.renderResults}
          keyExtractor={(item, id) => item.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  resultContainer: {
    marginBottom: 1,
    backgroundColor: '#8FBCE6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultDetailsContainer: {
    marginBottom: 1,
    backgroundColor: '#8FBCE6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,   
  },
  avatar: {
    marginLeft: 10,
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
  }
})