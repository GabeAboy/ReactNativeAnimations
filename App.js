import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/Main';
import { Card, Button } from 'react-native-elements'
import Ball from './src/Ball';
import { StackNavigator, Easing } from 'react-navigation';
const Router = StackNavigator(
  {
    Home: { screen: Main },
    ShoppingCart: { screen: Ball}
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
    flex: 1,
    height:100,
    width:100,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  }
});
