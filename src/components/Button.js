import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
class Button extends Component {

    render() {
        const { title, backgroundColor, textColor } = this.props;
        return (
            <TouchableOpacity 
            onPress={this.props.onPress}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,
                width: SCREEN_WIDTH * .8,
                borderRadius: 25,
                marginBottom: 20,
                backgroundColor: backgroundColor

            }}>
                <Text style={{color:textColor}}>{title}</Text>
            </TouchableOpacity>
        );
    }
}

export default Button;