import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
class Button extends Component {

    render() {
        const { title, backgroundColor, textColor } = this.props;
        return (
            <TouchableHighlight 
            onPress={this.props.onPress}
            underlayColor='red'
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
            </TouchableHighlight>
        );
    }
}

export default Button;