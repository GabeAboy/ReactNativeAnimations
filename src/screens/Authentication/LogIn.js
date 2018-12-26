import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Text, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase'
import firebaseConfig from '../../../keys/firebasekeys'
// Container for initial launch
// UAC login/signUp
//     facebook passport
//     logo
// Set the configuration for your app
// TODO: Replace with your project's config object
// Login check if user exist, check if its admin, if it is check if email has been authenticated
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class Login extends Component {
    constructor(props) {
        super(props)
        const Credentials = [
            {
                email: 'testuser@gmail.com',
                password: 'testuser'
            },
            {//admin 1
                email: 'monica@gmail.com',
                password: '123456'
            },
            {//admin  2
                email: 'testadmin@gmail.com',
                password: 'testadmin'
            },
            {//admin 3
                email: 'sean@gmail.com',
                password: 'sean12'
            },
            {
                // 4
                email: 'connor@gmail.com',
                password: 'connor12'
            },
        ]
        this.state = (Credentials[0])
    }
    logInUser = (navigate) => {
        try {
            if (this.state.password.length < 6) {
                alert('Please enter more than 6 characters')
                return;
            }
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((result) => {
                    const currentUser = result.user.uid;
                    console.log("Logged in user ", currentUser)
                    firebase.database()
                        .ref('/permissions/' + currentUser)
                        .once('value')
                        .then((snapshot) => {
                            snapshot.val() ?
                                navigate('MountainProfile', { navigation: navigate })
                                : navigate('DatePicker', { navigation: navigate, MountainFinder: true })
                        });
                })
        } catch (error) {
            console.log(error.toString())
            navigate('DisplayError', { navigation, navigate })
        }
    }

    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View
                style={styles.container} >
                <View
                    style={{
                        width: '100%',
                        height: 24
                    }} />
                <View
                    style={styles.nav}>
                    <Icon
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}
                        name="angle-left"
                        size={35}
                        color="white" />
                </View>
                <View
                    style={styles.title}>
                    <Text
                        style={styles.titleFont}>
                        Log In
                    </Text>
                </View>
                <View
                    style={styles.body}>
                    <View
                        style={{ width: '90%' }}>
                        <Text
                            style={styles.textFont}>
                            Email or username
                        </Text>
                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='email-address'
                            keyboardAppearance='dark'
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </View>
                    <View style={{ width: '90%' }}>
                        <Text style={styles.textFont}>Password</Text>
                        <TextInput
                            autoCapitalize='none'
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </View>
                </View>
                <View
                    style={styles.submit}>
                    <TouchableHighlight
                        style={{
                            width: 180,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#2fb768',
                            borderRadius: 25,
                            marginBottom: 15
                        }}
                        onPress={() => {
                            this.logInUser(navigate)
                        }}>
                        <Text
                            style={styles.submitText}>
                            LOGIN
                            </Text>
                    </TouchableHighlight>
                    <Text
                        onPress={() => {
                            navigate('PasswordReset', { navigation: navigate })
                        }}
                        style={styles.textFont}>
                        Having trouble logging in? Get help here.
                    </Text>
                </View>
            </View>
        )
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#4286f4'
    },
    nav: {
        paddingTop: 20,
        paddingLeft: 30,
        width: '100%', height: 70
    },
    title: {
        alignItems: 'center'
    },
    body: {
        flex: 1, justifyContent: 'center', alignItems: 'center', alignItems: 'center'
    },
    submit: {
        flex: 1,
        justifyContent: 'flex-start',
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
    textFont: {
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5
    },
    titleFont: {
        fontWeight: 'bold',
        fontSize: 35,
        color: 'white'
    },
    submitText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    }
});