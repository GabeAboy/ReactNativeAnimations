import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Video } from 'react-native';
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


                <View style={styles.innerContain}>
                    <View style={styles.header}>
                        <Image
                            style={styles.logo}
                            source={require('../img/spot.png')}
                        />
                    </View>
                    <View style={styles.footer}>

                        <Button
                            title='SIGN UP FREE' backgroundColor='#22c41f' textColor='white'
                            onPress={() =>
                                navigate('SignUp', { navigation: navigate })}
                        />
                        <Button title='CONTINUE WITH FACEBOOK' backgroundColor='#3b5998' textColor='white' />
                        <Text style={{ marginBottom: 5 }}>Aleady a user?</Text>
                        <Button title='LOG IN' backgroundColor='#ecebe8' textColor='black'
                            onPress={() =>
                                navigate('LogIn', { navigation: navigate })}
                        />

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
        // position: 'absolute',
        // zIndex: 1,
        backgroundColor: '#4286f4'
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
        alignItems: 'center',
        marginBottom: 20
    },
    logo: {
        height: 75,
        width: 250
    }
});