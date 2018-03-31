import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Ball extends Component {
    static navigationOption = {
        tabBarLabel: 'Screen 1',
        drawerIcon: () => {
            return (
                <Icon name="angle-right" size={55} color="#CED0CE" />

            );
        }
    }
    render(){
        return (
                <View style={styles.ball} />
        );
    }
}
const styles = {
    ball: {
        flex:1,justifyContent: 'center', alignItems: 'center', backgroundColor:'red'
    }
}