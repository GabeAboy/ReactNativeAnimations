import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Video, TextInput, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextCarousel from 'react-native-text-carousel';
import Button from '../components/Button';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import * as firebase from 'firebase'
import NaviDrink from '../components/NaviDrink'
import firebaseConfig from '../../keys/firebasekeys'
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
            password: ''
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
            firebase.auth().createUserWithEmailAndPassword(email, password)

        } catch (error) {
            console.log(error.toString())
        }
    }
    logIn = (email, password) => {
        console.log(email, password)
    }

    componentDidMount() {
        console.log('Entered SignUp', this.props)

    }
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container} >
                <View style={{ width: '100%', height: 24 }} />
                <NaviDrink navigate = {this.props.navigation}/>
                <View style={styles.title}>
                    <Text style={styles.titleFont}>Sign Up</Text>
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
                </View>
                <View style={styles.submit}>
                    <View style={{
                        width: 180,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center', backgroundColor: 'grey', opacity: .5,
                        borderRadius: 25, marginBottom: 15
                    }}>
                        <Text onPress={() => this.signUpUser(this.state.email, this.state.password)}
                            //navigate('LiftsNearBy', { navigation: navigate })}
                            style={styles.submitText}>Next</Text>
                    </View>
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