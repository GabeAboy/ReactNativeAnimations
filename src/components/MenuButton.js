import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MenuButton extends Component {
    // <Icon name="angle-right" size={55} color="#CED0CE" />
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