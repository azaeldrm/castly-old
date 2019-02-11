import React from "react";
import { StyleSheet, View, Text } from "react-native";
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

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Text>Home Screen</Text>
          <Text onPress={() => this.props.navigation.navigate('PredictionScreen')}>Press here</Text>
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
