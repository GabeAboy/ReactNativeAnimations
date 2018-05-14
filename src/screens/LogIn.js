import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Video, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextCarousel from 'react-native-text-carousel';
import Button from '../components/Button';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
// Container for initial launch
// UAC login/signUp
//     facebook passport
//     logo
import * as firebase from 'firebase'
import firebaseConfig from '../../keys/firebasekeys'
// Container for initial launch
// UAC login/signUp
//     facebook passport
//     logo
 // Set the configuration for your app
  // TODO: Replace with your project's config object
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = ({
            email:'',
            password:''
        })
    }
    logInUser = (email,password)=>{
        try{
            if(this.state.password.length < 6){
                alert('Please enter more than 6 characters')
                return;
            }
            console.log('start')
            firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{
                console.log('user', user)
            })
            console.log('done')

        }catch(error){
            console.log(error.toString())
        }
    }
    componentDidMount() {
    }
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container} >
                <View style={{ width: '100%', height: 24 }} />
                <View style={styles.nav}>
                    <Icon onPress={() => {
                        this.props.navigation.goBack()
                    }} name="angle-left" size={35} color="white" />
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleFont}>Sign In</Text>
                </View>
                <View style={styles.body}>
                    <View style={{ width: '90%' }}>
                        <Text style={styles.textFont}>Email or username</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </View>
                    <View style={{ width: '90%' }}>
                        <Text style={styles.textFont}>Password</Text>
                        <TextInput
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
                        <Text onPress={() =>{
                           // navigate('MountainFinder', { navigation: navigate })
                           this.logInUser(this.state.email,this.state.password)
                            }
                        } style={styles.submitText}>
                            LOGIN
                        </Text>
                    </View>
                    <Text style={styles.textFont}>Having trouble logging in? Get help here.</Text>
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