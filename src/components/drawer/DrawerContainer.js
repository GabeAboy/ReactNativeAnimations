import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DrawerHeader from './DrawerHeader'
import MenuButton from '../MenuButton'
import * as firebase from 'firebase'
export default class DrawerContainer extends Component {
    componentDidMount() {
        console.log('cmoutn', this.props)
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
                console.log('user', profile)
                this.setState = { user: profile }
            } else {
                // No user is signed in.
                console.log('fail')
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
                        console.log('s',this.state)
                    }>
                        <MenuButton onPress={() => {
                            console.log('asdasdasdasd')
                        }} icon='history' buttonName='History' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        console.log('hello world')
                        firebase.auth().signOut().then(() => {
                            // Sign-out successful.
                            console.log('success')
                            this.props.navigation.navigate('LandingPage')
                        }).catch(function (error) {
                            // An error happened.
                            console.log('error', error)
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