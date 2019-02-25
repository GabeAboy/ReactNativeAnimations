import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Video, AsyncStorage } from 'react-native';
import TextCarousel from 'react-native-text-carousel';
import Button from '../components/Button';
import * as firebase from 'firebase'
import firebaseConfig from '../../keys/firebasekeys'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

firebase.initializeApp(firebaseConfig)
export default class LandingPage extends Component {
    constructor() {
        super();
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
        this._retrieveData.bind(this)
    }

    componentDidMount() {
 
        /* **TODO**
                1. How does spotify keep me logged in?
                2. Is there any case that onAuthStateChanged upon login automatically log me in
                    #Cache
                    #State
                    #FB Integration
        */
        // Does this ever find a user when its the first time you load?
        // How does spotify keep me logged in
        // Try having spotify logged in.. logout of facebook and document what happens 


        // firebase.auth().onAuthStateChanged((user) => {
        //     if (user != null && user.providerData[0].providerId == 'facebook.com') {
        //         this.props.navigation.navigate('DatePicker', { navigation: this.props.navigation })
        //     }
        // })
        this._retrieveData()
    }
    _retrieveData = async () => {

        try {
            const value = await AsyncStorage.getItem('LoggedIn');
            if (value !== null) {
             
                this.props.navigation.navigate('DatePicker', { navigation: this.props.navigation })
            }
        } catch (error) {
            console.log('err ', error)
            // Error retrieving data
        }
    }
    async loginWithFacebook() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1634938636614030', {
            permissions: ['public_profile'],
        });
        if (type == 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)

            firebase.auth()
                .signInAndRetrieveDataWithCredential(credential)
                .then(() => {
                    this.props.navigation.navigate('DatePicker', { navigation: this.props.navigation })
                })
                .catch((error) => {
                    console.log(error)
                })
           
        }
    }
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
                            source={require('../../img/myLogo.png')}
                            resizeMode='contain'

                        />
                    </View>
                    <View style={styles.footer}>

                        <Button
                            title='SIGN UP FREE' backgroundColor='#22c41f' textColor='white'
                            onPress={() =>
                                navigate('SignUp', { navigation: navigate })}
                        />
                        <Button
                            onPress={() => {
                                this.loginWithFacebook()
                            }}
                            title='CONTINUE WITH FACEBOOK'
                            backgroundColor='#3b5998'
                            textColor='white' />
                        <Text style={{ marginBottom: 5 }}>
                            Aleady a user?
                        </Text>
                        <Button
                            onPress={() =>
                                navigate('LogIn', { navigation: navigate })
                            }
                            title='LOG IN'
                            backgroundColor='#ecebe8'
                            textColor='black'
                        />
                    </View>
                    <View style={{ height: 20, width: '100%' }} />
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
        marginBottom: 20,
    },
    logo: {
        height: '80%',
        width: '100%'
    }
});