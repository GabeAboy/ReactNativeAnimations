import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Video, TouchableOpacity } from 'react-native';
import TextCarousel from 'react-native-text-carousel';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class tabOne extends Component {
    constructor() {
        super();
        this.state = {
            ticketValue: 0,
            total: 100,
            price: 100
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
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.container} >
                    <View style={{
                        flex: 5,
                        // backgroundColor: 'white'
                        paddingLeft: 15,
                        justifyContent: 'center'
                    }}>
                        <Text style={{ fontSize: 25 }}>All day ski pass</Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold"
                        }}>${this.state.total}</Text>
                        <Text style={{ color: "#4286F4", paddingTop:5 }}>$100 PER DAY</Text>
                    </View>
                    <View style={{
                        flex: 3,
                        // backgroundColor: 'blue',
                        paddingRight: 15,
                        paddingBottom:20
                    }}>
                    <View style = {{
                        flex:4,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',

                    }}>
                        <TouchableOpacity onPress={() => {
                            this.state.ticketValue != 0 ?
                            this.setState({ ticketValue: this.state.ticketValue -= 1, total: this.state.total -= this.state.price }) :
                            null
                            console.log(this.state.ticketValue)
                        }} style={styles.circle}><Text style={{ fontSize: 40 }}>-</Text></TouchableOpacity>
                        <Text style={{ fontSize: 50 }}>{this.state.ticketValue}</Text>
                        <TouchableOpacity onPress={() => {
                            this.setState({ ticketValue: this.state.ticketValue += 1, total: this.state.total += this.state.price })
                        }} style={styles.circle}><Text style={styles.numFont}>+</Text></TouchableOpacity>

                        </View>
                        <TouchableOpacity 
                        onPress={()=>{
                            // Post to user cart
                            // Have cart component watch this field in Storage
                            if(this.state.ticketValue > 0){
                                console.log("Post")
                            }
                        }}
                        style={{
                            flex:1,
                            
                            backgroundColor: '#556073',
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                            <Text style = {{color:'white'}}>ADD TO CART</Text>
                        </TouchableOpacity>
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
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        height: 125,
        width: "90%",
        backgroundColor: 'white'
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 37,
        height: 37,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 18
    },
    numFont: {
        fontSize: 30
    }
});