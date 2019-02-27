import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Defs, LinearGradient, Stop, Circle, G, Line } from 'react-native-svg';
import { LineChart, AreaChart, Grid, Path, Decorator, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const {width} = Dimensions.get('window')

export default class InitialGraph extends React.Component {

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

    const Gradient = () => (
      <Defs key={'gradient'}>
        <LinearGradient id={'gradient'} x1={'0'} y1={'0'} x2={'0'} y2={'100%'} gradientUnits="userSpaceOnUse">
          <Stop offset={'1'} stopColor={'rgb(214, 40, 40)'}/>
          <Stop offset={'0.70'} stopColor={'rgb(247, 214, 73)'}/>
          <Stop offset={'0'} stopColor={'rgb(111, 209, 247)'}/>
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


    return (
      <View style={{flex: 1}}>
        <LineChart
          style={styles.graph}
          curve={shape.curveCardinal}
          yMin={0}
          yMax={1}
          data={vars.initialData}
          animate={true}
          contentInset={{top: 10, bottom: 10, left: 0, right: 0}}
          svg={{strokeWidth: 2, stroke: 'url(#gradient)'}}
          >
          <Gradient/>
        </LineChart>
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
  initialData: [ 0.5, 0.5, 0.3, 0.7, 0.1, 0.9, 0, 1, 0, 0.9, 0.1, 0.7, 0.3, 0.5, 0.5 ]
};


const styles = StyleSheet.create({
  graph: {
    // Test background
    // backgroundColor: 'rgba(118, 2, 163, 0.3)',
    // justifyContent: 'center',
    height: '100%',
    width: width,
  }
})
