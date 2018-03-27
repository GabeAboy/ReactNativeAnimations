import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Video } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextCarousel from 'react-native-text-carousel';
import Button from './Library/Button';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
// Container for initial launch
// UAC login/signUp
//     facebook passport
//     logo
export default class Main extends Component {

    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container} >
                <Image source={require('../img/backG.jpg')}
                    resizeMode='contain' />

                <View style={styles.innerContain}>
                    <View style={styles.header}>
                        <Image
                            style={styles.logo}
                            source={require('../img/spot.png')}
                        />
                    </View>
                    <View style={styles.footer}>

                        <Button title='SIGN UP FREE' backgroundColor='#84bd00' textColor='white' />
                        <Button title='CONTINUE WITH FACEBOOK' backgroundColor='#3b5998' textColor='white' />
                        <Text style={{ marginBottom: 5 }}>Already a user?</Text>
                        <Button title='LOG IN' backgroundColor='#ecebe8' textColor='black' 
                            onPress={() =>
                                navigate('LiftsNearBy')
                            } />

                    </View>
                </View>


            </View>
        )
    }
};


const styles = StyleSheet.create({
    innerContain: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        justifyContent: 'space-between',
        position: 'absolute'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: 1
    },
    header: {
        height: 220,
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        height: SCREEN_HEIGHT - (SCREEN_HEIGHT * .72),
        width: SCREEN_WIDTH,
        alignItems: 'center'
    },
    logo: {
        height: 75,
        width: 250
    }
});