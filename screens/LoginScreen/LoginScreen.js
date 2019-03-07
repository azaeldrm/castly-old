/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class LoginScreen extends Component {

  loginSuccessfully = () => {
    this.props.navigation.navigate('App')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text>I'm the LoginScreen component</Text>
          <TouchableOpacity style={styles.button} onPress={this.loginSuccessfully.bind(this)}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'rgb(255, 255, 255)',
    fontFamily: 'System',
  }
});
