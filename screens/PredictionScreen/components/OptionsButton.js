import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class OptionsButton extends Component {
  render() {
    return (
    <View style={styles.container}>
      <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
        <Text style={styles.buttonText}>{this.props.children}</Text>
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'rgb(245, 245, 245)',
    borderColor: 'rgb(245, 245, 245)',
    borderRadius: 5,
    elevation: 3,
    height: 30,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'normal',
    fontFamily: 'System',
    color: 'rgb(200, 200, 200)',
    flexDirection: 'row'
  }
});
