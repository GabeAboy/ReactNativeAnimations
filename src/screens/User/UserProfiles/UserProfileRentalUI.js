import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import GeoDistanceIcon from '../../../components/GeoDistanceIcon'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase'

export default class UserProfileRentalUI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photoURL: false,
            selected: false,
            selectedProfiles: [],
        }
        this.setActive.bind(this)

    }
    setActive() {
        console.log(this.state.selected)
    }
    render() {
        return (
            <TouchableHighlight
                onPress={() => {
                    this.setState({ selected: !this.state.selected })
                }}
                style={{
                    width: '100%', height: 60,
                }}>
                <View style={{
                    flex: 1, flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        flex: 2, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Image style={{ height: "70%", borderRadius: 40, width: "70%" }}
                            source={this.state.photoURL ? source = { uri: this.state.photoURL } : require('../../../../img/default-user.png')}
                            resizeMode='contain' />

                    </View>
                    <View style={{
                        flex: 6,
                        borderBottomColor: '#CED0CE',
                        borderBottomWidth: 1,


                    }}>

                        <View style={
                            {
                                flex: 2,
                                alignItems: 'center',
                                paddingLeft: 5,
                                flexDirection: 'row'
                            }
                        }>
                            <Text style={
                                {
                                    fontSize: 25
                                }
                            }>
                                {this.props.firstName + " " + this.props.lastName}
                            </Text>

                        </View>


                    </View>
                    <View style={{
                        flex: 1,
                        borderBottomColor: '#CED0CE',
                        borderBottomWidth: 1,


                    }}>

                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            {
                                this.state.selected ?
                                    <Icon name="check" size={35} color="green" />
                                    :
                                    <Icon name="times" size={35} color="red" />
                            }
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#4286f4'
    },
    titleText: {
        fontSize: 20
    },
    subText: {
        color: '#9a9ea5',
        fontSize: 15
    }
});