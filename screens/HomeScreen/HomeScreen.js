import React from "react";
import { StyleSheet, View, Text, ScrollView, RefreshControl, Alert, ToastAndroid } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Constants, Location, Permissions } from 'expo';
import moment from 'moment-timezone';


export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <MaterialCommunityIcons size={36} name='weather-cloudy' color={vars.appColor.font.dark} style={{marginLeft: 15}}/>
      ),
      title: 'Castly',
    }
  };

  constructor(props) {
    super(props)

    this.state = {
      weatherObject: null,
      lat: null,
      lon: null,
      isLoading: true,
      isRefreshing: false,
      isLocationOn: false,
      componentDidMount: false
    }

    this.location = null
    this.status = 'Loading...'
  }

  icons = {
    'partly-cloudy-day': 'weather-partlycloudy',
    'partly-cloudy-night': 'weather-partlycloudy',
    'clear-day': 'weather-sunny',
    'clear-night': 'weather-night',
    'rain': 'weather-rainy',
    'snow': 'weather-snowy',
    'wind': 'weather-windy',
    'fog': 'weather-fog',
    'cloudy': 'weather-cloudy',
    'hail': 'weather-hail',
    'thunderstorm': 'weather-lighting',
    'tornado': 'weather-hurricane'
  }


  findCurrentLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      return Location.getCurrentPositionAsync({enableHighAccuracy: true});
    } else {
      throw new Error('Location permissions not granted.')
    }
  }


  fetchData = async (timestamp, latitude, longitude) => {
    return fetch(`https://castly-test.herokuapp.com/instant/?timestamp=${Math.floor(timestamp/1000)}&lat=${latitude}&lon=${longitude}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( response => response.json() )
    .then( responseJson => {
      this.setState({
        weatherObject: responseJson,
        weatherIcon: this.icons[responseJson.forecast[0].icon]
      })
    })
    .catch( (error) => {
      console.log(error)
    })
  }

  _onRefresh = () => {
    console.log('Refreshing home!')
    this.setState({isRefreshing: true});
    this.findCurrentLocationAsync()
    .then((location) => {
      console.log(location)
      console.log('Refreshing location!')
      this.fetchData(location.timestamp, location.coords.latitude, location.coords.longitude)
    })
    .then(() => {
      console.log('Location fetched!')
      this.setState({isRefreshing: false, isLoading: false})
      console.log('Home refreshed!');
    })
    .catch ((error) => {
      console.log(error)
      ToastAndroid.showWithGravityAndOffset('Location services disabled', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 200)
      this.setState({isRefreshing: false})
    })
  }



  componentDidMount() {
    console.log('Acquiring home data!')
    this.findCurrentLocationAsync()
    .then((location) => {
      console.log('Acquiring location!')
      console.log(location)
      return this.fetchData(location.timestamp, location.coords.latitude, location.coords.longitude)
    })
    .then(() => {
      console.log('Location acquired!')
      this.setState({isLoading: false, componentDidMount: true})
      console.log('Home data acquired!')
    })
    .catch ((error) => {
      console.log(error)
      ToastAndroid.showWithGravityAndOffset('Location services disabled', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 200)
    })
  };



  render() {
      return (
        <View style={styles.container}>
          { this.state.isLoading ?
            <ScrollView
              contentContainerStyle={{flex:1, justifyContent: 'center', alignSelf: 'center'}}
              refreshControl={<RefreshControl refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}/>}>
              <Text>{this.status}</Text>
            </ScrollView>
          :
          <ScrollView contentContainerStyle={{flex:1}} refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh}/>}>
            <View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: vars.fontSize.large, paddingBottom: 0}}>{this.state.weatherObject.city}, {this.state.weatherObject.state}</Text>
              <Text style={{fontSize: vars.fontSize.medium, paddingBottom: 15, color: 'rgb(150, 150, 150)'}}>{this.state.weatherObject.country}</Text>
              <MaterialCommunityIcons size={100} name={this.icons[this.state.weatherObject.forecast[0].icon]} color='rgba(0, 0, 0, 0.1)'/>
            </View>
            <View style={styles.dataContainer}>
            { this.state.errorMessage ?
              <View>
              </View>
              :
              <View style={styles.dataCard}>
                <Text>{this.state.weatherObject.forecast[0].time}</Text>
                <Text>{this.state.weatherObject.forecast[0].summary}</Text>
                <Text>{Math.floor(this.state.weatherObject.forecast[0].cloudcast*100)}% cloudy</Text>
                <Text>{Math.floor(this.state.weatherObject.forecast[0].temp)}</Text>
              </View>
            }
            </View>
          </ScrollView>
          }
        </View>
      );
    }
  };

const vars = {
  appColor: {
    background: {
      weather: 'rgb(168, 198, 205)',
      normal: 'rgb(240, 240, 240)',
      dark: 'rgb(26, 26, 26)',
      card: 'rgb(245, 245, 245)',
    },
    font: {
      normal: 'rgb(26, 26, 26)',
      dark: 'rgb(235, 235, 235)',
      card: 'rgb(26, 26, 26)',
    },
  },
  fontSize: {
    mini: 8,
    small: 10,
    medium: 16,
    large: 20,
    xlarge: 24
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.appColor.background.normal,
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center'
  },
  dataCard: {
    flex: 3.5,
    alignSelf: 'stretch',
    flexDirection: 'column',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: vars.appColor.background.card,
    elevation: 3
  },
  dataContainer: {
    // Test background
    // backgroundColor: 'rgba(250, 180, 31, 0.27)',
    //
    // backgroundColor: vars.appColor.background.weather,
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingHorizontal: 40,
    paddingVertical: 40
  },
});
