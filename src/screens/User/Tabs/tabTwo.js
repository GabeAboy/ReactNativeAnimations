import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Video } from 'react-native';
import TextCarousel from 'react-native-text-carousel';
import * as firebase from 'firebase'
import TicketFlatList from '../FlatList/LiftTicketFlatList'
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
        console.log('update', this.props)
    }
    componentDidMount() {
        console.log('mount', this.props)
    }
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        return (
            // <PricingCard
            //     color='#4f9deb'
            //     title='Free'
            //     price='$0'
            //     info={['1 User', 'Basic Support', 'All Core Features']}
            //     button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
            // />
            <View style={styles.container} >

                <TicketFlatList data={this.props.data} title='name' />
            </View>
            // updateFunction={this.button} profileId={this.props.userProfileId} navigate={this.props.navigation}
        )
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    }
});