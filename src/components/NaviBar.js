import React, { Component } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hamburger from 'react-native-hamburger';
import { Drawer } from 'native-base';

export default class NaviBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: false,
            skiDates: ""
        }
    }
    //TODO Checkout should not display a circle until an item has been added
    //Should disapear when there aren't any items in the shopping cart
    componentDidMount() {
        console.log('POPS', this.props)
        this.setState({
            skiDates: `${this.props.skiDates.startDate} → ${this.props.skiDates.endDate}`
        })
        // else {
        //     this.setState({
        //         skiDates: `${this.props.skiDates.startDate} → ${this.props.skiDates.endDate}`
        //     })
        // }
    }

    render() {
        return (
            <View style={styles.header}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Hamburger active={this.state.active}
                        type='spinCross'
                        color='black'
                        onPress={() => {
                            this.setState({ active: !this.state.active })
                            this.props.toggleDrawer()
                        }} />

                    {
                        this.props.company ?
                            <View>
                                <Image style={{ flex: 1, position: 'absolute', top: 10, left: 70, height: 30, width: 75 }}
                                    source={{ uri: this.props.picture }}
                                    resizeMode='contain' />

                                <Text style={{
                                    paddingTop: 15,
                                    paddingLeft: 5
                                }}>{this.props.company}</Text>

                            </View>
                            :
                            <TouchableHighlight
                                onPress={
                                    () => {
                                        this.props.navigation.navigate('GetLocation', { navigation: this.props.navigation })
                                    }
                                }
                                style={{
                                    flex: 1, justifyContent: 'center'
                                }} >

                                <View style={{
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    height: '100%',
                                    width: '100%',
                                }} >

                                    <Icon style={{
                                        marginBottom: 5,
                                        marginLeft: 5
                                    }} name="map-marker" size={27} color="white" />
                                    <Text>{this.props.location}</Text>
                                </View>
                            </TouchableHighlight>


                    }
                </View>
                <TouchableHighlight
                    onPress={() => {
                        this.props.navigation.navigate('DatePicker', { navigation: this.props.navigation, MountainFinder: false })
                    }}
                    style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{this.state.skiDates}</Text>
                </TouchableHighlight>
                <View style={{
                    flex: 1, alignItems: 'flex-end', justifyContent: 'center',
                }}>
                    <View style={{
                        height: '100%', width: 70, justifyContent: 'center', alignItems: 'center', position: 'absolute',
                    }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 18, width: 18, borderRadius: 9, zIndex: 2, position: 'absolute', top: '0%', left: '50%', backgroundColor: 'white' }} >
                            <Text style={{ fontSize: 10 }}>{this.props.items_In_Checkout}</Text>
                        </View>
                        <Icon style={{ zIndex: 1 }} name="shopping-cart" size={32} color="black" />
                    </View>
                </View>

            </View >


        );
    }
}


const styles = {
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    burgerKing: {
        flex: 1, justifyContent: 'flex-start', flexDirection: 'row',
    },
    header: {
        height: 80, backgroundColor: '#4286f4', paddingTop: 30, paddingBottom: 10, flexDirection: 'row'
    },
    font: {
        marginLeft: 25,
        fontSize: 45,
        color: 'black',
    }
}
