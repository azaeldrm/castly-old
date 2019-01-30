import React from 'react';
import moment from 'moment-timezone';
import DeviceInfo from 'react-native-device-info';
import { Localization } from 'expo-localization';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { LineChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [ 0, 1 ],
      isLoading: true,
      isPredicted: false,
      location: '',
      timestamp: null,
      days: '1',
      weatherObject: null,
      weatherResults: 'Do a search!',
      buttonAct: 'PREDICT',
      buttonRestart: 'RESTART',
    }
  };


  predictPress = async () => {
    let timestamp = Math.floor(Date.now()/1000)
    return fetch(`https://castly-test.herokuapp.com/?timestamp=${timestamp}&location=${this.state.location}&days=${this.state.days}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( (response) => response.json() )
    .then( (responseJson) => {
      this.setState({
        weatherObject: responseJson,
        weatherResults: responseJson.results,
        // buttonAct: 'RESTART',
        // isPredicted: true,
        location: '',
        data: responseJson.cloudCover,
      })
      console.log(responseJson)
    })
    .catch( (error) => {
      console.log(error)
    })
  };

  restartPress = () => {
    this.setState({
      weatherResults: null,
      buttonAct: 'PREDICT',
      isPredicted: false,
    })
  }


  // handleLoginClick() {
  //   this.setState({isLoggedIn: true});
  // }
  //
  // handleLogoutClick() {
  //   this.setState({isLoggedIn: false});
  // }
  //
  // render() {
  //   const isLoggedIn = this.state.isLoggedIn;
  //   let button;
  //
  //   if (isLoggedIn) {
  //     button = <LogoutButton onClick={this.handleLogoutClick} />;
  //   } else {
  //     button = <LoginButton onClick={this.handleLoginClick} />;
  //   }
  //


  render() {

    const Gradient = () => (
        <Defs key={'gradient'}>
            <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'0%'} y2={'100%'}>
                <Stop offset={'100%'} stopColor={'rgb(214, 40, 40)'}/>
                <Stop offset={'65%'} stopColor={'rgb(247, 214, 73)'}/>
                <Stop offset={'0%'} stopColor={'rgb(111, 209, 247)'}/>
            </LinearGradient>
        </Defs>
    )



    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
            <MaterialCommunityIcons size={36} name="weather-cloudy" color={vars.appColor.weather.font}/>
          <Text style={styles.appTitle}>{vars.appTitle}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.searchContainer}>
            <View style={{flex:4}}>
              <TextInput clearButtonMode='always' onChangeText={(text) => this.setState({location: text})} placeholder='Enter location...' value={this.state.location} style={styles.searchInput}/>
            </View>
            <View style={{flex:1}}>
              <TouchableOpacity onPress={this.predictPress.bind(this)} style={styles.searchButton}>
                <MaterialCommunityIcons size={36} name="cloud-search" color='rgb(84, 84, 84)'/>
              </TouchableOpacity>
            </View>
          </View>
          <LineChart style={styles.graphContainer} curve={ shape.curveBasis } data={this.state.data} animate={true} contentInset={{top:5,bottom:5}} svg={{strokeWidth:3,stroke:'url(#gradient)'}}>
            <Gradient/>
            <Grid/>
          </LineChart>
          <View style={styles.dataContainer}>
            <ScrollView>
              <Text style={styles.dataText}>{this.state.weatherResults}</Text>
            </ScrollView>
          </View>
          {/*<View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.predictPress.bind(this)} style={styles.button}>
              <Text style={styles.buttonText}>{this.state.buttonAct}</Text>
            </TouchableOpacity>
          </View>
        */}</View>
        <View style={styles.tabBar}>
        </View>
      </View>
    )
  };
};

const vars = {
  appTitle: 'Castly',
  appColor: {
    weather: {
      background: '#a8c6cd',
      font: '#f0f0f0'
    },
    normal: {
      background: '#f0f0f0',
      font: '#1a1a1a'
    },
    dark: {
      background: '#1a1a1a',
      font: '#f0f0f0'
    },
    accent: '#da9442',
  },
  fontSize: {
    mini: 12,
    small: 15,
    medium: 18,
    large: 21,
    xlarge: 24
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: vars.appColor.weather.background,
  },
  navBar: {
    height: 55,
    backgroundColor: vars.appColor.dark.background,
    elevation: 3,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: vars.fontSize.small,
    color: vars.appColor.normal.font,
    fontWeight: 'bold',
    fontFamily: 'System',
    marginHorizontal: 30,
  },
  button: {
    height: 40,
    backgroundColor: '#dfdfdf',
    borderColor: '#f79c34',
    borderRadius: 3,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonContainer: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: 'rgba(75, 250, 31, 0.27)',
    justifyContent: 'center',
  },
  dataText: {
    fontSize: vars.fontSize.mini,
    color: vars.appColor.normal.font,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  dataContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    flex: 4,
    // backgroundColor: 'rgba(250, 180, 31, 0.27)',
    padding: 10
  },
  searchInput: {
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 23,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: 'rgb(240, 240, 240)',
    alignSelf: 'stretch',
    elevation: 3,
  },
  searchButton: {
    alignSelf: 'center'
  },
  searchContainer: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    // backgroundColor: 'rgba(110, 27, 200, 0.27)',
    justifyContent: 'center',
  },
  graphContainer: {
    height: 150,
    borderRadius: 8,
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgb(240, 240, 240)',
    elevation: 3
  },
  tabBar: {
    backgroundColor: vars.appColor.dark.background,
    height: 60,
    justifyContent: 'space-around',
    flexDirection: 'row',
    elevation: 12
  },
  appTitle: {
    fontSize: vars.fontSize.xlarge,
    color: vars.appColor.weather.font,
    paddingLeft: 15,
  }
});

// <Text style={styles.buttonText}>{this.state.buttonPress}</Text>
