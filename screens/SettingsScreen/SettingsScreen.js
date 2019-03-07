import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class SettingsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <MaterialCommunityIcons onPress={() => navigation.goBack(null)} size={24} name='arrow-left' color={vars.appColor.font.dark} style={{marginLeft: 20, marginRight: -5}}/>
      ),
      title: 'Settings',
    }
  };

  logoutSuccessfully = () => {
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.bodyText}>I'm the SettingsScreen component</Text>
          <TouchableOpacity style={styles.button} onPress={this.logoutSuccessfully.bind(this)}>
            <Text style={styles.buttonText}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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
    backgroundColor: vars.appColor.background.dark
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyText: {
    color: vars.appColor.font.dark,
    fontFamily: 'System',
  },
  button: {
    backgroundColor: 'rgb(25, 131, 241)',
    borderRadius: 15,
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: vars.appColor.font.dark,
    fontFamily: 'System',
  }
});
