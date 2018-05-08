import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hamburger from 'react-native-hamburger';
import { Drawer } from 'native-base';
class Logo extends React.Component {
    render() {
        if (this.props.comp) {
            return (
                <Text style = {{paddingTop:15,
                                paddingLeft:5}}>{this.props.comp}</Text>
            )
        }
        else {
            return (
                <Image style={{ flex: 1, position: 'absolute', top: 10, left: 70, height: 30, width: 75 }} source={require('../../img/spot.png')}
                resizeMode='contain' />
            )
        }
    }
  }

export default class NaviBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }
    
    render() {
        const Delete = this.props.company;
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
                        <Logo comp = {Delete}/>
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
