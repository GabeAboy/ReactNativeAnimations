import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Text } from 'react-native';

export default class DrawerHeader extends Component {
    _onPressButton = () => {
        console.log('hello')
    }
    render() {
        return (
            <View style={styles.ball} >
                <Image style={{ height: "100%", width: "100%", position: 'absolute', zIndex: 1 }} source={require('../..//img/gridOne.jpg')}
                    resizeMode='cover' />
                <View style={{ position: 'absolute', zIndex: 2, marginTop: 50 }}>
                    <View style={{ flex: 1.5, justifyContent: 'center' }} >
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
                    <View style={{ flex: .7, justifyContent: 'flex-start', marginTop: 10 }} >
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