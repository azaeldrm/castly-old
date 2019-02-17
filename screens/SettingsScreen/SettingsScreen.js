import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Constants, Location, Permissions } from 'expo';

export default class SettingsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <MaterialCommunityIcons onPress={() => navigation.goBack(null)} size={24} name='arrow-left' color={vars.appColor.font.dark} style={{marginLeft: 20, marginRight: -5}}/>
      ),
      title: 'Settings',
    }
  };

  state = {
    latitude: null,
    longitude: null,
  }

  findCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude)
        const longitude = JSON.stringify(position.coords.longitude)

        this.setState({
          latitude,
          longitude
        })
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  findCurrentLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      })
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }



  render() {
    let text = ''
    if (this.state.errorMessage) {
      text = this.state.errorMessage
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location)
    }

    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Text>This is the Settings Screen</Text>
          <Text onPress={this.findCurrentLocationAsync}>Predict stuff</Text>
          <Text>{text}</Text>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center'
  },
});
