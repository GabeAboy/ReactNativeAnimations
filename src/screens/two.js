import React, { Component } from 'react';
import { View } from 'react-native';

export class two extends Component {

    render() {
        return (
            <View style={styles.ball} />
        );
    }
}
const styles = {
    ball: {
        flex: 1,
        backgroundColor: 'red'
    }
}