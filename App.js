import React from 'react';
import moment from 'moment-timezone';
import DeviceInfo from 'react-native-device-info';
import { Localization } from 'expo-localization';
import * as gradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Defs, LinearGradient, Stop, Circle, G, Line, Rect } from 'react-native-svg';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [ 0.5, 0.5, 0.3, 0.7, 0.1, 0.9, 0, 1, 0, 0.9, 0.1, 0.7, 0.3, 0.5, 0.5 ],
      hours: [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6],
      isLoading: true,
      isPredicted: false,
      timestamp: null,
      days: '2',
      weatherObject: null,
      graphType: shape.curveCatmullRom,
      graphInset: {top:10,bottom:10, left: 0, right: 0},
      numOfLines: 0
    }
  };


  predictPress = async () => {
    let timestamp = Math.floor(Date.now()/1000)
    console.log('Search started!')
    Keyboard.dismiss()
    return fetch(`https://castly-test.herokuapp.com/?timestamp=${timestamp}&location=${this.state.location}&days=${this.state.days}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( (response) => response.json() )
    .then( (responseJson) => {
      if (this.state.isPredicted === false) {
        this.setState({
          weatherObject: responseJson,
          weatherResults: responseJson.results,
          isPredicted: true,
          // graphBool: false,
          textSize: 20,
          location: '',
          data: responseJson.forecast[0].cloudCover,
          // graphType: shape.curveCatmullRomClosed.alpha(0.25),
          // graphInset: {top:10,bottom:40, left: 20, right: 20}
        })
      } else {
        this.setState({
          weatherObject: responseJson,
          weatherResults: responseJson.results,
          location: '',
          // graphBool: true,
          data: responseJson.forecast[0].cloudCover,
        })
      }
    })
    console.log(responseJson)
    .catch( (error) => {
      console.log(error)
    })
  };


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

    const axesSvg = { fontSize: 8, fill: 'grey' };
    const xAxisInset = { top: 10, bottom: 10 }
    const yAxisInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
    const yAxisHeight = 30



    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
            <MaterialCommunityIcons size={36} name="weather-cloudy" color={vars.appColor.font.dark}/>
          <Text style={styles.appTitle}>{vars.appTitle}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <TextInput clearButtonMode='always' onChangeText={(text) => this.setState({location: text})} placeholder='Enter location...' value={this.state.location} style={styles.searchInput}/>
              <TouchableOpacity onPress={this.predictPress.bind(this)} style={styles.searchButton}>
                <MaterialCommunityIcons size={36} name="magnify" color='rgb(200, 200, 200)'/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.graphContainer}>
            <View style={styles.graphIcon}>
              <MaterialCommunityIcons size={180} name="amazon-drive" color='rgb(230, 230, 230)'/>
            </View>
            {/*<YAxis
                data={[0, 1]}
                style={{ marginBottom: yAxisHeight, paddingHorizontal: 3 }}
                contentInset={yAxisInset}
                svg={axesSvg}
                formatLabel={value => {return value*100 + '%'}}
                numberOfTicks={4}
            /> */ }
            <View style={{ flex: 1 }}>
              <LineChart
                style={styles.graph}
                curve={this.state.graphType}
                // yMin={0} yMax={1}
                data={this.state.data}
                animate={true}
                contentInset={this.state.graphInset}
                svg={{strokeWidth:3,stroke:'url(#gradient)'}}
                >
                <Gradient/>
                {/* this.state.isPredicted && <Grid/> */}
              </LineChart>
            </View>
          </View>
          <View style={styles.dataContainer}>
          { this.state.isPredicted ?
            <View style={styles.dataCard}>
              <View style={{flex: 3}}>
                <Text style={[styles.dataTextDetails, {alignSelf: 'center'}]}>
                  {this.state.weatherObject.report.data[0].dateRequested}
                </Text>
                <Text style={[styles.dataTextTitle, {alignSelf: 'center'}]}>
                  {'\n' + this.state.weatherObject.location}
                </Text>
                <Text style={[styles.dataTextBody, {alignSelf: 'center'}]}>
                  {this.state.weatherObject.forecast[0].summary}
                </Text>
              </View>
              <View style={{height: 1, backgroundColor: 'rgb(228, 228, 228)', width: '80%', alignSelf: 'center', marginVertical: 5}}/>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'column', alignSelf: 'stretch'}}>
                  <Text style={styles.dataTextDetails}>Best time:</Text>
                  <Text style={[styles.dataTextDetails, {fontWeight: 'bold'}]}>{this.state.weatherObject.report.data[0].bestTime[0]} to {this.state.weatherObject.report.data[0].bestTime[1]}</Text>
                </View>
                <View style={{flexDirection: 'column', alignSelf: 'stretch'}}>
                  <Text style={styles.dataTextDetails}>Cloud coverage:</Text>
                  <Text style={[styles.dataTextDetails, {fontWeight: 'bold'}]}>{Math.floor(this.state.weatherObject.report.data[0].cloudCover*100) + '%'}</Text>
                </View>
              </View>
            </View>
            :
            <View>
              <Text style={styles.dataOpening}>Ready to process your location!</Text>
            </View>
          }

          </View>
        </View>
        <View style={styles.tabBar}>

        </View>
      </View>
    )
  };
};

const vars = {
  appTitle: 'Castly',
  appColor: {
    background: {
      weather: 'rgb(168, 198, 205)',
      normal: 'rgb(240, 240, 240)',
      dark: 'rgb(26, 26, 26)',
      card: 'rgb(245, 245, 245)',
    },
    font: {
      // weather: '',
      normal: 'rgb(26, 26, 26)',
      dark: 'rgb(235, 235, 235)',
      card: 'rgb(26, 26, 26)',
    },
  },
  fontSize: {
    mini: 8,
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: vars.appColor.background.normal,
  },
  navBar: {
    height: 55,
    backgroundColor: vars.appColor.background.dark,
    elevation: 3,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingBottom: 10,
    paddingTop: 20,
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
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 4,
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
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingHorizontal: 40,
    paddingVertical: 20
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
