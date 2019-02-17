import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Keyboard, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Defs, LinearGradient, Stop, Circle, G, Line } from 'react-native-svg';
import { LineChart, AreaChart, Grid, Path, Decorator, XAxis, YAxis } from 'react-native-svg-charts';
import DataCard from './components/DataCard';
import * as shape from 'd3-shape';

const { width } = Dimensions.get('window')

export default class PredictionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [ 0.5, 0.5, 0.3, 0.7, 0.1, 0.9, 0, 1, 0, 0.9, 0.1, 0.7, 0.3, 0.5, 0.5 ],
      isLoading: true,
      isPredicted: false,
      timestamp: null,
      days: '3',
      weatherIcon: 'amazon-drive',
      weatherObject: null,
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
        data: responseJson.forecast[0].cloudCover,
        weatherIcon: this.icons[responseJson.forecast[0].icon]
      })
    })
    .catch( (error) => {
      console.log(error)
    })
  };

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


  render() {

    // <Stop offset={'0%'} stopColor={'rgb(199, 199, 199)'}/>
    // <Stop offset={'50%'} stopColor={'rgb(192, 223, 233)'}/>
    // <Stop offset={'75%'} stopColor={'rgb(50, 182, 227)'}/>

    {/* this.state.isPredicted && <XAxis
        style={{ marginHorizontal: 0, marginVertical: 10, height: xAxisHeight }}
        data={this.state.hours}
        xAccessor={ ({ value }) => value }
        formatLabel={value => {return value}}
        contentInset={{ left: 10, right: 10 }}
        svg={axesSvg}
    /> */}

    const Gradient = () => (
        <Defs key={'gradient'}>
            <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
              <Stop offset={'100%'} stopColor={'rgb(214, 40, 40)'}/>
              <Stop offset={'65%'} stopColor={'rgb(247, 214, 73)'}/>
              <Stop offset={'0%'} stopColor={'rgb(111, 209, 247)'}/>
            </LinearGradient>
        </Defs>
    )

    const Line = ({ line }) => (

        <Path
            key={'line'}
            d={line}
            stroke={'url(#gradient)'}
            strokeWidth={ 2 }
            fill={'none'}
            animate={true}
        />
    )
    const CustomGrid = ({ x, y, data, ticks }) => (
            <G>
                {
                    // Horizontal grid
                    ticks.map(tick => (
                        <Line
                            key={ tick }
                            x1={ '5%' }
                            x2={ '95%' }
                            y1={ y(tick) }
                            y2={ y(tick) }
                            stroke={ 'rgba(0,0,0,0.05)' }
                        />
                    ))
                }
                {
                    // Vertical grid
                    data.map((_, index) => (
                        <Line
                            key={ index }
                            y1={ '5%' }
                            y2={ '95%' }
                            x1={ x(index) }
                            x2={ x(index) }
                            stroke={ 'rgba(0,0,0,0.05)' }
                        />
                    ))
                }
            </G>
        )

    const axesSvg = { fontSize: 10, weight: 'bold',  fill: 'rgb(200, 200, 200)' }
    const xAxisInset = { top: 10, bottom: 10 }
    const yAxisInset = { top: 10, bottom: 10 }
    const xAxisHeight = 120
    const yAxisHeight = 0
    const hours = [
      {hours: '06:00'},
      {hours: '07:00'},
      {hours: '08:00'},
      {hours: '09:00'},
      {hours: '10:00'},
      {hours: '11:00'},
      {hours: '12:00'},
      {hours: '13:00'},
      {hours: '14:00'},
      {hours: '15:00'},
      {hours: '16:00'},
      {hours: '17:00'},
      {hours: '18:00'}
    ]



    return (
      <View style={styles.container}>
        {/*<View style={styles.navBar}>
          <MaterialCommunityIcons size={36} name='weather-cloudy' color={vars.appColor.font.dark}/>
          <Text style={styles.appTitle}>{vars.appTitle}</Text>
        </View>*/}
        <View style={styles.body}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <TextInput clearButtonMode='always' onChangeText={(text) => this.setState({location: text})} placeholder='Enter location...' value={this.state.location} style={styles.searchInput}/>
              <TouchableOpacity onPress={this.predictPress.bind(this)} style={styles.searchButton}>
                <MaterialCommunityIcons size={36} name="magnify" color='rgb(200, 200, 200)'/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingVertical: 10, marginTop: 10 }}>
            <Text style={styles.dataOpening}>{ this.state.isPredicted ? 'Cloud percentage' : ' '}</Text>
          </View>
          <View style={styles.graphContainer}>
            <View style={styles.graphIcon}>
              <MaterialCommunityIcons size={180} name={'amazon-drive'} color='rgb(230, 230, 230)'/>
            </View>
            <View style={{ flex: 1 }}>
              <LineChart
                style={styles.graph}
                curve={shape.curveCatmullRom}
                yMin={-0.1} yMax={1.1}
                data={this.state.data}
                animate={true}
                contentInset={{top: 0, bottom: 0, left: 0, right: 0}}
                svg={{strokeWidth: 3, stroke: 'url(#gradient)'}}
                >
                <Gradient/>
                { this.state.isPredicted && <YAxis
                    data={[0, 1]}
                    style={{
                      position: 'absolute',
                      height: '100%',
                      marginBottom: yAxisHeight,
                      paddingHorizontal: 3 }}
                    contentInset={yAxisInset}
                    svg={axesSvg}
                    formatLabel={value => {return ' ' + value*100 + '%'}}
                    numberOfTicks={3}
                /> }
              </LineChart>
            </View>
          </View>
          <View style={styles.dataContainer}>
          { this.state.isPredicted ?
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              // decelerationRate={'fast'}
              // snapToInterval={width}
              snapToAlignment={"center"}>
              <DataCard weatherObject={this.state.weatherObject} index={0}/>
              <DataCard weatherObject={this.state.weatherObject} index={1}/>
              <DataCard weatherObject={this.state.weatherObject} index={2}/>
            </ScrollView>
            :
            <View>
              <Text style={styles.dataOpening}>Ready to process your location!</Text>
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
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.appColor.background.normal,
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
    borderColor: 'white',
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
  graph: {
    // Test background
    // backgroundColor: 'rgba(118, 2, 163, 0.3)',
    justifyContent: 'center',
    height: '100%',
    // To make appear as a card, activate these
    // borderRadius: 8,
    // flexDirection: 'row',
    // marginHorizontal: 20,
    // backgroundColor: vars.appColor.background.card,
    // elevation: 3
  },
  graphIcon: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'rgba(59, 147, 116, 0.26)',
  },
  graphContainer: {
    // Test background
    // backgroundColor: 'rgba(249, 217, 41, 0.8)',
    //
    // paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 3,
    justifyContent: 'center'
  },
  dataTextBody: {
    fontSize: vars.fontSize.medium,
    color: vars.appColor.font.normal,
    fontWeight: 'normal',
    fontFamily: 'System',
  },
  dataTextDetails: {
    fontSize: vars.fontSize.small,
    color: vars.appColor.font.normal,
    fontWeight: 'normal',
    fontFamily: 'System',
  },
  dataTextTitle: {
    fontSize: vars.fontSize.medium,
    color: vars.appColor.font.normal,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  dataOpening: {
    fontSize: vars.fontSize.medium,
    color: 'rgb(190, 190, 190)',
    fontWeight: 'normal',
    fontFamily: 'System',
    alignSelf: 'center',
    justifyContent: 'center'
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
    paddingVertical: 40
  },
  appTitle: {
    fontSize: vars.fontSize.xlarge,
    color: vars.appColor.font.dark,
    paddingLeft: 15,
  },
  tabBar: {
    backgroundColor: vars.appColor.background.dark,
    height: 60,
    justifyContent: 'space-around',
    flexDirection: 'row',
    elevation: 12
  }
});

// <Text style={styles.buttonText}>{this.state.buttonPress}</Text>
