import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Main from './src/Main';
import { Card, Button } from 'react-native-elements'
import LiftsNearBy from './src/LiftsNearBy';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import { StackNavigator, Easing } from 'react-navigation';
const Router = StackNavigator(
  {
    Home: { screen: LiftsNearBy },
    LiftsNearBy: { screen: LiftsNearBy }
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    }
  }
);

export default class App extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ width: SCREEN_WIDTH, height: 24, backgroundColor: 'black' }} />
        <Router />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {

    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  }
});
