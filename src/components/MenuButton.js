import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MenuButton extends Component {
    // <Icon name="angle-right" size={55} color="#CED0CE" />
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name={this.props.icon}
                        size={20}
                        color="#9a9ea5"
                        style={{ paddingRight: 20 }} />
                    <Text style={styles.font}>
                        {this.props.buttonName}
                    </Text>
                </View>
            </View>
        );
    }
}
const styles = {
    container: {
        width: '100%',
        height: 70,
        backgroundColor: '#e8eff9',
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingLeft: 40

    },
    font: {
        marginLeft: 20,
        letterSpacing: 2,
        fontSize: 25,
        color:'#9a9ea5'
    }
}