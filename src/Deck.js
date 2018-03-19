import React, { Component } from 'react';
import { PanResponder, View, Text, Animated } from 'react-native';

class Deck extends Component {
    constructor(props) {
        super(props);
        const panResponder =  PanResponder.create({
            // Functions that will be called at different points of its lifecycle
            
            // Executed this funciton called when a tap on screen
                // Decides if we can move or not
            onStartShouldSetPanResponder: () => true,
            
            // Every time user drags the card this function is called
            onPanResponderMove: (event, gesture) => {
                console.log('gesture', gesture)
            },

            // Called anytime if the user lets go of the card
            onPanResponderRelease: () => {
                console.log('RELEASED')
            }
        });
        this.state = { panResponder };
    }
    renderCards(){
        return this.props.data.map(item => {
            return this.props.renderCard(item);
        })
    }
    render() {
        return(
            <View {...this.state.panResponder.panHandlers}> 
                { this.renderCards() }
            </View>
        )
    }
}
export default Deck;