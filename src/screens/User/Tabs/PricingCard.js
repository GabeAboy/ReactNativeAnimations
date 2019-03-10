import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Video, TouchableOpacity } from 'react-native';
import TextCarousel from 'react-native-text-carousel';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class tabOne extends Component {
    constructor() {
        super();
        this.state = {
            ticketValue: 1,
            total: 100,
            price:100
        }
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
            <View style = {{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
            <View style={styles.container} >
                <View style={{
                    flex: 5,
                    // backgroundColor: 'white'
                }}>
                    <Text >TITLE</Text>
                    <Text style={{
                        fontWeight: "bold"
                    }}>${this.state.total}</Text>
                    <Text>$100 Per Day</Text>
                </View>
                <View style={{
                    flex: 2,

                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                    <TouchableOpacity onPress={() => {
                        this.state.ticketValue != 0 ?
                            this.setState({ ticketValue: this.state.ticketValue -= 1, total:this.state.total-=this.state.price }) :
                            null
                        console.log(this.state.ticketValue)
                    }} style={styles.circle}><Text style={styles.numFont}>-</Text></TouchableOpacity>
                    <Text>{this.state.ticketValue}</Text>
                    <TouchableOpacity onPress={() => {
                        this.setState({ ticketValue: this.state.ticketValue += 1, total:this.state.total+=this.state.price })
                    }} style={styles.circle}><Text>+</Text></TouchableOpacity>
                </View>
            </View>
            </View>
        )
    }
};


const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        
        elevation: 17,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom:10,
        height: 125,
        width: "90%",
        backgroundColor:'white'
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 25,
        height: 25,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 12
    },
    numFont: {
        fontSize: 30
    }
});