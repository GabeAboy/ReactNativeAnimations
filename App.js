import React from 'react';
import { StyleSheet, View, Dimensions, AsyncStorage } from 'react-native';

import Router from './src/navigation/RootNavigation'
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
//TODO: Global config provided here
console.disableYellowBox = true
export default class App extends React.Component {
  componentWillUnmount() {
    const deleteUserId = async () => {
      try {
        await AsyncStorage.removeItem('userId');
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    }
    deleteUserId()
  }
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
