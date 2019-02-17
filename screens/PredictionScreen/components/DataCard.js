import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const {height, width} = Dimensions.get('window')

export default class DataCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherIcon: 'amazon-drive',
    }
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


    return (
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <View style={styles.dataCard}>
          <View style={{position: 'absolute', marginTop: 5, width: '100%', flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between'}}>
            <MaterialCommunityIcons size={30} name={this.icons[this.props.weatherObject.forecast[this.props.index].icon]} color='rgba(0, 0, 0, 0.1)'/>
            <Text style={{fontSize: 16, fontWeight: 'bold', alignSelf: 'center', color: 'rgba(0, 0, 0, 0.1)' }}>77°C </Text>
          </View>
          <View style={{flex: 3}}>
            <Text style={[styles.dataTextDetails, {alignSelf: 'center'}]}>
              {this.props.weatherObject.report.data[this.props.index].dateRequested}
            </Text>
            <View style={{flexDirection: 'column', justifyContent: 'center', height:'100%', paddingBottom: 10}}>
              <Text style={[styles.dataTextTitle, {alignSelf: 'center'}]}>
                {this.props.weatherObject.location}
              </Text>
              <Text style={[styles.dataTextBody, {alignSelf: 'center'}]}>
                {this.props.weatherObject.forecast[this.props.index].summary}
              </Text>
            </View>
          </View>
          <View style={{height: 1, backgroundColor: 'rgb(228, 228, 228)', width: '80%', alignSelf: 'center', marginVertical: 5}}/>
          <View>
            { this.props.weatherObject.report.data[this.props.index].bestTime.length === 0 ?
              <View style={{flexDirection: 'column', alignSelf: 'center'}}>
                <Text style={styles.dataTextDetails}>Weather conditions for this day are not optimal.</Text>
              </View>
              :
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'column', alignSelf: 'stretch'}}>
                  <Text style={styles.dataTextDetails}>Best time to take photos:</Text>
                  <Text style={[styles.dataTextDetails, {fontWeight: 'bold'}]}>
                    { this.props.weatherObject.report.data[this.props.index].bestTime.length === 2 ?
                      this.props.weatherObject.report.data[this.props.index].bestTime[0] + " to " + this.props.weatherObject.report.data[this.props.index].bestTime[1]
                      :
                      this.props.weatherObject.report.data[this.props.index].bestTime
                    }
                  </Text>
                </View>
                <View style={{flexDirection: 'column', alignSelf: 'stretch'}}>
                  <Text style={styles.dataTextDetails}>Cloud coverage:</Text>
                  <Text style={[styles.dataTextDetails, {fontWeight: 'bold'}]}>{Math.floor(this.props.weatherObject.report.data[this.props.index].cloudCover*100) + '%'}</Text>
                </View>
              </View>
            }
          </View>
        </View>
      </View>

    )

  }


}

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
    flex: 1,
    width: width - 40,
    alignSelf: 'stretch',
    flexDirection: 'column',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: vars.appColor.background.card,
    elevation: 3
  }

})
