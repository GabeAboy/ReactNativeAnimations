import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Video } from 'react-native';
import TextCarousel from 'react-native-text-carousel';
import * as firebase from 'firebase'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class tabTwo extends Component {
    constructor() {
        super();
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }
    componentDidUpdate() {
        console.log('update')
    }
    componentDidMount() {
        console.log('moiunt')
    }
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        return (
            <View style={styles.container} >

            </View>
        )
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    }
});