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

    getCardStyle(){

        return {
        ...this.state.position.getLayout(),
        transform: [ { rotate: '45deg' } ]
        }
    }

    renderCards(){
        return this.props.data.map((item, index) => {
            if( index === 0 ){
                return (
                    <Animated.View 
                    key = { item.id }
                    style = { this.getCardStyle() }
                    {...this.state.panResponder.panHandlers}
                > 
                    { this.props.renderCard(item) }
                </Animated.View>
                )
            }
            return this.props.renderCard(item);
        })
    }
    render() {
        return(
            <View>
                { this.renderCards() }
            </View>

        )
    }
}
export default Deck;