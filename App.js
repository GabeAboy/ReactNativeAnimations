import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Main from './src/Main';
import { Card, Button } from 'react-native-elements'
import Ball from './src/Ball';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import { StackNavigator, Easing } from 'react-navigation';
const Router = StackNavigator(
  {
    Home: { screen: Main },
    ShoppingCart: { screen: Ball }
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
      // <Main style={styles.container}> </Main>
      // Pass in the StackNavigator object
      // so that we can change views in other components
      <Router />
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
