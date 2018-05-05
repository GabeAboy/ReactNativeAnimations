import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MenuButton extends Component {
    // <Icon name="angle-right" size={55} color="#CED0CE" />
    render() {
        return (
            <View style={styles.ball}>
                <Icon style={{
                    paddingLeft: 35
                }} name={this.props.icon} size={35} color="#CED0CE" />
                <Text style={{
                    fontSize: 20,
                    paddingLeft: 25
                }}>{this.props.buttonName}</Text>
            </View>
        );
    }
}
const styles = {
    ball: {
        width: '100%',
        height: 85,
        borderWidth: 2,
        borderColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    }
}