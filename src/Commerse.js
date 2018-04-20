import React, { Component } from 'react';
import { View } from 'react-native';
export default class MyCarousel extends Component {

    _renderItem({ item, index }) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
            </View>
        );
    }
}