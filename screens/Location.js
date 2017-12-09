import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import MapView from "react-native-maps";

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,        
      },
      marker: {},
      mapLoaded: false,
    };
  }
  componentDidMount() {
    console.log('map mounting');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        const region = Object.assign({}, this.state.region, {
          latitude: latitude,
          longitude: longitude,
        });
        this.setState({
          region: region,
          marker: {
            latitude: latitude,
            longitude: longitude,
          },
          mapLoaded: true,
        });
      }
    );
  }
  render() {
    if (this.state.mapLoaded) {
      console.log(this.state.region);
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Search for location"
          />
          <MapView
            style={styles.map}
            initialRegion={this.state.region}
          >
            <MapView.Marker
              title="This is the title"
              description="This is the description"
              coordinate={this.state.marker}
            />
          </MapView>
        </View>
      )
    }
    return (
      <View>
        <ActivityIndicator
          animating={true}
          size="large"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  input: {
    zIndex: 100,
    backgroundColor: 'rgba(255,255,255,.875)',
    position: 'absolute',
    top: 20,
    height: 50,
    width: '90%',
    fontSize: 18,
    padding: 4,
  }
})