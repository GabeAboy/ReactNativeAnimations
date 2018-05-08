import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Text } from 'react-native';

export default class DrawerHeader extends Component {
    _onPressButton = () => {
    }
    render() {
        return (
            <View style={styles.ball} >
                
                <View style={{flex:1, marginTop: 20 }}>
                    <View style={{ flex: 1.5 }} >
                        <View style={{
                            marginTop: 25,
                            marginLeft: 25,
                            borderWidth: 1,
                            borderColor: 'white',
                            backgroundColor: 'gray',
                            width: 75, height: 75,
                            borderRadius: 40
                        }}>
                            <Image style={{ height: "100%", width: "100%" }} source={require('../../img/default-user.png')}
                                resizeMode='cover' />

                        </View>
                    </View>
                    <View style={{ flex: .7, justifyContent: 'flex-start', paddingTop: 20 }} >
                        <Text style={styles.font}>Gabriel Aboy</Text>
                        <Text style={styles.font}>Burlington Vermont, 05401</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = {
    ball: {
        height: '30%',
        width: '100%'
    },
    font: {
        marginLeft: 25,
        color: 'black',
        fontSize: 20
    }
}