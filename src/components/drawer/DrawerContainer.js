import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DrawerHeader from './DrawerHeader'
import MenuButton from '../MenuButton'
import * as firebase from 'firebase'
export default class DrawerContainer extends Component {
    componentDidMount() {
        this.getUserInfo()
    }
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }
    getUserInfo = () => {
        firebase.auth().onAuthStateChanged((profile) => {
            if (profile) {
                // User is signed in.
                this.setState = { user: profile }
            } else {
                // No user is signed in.
            }
        });
    }
    render() {
        return (
            <View style={styles.ball}>
                <DrawerHeader profile={this.state} />
                <View style={{ flex: 1, backgroundColor: '#222d3f' }}>

                    <MenuButton icon='wrench' buttonName='Settings' />

                    <TouchableOpacity onPress={
                        console.log()
                    }>
                        <MenuButton onPress={() => {
                        }} icon='history' buttonName='History' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        // ProfileDictionary
                        this.props.navigation.navigate('ProfileDictionary')
                    }}>
                        <MenuButton
                            icon='users' buttonName='profiles' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        firebase.auth().signOut().then(() => {
                            // Sign-out successful.
                            this.props.navigation.navigate('LandingPage')
                        }).catch(function (error) {
                            // An error happened.
                            console.log('error', JSON.stringify(error))
                        });
                    }}>
                        <MenuButton
                            icon='times' buttonName='Logout' />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = {
    ball: {
        flex: 1
    }
}