import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import { Container, Header, Icon, Title, Content, Right, Body, Left, Picker, Form } from "native-base";
import * as firebase from 'firebase'
import firebaseConfig from '../../../keys/firebasekeys'

import LoadingGIF from '../../components/eventHandlers/LoadingGIF'
import NaviDrink from '../../components/NaviDrink'

// Get a reference to the database service
var database = firebase.database();

/*SUCCESS CRITERIA
    1.FORM DESIGN
        a. ONCHANGE change the state post the state  
    2.POST TO FIREBASE

EPIC
    1.EMAIL AUTHENTICATION
*/
// Mountains register with email only
// Information everymountain should have as soon as they registered
// Email : to activate account address needs to be confirmed
// Password : confirm password use success components when information is valid
// Address
// Country
// Zipcode regular expression for error handling
// Business Title

// When account successfully created route to confirm email
// address page that takes user to administration page
//Not MVP
// Are you a business or a merchant?
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class MountainRegistration extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            email: '',
            password: '',
            zipcode: '',
            phonenumber: '',
            componentLoad: false
        })
    }
    signUpUser = (email, password) => {
 
        try {
            if (this.state.password.length < 6) {
                alert('Please enter more than 6 characters')
                return;
            }
            this.setState({ componentLoad: true })
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(result => {
                    const mountainUserId = result.user.uid;
                    if (result.user.uid) {
                        firebase.database().ref(`users/${mountainUserId}`).set({
                            zipcode: this.state.zipcode,
                            phonenumber: this.state.phonenumber
                        })
                        firebase.database().ref(`permissions/${mountainUserId}`).set({
                            merchant: true,
                        })
                    }
                }).then(result => {
                 
                    var user = firebase.auth().currentUser;

                    user.sendEmailVerification().then(function () {
                        // Email sent.
                 
                    }).catch(function (error) {
                        // An error happened.
                    });
                    this.setState({ componentLoad: false })
                    firebase.auth().signOut()
                }).then(() => {
                   
                    this.props.navigation.navigate('LogIn', { navigation: this.props.navigation })
                }).catch((error) => {
                    
                    this.setState({ componentLoad: false })
                    this.props.navigation.navigate('DisplayError', { navigation: this.props.navigation })

                })
        } catch (error) {
            this.setState({ componentLoad: false })
           
            navigate('DisplayError', { navigation: navigate })
        }
    }


    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (

            <View style={styles.container} >
                {
                    this.state.componentLoad ? <LoadingGIF /> :
                        <View style={{ flex: 1 }}>
                            <NaviDrink navigate={this.props.navigation} />
                            <View style={styles.title}>
                                <Text style={styles.titleFont}>Partnership Registration</Text>
                            </View>
                            <View style={styles.body}>
                                <View style={{ width: '90%' }}>
                                    <Text style={styles.textFont}>Email or username</Text>
                                    <TextInput
                                        underlineColorAndroid='transparent'
                                        style={styles.input}
                                        onChangeText={(email) => this.setState({ email })}
                                    />
                                </View>
                                <View style={{ width: '90%' }}>
                                    <Text style={styles.textFont}>Password</Text>
                                    <TextInput
                                        underlineColorAndroid='transparent'
                                        style={styles.input}

                                        onChangeText={(password) => this.setState({ password })}
                                    />
                                </View>
                                <View style={{ width: '90%' }}>
                                    <Text style={styles.textFont}>Zip code</Text>
                                    <TextInput
                                        underlineColorAndroid='transparent'
                                        style={styles.input}

                                        onChangeText={(zipcode) => this.setState({ zipcode })}
                                    />
                                </View>
                                <View style={{ width: '90%' }}>
                                    <Text style={styles.textFont}>Phone number</Text>
                                    <TextInput
                                        underlineColorAndroid='transparent'
                                        style={styles.input}

                                        onChangeText={(phonenumber) => this.setState({ phonenumber })}
                                    />
                                    <View style={styles.container}>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.submit}>
                                <View style={{
                                    width: 180,
                                    height: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center', backgroundColor: 'grey', opacity: .5,
                                    borderRadius: 25, marginBottom: 15
                                }}>
                                    <TouchableHighlight onPress={() => this.signUpUser(this.state.email, this.state.password)}>
                                        <Text style={styles.submitText}>Next</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                }
            </View>
            //navigate('Route to administration page', { navigation: navigate })}
        )
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#4286f4'
    },

    title: {
        alignItems: 'center', flex: 1
    },
    textFont: {
        fontWeight: 'bold',
        color: 'white'
    },
    body: {
        flex: 4, justifyContent: 'center', alignItems: 'center', alignItems: 'center'
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
    titleFont: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white'
    },
    submitText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    }
});