import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import NaviDrink from '../../components/NaviDrink'
import * as firebase from 'firebase'
import firebaseConfig from '../../../keys/firebasekeys'
// TODO: 
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();


export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            email: '',
            componentLoad: false
        })
    }

    static navigationOptions = {
        title: 'Welcome',
    };
    resetPassword() {
        
        firebase.auth().sendPasswordResetEmail(this.state.email).catch(e => { console.log('e', e) })
    }
    render() {
        return (
            <View style={styles.container} >
                <NaviDrink navigation={this.props.navigation} />
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 50,
                    }}>
                        <Text
                            style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                marginBottom: 10

                            }}>Password Reset</Text>
                        <Text style={{
                            width: '90%',
                            fontSize: 15,
                            letterSpacing: .5, lineHeight: 20, textAlign: 'center'
                        }}>Enter your <Text style={{ fontWeight: 'bold' }}>Skeasy email address</Text> that you used to register.
                             We'll send you an email with your account info and a link to reset your password</Text>
                    </View>
                    <View style={{ flex: 3 }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{
                                    fontSize: 15,
                                    letterSpacing: .5,
                                    fontWeight: 'bold'
                                }}>Email address</Text>
                                <TextInput
                                    style={{
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        width: '100%',
                                        height: 45,
                                        paddingLeft: 20,
                                        marginTop: 10,
                                        fontSize: 20
                                    }}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='email-address'
                                    keyboardAppearance='dark'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(email) => this.setState({ email })}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 2, alignItems: 'center' }}>
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
                                    this.resetPassword()
                                }}>
                                <Text
                                    style={styles.submitText}>
                                    SEND
                            </Text>
                            </TouchableHighlight>
                            <Text>If you still need help, then make a new account</Text>
                        </View >
                    </View>
                </View >
            </View >
        )
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'black'
    },
    submitText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    }
});