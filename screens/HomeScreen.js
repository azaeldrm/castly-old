import React from "react";
import { StyleSheet, View, Text, ScrollView, RefreshControl } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
      location: 'seattle',
      isLoading: true,
      isRefreshing: false,
    }
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

  fetchData = async () => {
    let timestamp = Math.floor(Date.now()/1000)
    return fetch(`https://castly-test.herokuapp.com/instant/?timestamp=${timestamp}&location=${this.state.location}`, {
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
    this.setState({isRefreshing: true});
    this.fetchData().then(() => {
      console.log('Home refreshed!')
      this.setState({isRefreshing: false});
    });
  }


  componentDidMount() {
    this.fetchData().then(() => {
      console.log('Home data mounted!')
      this.setState({isLoading: false})
    })
  };




  render() {
      return (
        <View style={styles.container}>
          { this.state.isLoading ?
            <View style={{flex:1, justifyContent: 'center', alignSelf: 'center'}}>
              <Text>Loading...</Text>
            </View>
          :
          <ScrollView contentContainerStyle={{flex:1}} refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh}/>}>
            <View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: vars.fontSize.large, paddingBottom: 30}}>{this.state.weatherObject.location}</Text>
              <MaterialCommunityIcons size={100} name={this.icons[this.state.weatherObject.forecast[0].icon]} color='rgba(0, 0, 0, 0.1)'/>
            </View>
            <View style={styles.dataContainer}>
              <View style={styles.dataCard}>
                <Text>{this.state.weatherObject.forecast[0].time}</Text>
                <Text>{this.state.weatherObject.forecast[0].summary}</Text>
                <Text>{this.state.weatherObject.forecast[0].cloudcast*100}% cloudy</Text>
                <Text>{this.state.weatherObject.forecast[0].temp}</Text>
              </View>
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
    backgroundColor: 'rgba(250, 180, 31, 0.27)',
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
