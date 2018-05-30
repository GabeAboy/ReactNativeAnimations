import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Video, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextCarousel from 'react-native-text-carousel';
import Button from '../components/Button';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import * as firebase from 'firebase'
import firebaseConfig from '../../keys/firebasekeys'
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class MountainProfile extends Component {
    constructor(props){
        super(props)
        this.state = ({
        })
    }
    componentDidMount() {
        console.log('Mountain Profile')
    }
    static navigationOptions = {
        title: 'MountainProfile',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container} >
                <Text>You made it to admin</Text>
            </View>
        )
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#4286f4'
    }
});