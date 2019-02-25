import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import LoadingGIF from '../../components/eventHandlers/LoadingGIF';
import * as firebase from 'firebase'
import NaviDrink from '../../components/NaviDrink'
import firebaseConfig from '../../../keys/firebasekeys'
// Container for initial launch
// UAC login/signUp
//     facebook passport
//     logo
// Set the configuration for your app
// TODO: Replace with your project's config object
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();


export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            email: '',
            password: '',
            componentLoad: false
        })
    }
    clicked = () => {
    }
    signUpUser = (email, password) => {
        
        try {
            if (this.state.password.length < 6) {
                alert('Please enter more than 6 characters')
                return;
            }
            this.setState({ componentLoad: true })
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((result) => {
                    const userUID = result.user.uid;
                   
                    if (userUID) {
                        firebase.database().ref(`users/${userUID}`).set({
                            zipcode: null,
                        }).catch((error) => {
                            console.log('er', error)
                        })
                    }
                }).then(() => {
                    this.setState({ componentLoad: false })
                    firebase.auth().signOut()
                }).then(() => {
                    this.props.navigation.navigate('LogIn', { navigation: this.props.navigation })
                }).catch((error) => {
                    this.setState({ componentLoad: false })
                    alert(error)
                   // this.props.navigation.navigate('DisplayError', { navigation: this.props.navigation })
                })

        } catch (error) {
            this.setState({ componentLoad: false })
            console.log(error.toString())
            this.props.navigation.navigate('DisplayError', { navigation: navigation.props.navigation })
        }
    }
    logIn = (email, password) => {

    }

    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container} >
                {
                    this.state.componentLoad ?
                        <LoadingGIF /> :
                        <View style={{ flex: 1 }}>
                            <View style={{ width: '100%', height: 24 }} />
                            <NaviDrink navigate={this.props.navigation} />
                            <View style={styles.title}>
                                <Text style={styles.titleFont}>Sign Up</Text>
                            </View>
                            <View style={styles.body}>
                                <View style={{ width: '90%' }}>
                                    <Text style={styles.textFont}>Email or username</Text>
                                    <TextInput
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        underlineColorAndroid='transparent'
                                        style={styles.input}
                                        onChangeText={(email) => this.setState({ email })}
                                    />
                                </View>
                                <View style={{ width: '90%' }}>
                                    <Text style={styles.textFont}>Password</Text>
                                    <TextInput
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        underlineColorAndroid='transparent'
                                        style={styles.input}

                                        onChangeText={(password) => this.setState({ password })}
                                    />
                                </View>
                            </View>
                            <View style={styles.submit}>
                                <TouchableHighlight style={{
                                    width: 180,
                                    height: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center', backgroundColor: 'grey', opacity: .5,
                                    borderRadius: 25, marginBottom: 15
                                }}
                                    onPress={() => this.signUpUser(this.state.email, this.state.password)}
                                >
                                    <Text
                                        //navigate('LiftsNearBy', { navigation: navigate })}
                                        style={styles.submitText}>Next
                            </Text>
                                </TouchableHighlight>
                            </View>
                            <TouchableHighlight
                                underlayColor='#4D9AD5'
                                onPress={() => {
                                    //Send to mountain registration form
                                    navigate('MountainRegistration', { navigation: navigate })

                                }} style={{ backgroundColor: 'rgba(138, 187, 243, 0.1)', height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text>Mountains, click here to partner register with SkiEasy.</Text>
                            </TouchableHighlight>
                        </View>
                }


            </View>
        )
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#4286f4'
    },
    title: {
        alignItems: 'center'
    },
    titleFont: {
        fontWeight: 'bold',
        fontSize: 35,
        color: 'white'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'center'
    },
    input: {
        height: 50,
        width: '100%',
        borderRadius: 7,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingLeft: 10,
        fontSize: 15,
        justifyContent: 'center',
        marginBottom: 20
    },
    submit: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    submitText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    textFont: {
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5
    },
});