import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Keyboard, Dimensions, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DataCard from './components/DataCard';
import Graph from './components/Graph';
import InitialGraph from './components/InitialGraph';
import OptionsButton from './components/OptionsButton';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window')

export default class TestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isPredicted: false,
      timestamp: null,
      days: '3',
      weatherIcon: 'amazon-drive',
      weatherObject: {},
      graphShowing: 0,
      elevation1: 0,
      elevation2: 3,
      elevation3: 3,
    }
  };

  static navigationOptions = ({ navigation }) => {

    return {
      headerLeft: (
        <MaterialCommunityIcons size={36} name='weather-cloudy' color={vars.appColor.font.dark} style={{marginLeft: 15}}/>
      ),
    title: 'Castly',
    }
  };

  scrollToInitialPosition = () => {
    this.scrollViewRef.scrollTo({ x: 0 });
  }

  predictPress = async () => {
    let timestamp = Math.floor(Date.now()/1000)
    console.log('Search started!')
    Keyboard.dismiss()
    return fetch(`https://castly-test.herokuapp.com/prediction/?timestamp=${timestamp}&location=${this.state.location}&days=${this.state.days}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( (response) => response.json() )
    .then( (responseJson) => {
      console.log(responseJson.report.data)
      this.setState({
        weatherObject: responseJson,
        weatherResults: responseJson.results,
        isPredicted: true,
        location: '',
      })
    })
    .catch( (error) => {
      console.log(error)
    })
  };

  changeGraph = (value) => {
    return this.setState({
      graphShowing: value
    })
  }

  touchPredictButton = async () => {
    this.predictPress()
    .then( () => {
    if (this.state.isPredicted === true) {
      this.scrollToInitialPosition()
      this.setState({graphShowing: 0, elevation1: 0, elevation2: 3, elevation3: 3})
      }
    })
  }


  render() {

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <TextInput clearButtonMode='always' onSubmitEditing={this.touchPredictButton.bind(this)} onChangeText={(text) => this.setState({location: text})} placeholder='Enter location...' value={this.state.location} style={styles.searchInput}/>
              <TouchableOpacity onPress={this.touchPredictButton.bind(this)} style={styles.searchButton}>
                <MaterialCommunityIcons size={36} name="magnify" color='rgb(200, 200, 200)'/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', width: '100%'}}>
            { this.state.isPredicted ?
              // Interim solution, still don't understand why justifyContent: 'space-between' is not working.
              <View style={{marginLeft: 20, flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
                <OptionsButton onPress={() => this.setState({graphShowing: 0, elevation1: 0, elevation2: 3, elevation3: 3})} elevation={this.state.elevation1}>
                  <Text> Cloud Level </Text>
                </OptionsButton>
                <OptionsButton onPress={() => this.setState({graphShowing: 1, elevation1: 3, elevation2: 0, elevation3: 3})} elevation={this.state.elevation2}>
                  <Text> UV Index </Text>
                </OptionsButton>
                <OptionsButton onPress={() => this.setState({graphShowing: 2, elevation1: 3, elevation2: 3, elevation3: 0})} elevation={this.state.elevation3}>
                  <Text> Precipitation </Text>
                </OptionsButton>
              </View>
              :
              <View>
                <Text> </Text>
              </View>
            }
          </View>
          <View style={styles.predictionContainer}>
            <View style={styles.graphIcon}>
              <MaterialCommunityIcons size={150} name={'amazon-drive'} color='rgb(230, 230, 230)'/>
            </View>
            { this.state.isPredicted ?
              <ScrollView
                ref={(ref) => { this.scrollViewRef = ref }}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={true}
                snapToAlignment={"center"}
                scrollEventThrottle={16}>
                <View style={{flex: 1}}>
                  <View style={styles.graphContainer}>
                    <Graph
                      weatherObject={this.state.weatherObject}
                      graphShowing={this.state.graphShowing}
                      index={0}/>
                  </View>
                  <View style={styles.dataContainer}>
                    <DataCard weatherObject={this.state.weatherObject} index={0}/>
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <View style={styles.graphContainer}>
                    <Graph
                      weatherObject={this.state.weatherObject}
                      graphShowing={this.state.graphShowing}
                      index={1}/>
                  </View>
                  <View style={styles.dataContainer}>
                    <DataCard weatherObject={this.state.weatherObject} index={1}/>
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <View style={styles.graphContainer}>
                    <Graph
                      weatherObject={this.state.weatherObject}
                      graphShowing={this.state.graphShowing}
                      index={2}/>
                  </View>
                  <View style={styles.dataContainer}>
                    <DataCard weatherObject={this.state.weatherObject} index={2}/>
                  </View>
                </View>
              </ScrollView>
              :
              <View style={{flex: 1}}>
                <View style={styles.graphContainer}>
                  <InitialGraph/>
                </View>
                <View style={styles.dataContainer}>
                  <Text style={styles.dataText}>Ready to process your location!</Text>
                </View>
              </View>
            }

          </View>
        </View>
      </View>
    )
  };
};

const vars = {
  appTitle: 'Castly',
  appColor: {
    background: {
      weather: 'rgba(255, 218, 29, 0.62)',
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
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.appColor.background.normal,
  },
  predictionContainer: {
    // Test background
    // backgroundColor: 'rgba(180, 245, 92, 0.24)',
    flex: 8,
    paddingTop: 5
  },
  optionsContainer: {
    flex: 1
  },
  body: {
    flex: 1,
    flexDirection: 'column',
  },
  searchInput: {
    flex: 5,
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 23,
  },
  searchButton: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  searchBar: {
    height: 50,
    borderColor: vars.appColor.background.card,
    borderRadius: 8,
    backgroundColor: vars.appColor.background.card,
    alignSelf: 'stretch',
    elevation: 3,
    flexDirection: 'row'
  },
  searchContainer: {
    // Test background
    // backgroundColor: 'rgba(110, 27, 200, 0.27)',
    height: 75,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  graphContainer: {
    // Test background
    // backgroundColor: 'rgba(249, 217, 41, 0.8)',
    //
    // flexDirection: 'row',
    // alignItems: 'center',
    flex: 4,
    // paddingBottom: 20,
    // justifyContent: 'center'
  },
  graphIcon: {
    // Test background
    // backgroundColor: 'rgba(59, 147, 116, 0.26)',
    position: 'absolute',
    top: 0,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  dataContainer: {
    // Test background
    // backgroundColor: 'rgba(250, 180, 31, 0.27)',
    //
    // backgroundColor: vars.appColor.background.weather,
    paddingTop: 20,
    flex: 6,
    paddingBottom: 40,
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // flexDirection: 'column',
  },
  dataText: {
    // backgroundColor: 'rgba(226, 80, 39, 0.29)',
    fontSize: vars.fontSize.medium,
    color: 'rgb(190, 190, 190)',
    fontWeight: 'normal',
    fontFamily: 'System',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  optionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    justifyContent: 'space-between'
  },
  appTitle: {
    fontSize: vars.fontSize.xlarge,
    color: vars.appColor.font.dark,
    paddingLeft: 15,
  }
});

// <Text style={styles.buttonText}>{this.state.buttonPress}</Text>
