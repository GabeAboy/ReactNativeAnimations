import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Main from './src/Main';
import { Card, Button } from 'react-native-elements'
import LiftsNearBy from './src/LiftsNearBy';
import Commerse from './src/Commerse';
import LogIn from './src/LogIn';
import SignUp from './src/SignUp'
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import { StackNavigator, DrawerNavigator } from 'react-navigation';



const Router = StackNavigator(

  {
    Home: { screen: Main },
    LogIn: { screen: LogIn },
    SignUp: { screen: SignUp },
    LiftsNearBy: { screen: LiftsNearBy },
    Commerse: { screen: Commerse }
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
        <Router navigationBarStyle={{
          width: SCREEN_WIDTH, height: 24, backgroundColor: '#4286f4'
        }} />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {

    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  }
});
