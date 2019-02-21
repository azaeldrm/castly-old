import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Defs, LinearGradient, Stop, Circle, G, Line } from 'react-native-svg';
import { LineChart, AreaChart, Grid, Path, Decorator, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const {width} = Dimensions.get('window')

export default class Graph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherIcon: 'amazon-drive',
    }
  };


  render() {

    // <Stop offset={'0%'} stopColor={'rgb(199, 199, 199)'}/>
    // <Stop offset={'50%'} stopColor={'rgb(192, 223, 233)'}/>
    // <Stop offset={'75%'} stopColor={'rgb(50, 182, 227)'}/>

    {/*<XAxis
        style={{
          position: 'absolute',
          flexDirection: 'column',
          height: 20 }}
        data={this.props.dataPoints}
        xAccessor={ ({ value }) => value }
        formatLabel={value => {return value}}
        contentInset={{ left: 10, right: 10 }}
        svg={axesSvg}
    />*/}

    const CloudGradient = () => (
      <Defs key={'cloudgradient'}>
        <LinearGradient id={'cloudgradient'} x1={'0'} y1={'0'} x2={'0'} y2={'100%'} gradientUnits="userSpaceOnUse">
          <Stop offset={'1'} stopColor={'rgb(214, 40, 40)'}/>
          <Stop offset={'0.70'} stopColor={'rgb(247, 214, 73)'}/>
          <Stop offset={'0'} stopColor={'rgb(111, 209, 247)'}/>
        </LinearGradient>
      </Defs>
    )

    const UVGradient = () => (
      <Defs key={'uvgradient'}>
        <LinearGradient id={'uvgradient'} x1={'0'} y1={'0'} x2={'0'} y2={'100%'} gradientUnits="userSpaceOnUse">
          <Stop offset={'1'} stopColor={'rgb(206, 247, 111)'}/>
          <Stop offset={'0.70'} stopColor={'rgb(255, 151, 43)'}/>
          <Stop offset={'0'} stopColor={'rgb(113, 32, 32)'}/>
        </LinearGradient>
      </Defs>
    )

    const PrecipGradient = () => (
      <Defs key={'precipgradient'}>
        <LinearGradient id={'precipgradient'} x1={'0'} y1={'0'} x2={'0'} y2={'100%'} gradientUnits="userSpaceOnUse">
          <Stop offset={'1'} stopColor={'rgb(111, 209, 247)'}/>
          <Stop offset={'0.70'} stopColor={'rgb(57, 107, 157)'}/>
          <Stop offset={'0'} stopColor={'rgb(93, 93, 93)'}/>
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

    let graphToShow = null
    var data = [0,1]

    if (this.props.graphShowing === 0) {
      data = [0,1]
      graphToShow =
      <LineChart
        style={styles.graph}
        curve={shape.curveMonotoneX}
        yMin={0}
        yMax={1}
        data={this.props.weatherObject.forecast[this.props.index].cloudCover}
        animate={true}
        contentInset={{top: 10, bottom: 10, left: 0, right: 0}}
        svg={{strokeWidth: 2, stroke: 'url(#cloudgradient)'}}
        >
        <CloudGradient/>
        <Grid
          belowChart={true}
          svg={{
            strokeOpacity: 0.15
          }}
        />
      </LineChart>
    } else if (this.props.graphShowing === 1) {
      data = [0,11]
      graphToShow =
      <LineChart
        style={styles.graph}
        curve={shape.curveMonotoneX}
        yMin={0}
        yMax={11}
        data={this.props.weatherObject.forecast[this.props.index].uvIndex}
        animate={true}
        contentInset={{top: 10, bottom: 10, left: 0, right: 0}}
        svg={{strokeWidth: 2, stroke: 'url(#uvgradient)'}}
        >
        <UVGradient/>
        <Grid
          belowChart={true}
          svg={{
            strokeOpacity: 0.15
          }}
        />
      </LineChart>
    } else if (this.props.graphShowing === 2) {
      data = [0,0.2]
      graphToShow =
      <LineChart
        style={styles.graph}
        curve={shape.curveMonotoneX}
        yMin={0}
        yMax={0.2}
        data={this.props.weatherObject.forecast[this.props.index].precipProbability}
        animate={true}
        contentInset={{top: 10, bottom: 10, left: 0, right: 0}}
        svg={{strokeWidth: 2, stroke: 'url(#precipgradient)'}}
        >
        <PrecipGradient/>
        <Grid
          belowChart={true}
          svg={{
            strokeOpacity: 0.15
          }}
        />
      </LineChart>
    }

    return (
      <View style={{flex: 1}}>
        <YAxis
            data={data}
            style={{
              position: 'absolute',
              flexDirection: 'column',
              alignSelf: 'center',
              height: '100%',
              }}
            contentInset={yAxisInset}
            svg={axesSvg}
            formatLabel={value => {
              if (this.props.graphShowing === 0) {
                return ('' + value*100 + '%')
              } else if (this.props.graphShowing === 1) {
                return ('' + value)
              } else if (this.props.graphShowing === 2) {
                return ('' + value*100 + '%')
              }
            }}
            numberOfTicks={4}
        />
        {graphToShow}
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
  graph: {
    // Test background
    // backgroundColor: 'rgba(118, 2, 163, 0.3)',
    // justifyContent: 'center',
    height: '100%',
    width: width,
    // To make appear as a card, activate these
    // borderRadius: 8,
    // flexDirection: 'row',
    // marginHorizontal: 20,
    // backgroundColor: vars.appColor.background.card,
    // elevation: 3
  }
})
