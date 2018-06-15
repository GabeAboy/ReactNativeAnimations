import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
class ProfileInfo extends Component {
/*
Takes an image string and a text string

*/
    render() {
        const { title, backgroundColor, textColor } = this.props;
        return (
           <View>

               </View>
        );
    }
}

export default ProfileInfo;