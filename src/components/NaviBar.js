import React, { Component } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hamburger from 'react-native-hamburger';
import { Drawer } from 'native-base';

export default class NaviBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }
    componentDidMount(){
    }

    render() {
        return (
            <View style={styles.header}>

                <View style={{
                    flex: 3,
                    flexDirection: 'row'
                }}>
                    <View style={styles.burgerKing}>
                        <View style={{
                            paddingTop: 8, paddingLeft: 20
                        }}>
                            <Hamburger active={this.state.active}
                                type='spinCross'
                                color='black'
                                onPress={() => {
                                    this.setState({ active: !this.state.active })
                                    this.props.toggleDrawer()
                                }} />
                        </View>
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
                                            console.log('thissdasd',this.props)
                                            //navigate to new. this should be shared component
                                            this.props.navigation.navigate('GetLocation', { navigation: this.props.navigation })
                                        }
                                    }
                                    style={{
                                        flex: 1,
                                    }} >
                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <View style={{
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-end',
                                            flexDirection: 'row',
                                            height: '100%',
                                            width: '100%',
                                        }} >

                                            <Icon style={{
                                                marginBottom: 5,
                                                marginLeft: 5
                                            }} name="map-marker" size={20} color="white" />
                                            <Text>{this.props.location}</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>


                        }
                    </View>

                    <View style={{
                        flex: 1, alignItems: 'flex-end', justifyContent: 'center'
                    }}>
                        <View style={{
                            height: '100%', width: 70, paddingTop: 14
                        }}>
                            <Icon style={{ marginLeft: 20 }} name="shopping-cart" size={25} color="black" />
                        </View>
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
        flex: 1, justifyContent: 'flex-start', flexDirection: 'row'
    },
    header: {
        height: 80, backgroundColor: '#4286f4', paddingTop: 30, paddingBottom: 10
    },
    font: {
        marginLeft: 25,
        fontSize: 45,
        color: 'black',
    }
}
