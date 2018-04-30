import React, { Component } from 'react';
import { View, Text } from 'react-native';
export default class MenuButton extends Component {

    render() {
        return (
            <View style={styles.ball}>
                <Text>{this.props.Title}</Text>
            </View>
        );
    }
}
const styles = {
    ball: {
        width:'100%',
        height:85
        
    }
}