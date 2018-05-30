import React, { Component } from 'react';
import { View, Text } from 'react-native';
import NaviDrink from '../NaviDrink'

class LoadingGIF extends React.Component {

    render() {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor:'black'

                }}>
                <NaviDrink/>
            </View>
        );
    }
}

export default LoadingGIF;