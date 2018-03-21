import React, { Component } from 'react';
import { PanResponder, View, Text, Animated } from 'react-native';

class Deck extends Component {

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const panResponder =  PanResponder.create({
            // Functions that will be called at different points of its lifecycle
            
            // Executed this funciton called when a tap on screen
                // Decides if we can move or not
            onStartShouldSetPanResponder: () => true,
            
            // Every time user drags the card this function is called
            onPanResponderMove: (event, gesture) => {
                position.setValue({x: gesture.dx, y: gesture.dy});

            },

            // Called anytime if the user lets go of the card
            onPanResponderRelease: () => {

            }
        });
        this.state = { panResponder, position };
    }
    renderCards(){
        return this.props.data.map(item => {
            return this.props.renderCard(item);
        })
    }
    render() {
        return(
            // <View>
            //     { this.renderCards() }
            // </View>
            <Animated.View 
                style = { this.state.position.getLayout()}
                {...this.state.panResponder.panHandlers}
            > 
                { this.renderCards() }
            </Animated.View>
        )
    }
}
export default Deck;