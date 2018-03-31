import React, { Component } from 'react';
import { View } from 'react-native';
import Ball from '../Ball'
export class one extends Component {

    render() {
        return (
            <View style={styles.ball} />
        );
    }
}
const styles = {
    ball: {
        flex: 1,
        backgroundColor: 'blue'
    }
}