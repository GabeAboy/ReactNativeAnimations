import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from 'firebase'
import firebaseConfig from '../../../keys/firebasekeys'
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
export default class FriendItem extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
    }
    render() {
        return (
            <TouchableHighlight style={{
                height: 125,
                width: '100%',
                marginBottom: 5,
                borderWidth: 1,
                borderColor: 'gray',
                backgroundColor: 'white'
            }}
                onPress={() => {
                    if (this.props.commerse) {
                        console.log('add ticket to cart')
                    }
                    else {
                        this.props.navigation.navigate('EditLiftTickets', {
                            properties: this.props,
                            pathReference: this.props.pathReference,
                            isEdit: true,
                            button: this.props.button
                        })
                    }
                }}
            >
                <View style={{ flex: 1 }}>
                    <View style={{
                        width: '100%',
                        height: 40,
                        flexDirection: 'row'
                    }}>

                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-start'
                        }} >
                            <Text>{this.props.title}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }} >
                            {
                                !this.props.commerse ?

                                    <TouchableHighlight
                                        onPress={() => {
                                            console.log('wrong state', this.props)
                                            firebase.database()
                                                .ref('/liftTicketDiscription/' + this.props.profile)
                                                .child(this.props.pathReference)
                                                .remove()

                                            console.log(`Item ${this.props.title} deleted`)
                                            this.props.button()
                                        }}
                                        style={{
                                            height: 20, width: 20,
                                            backgroundColor: 'red',
                                            borderRadius: 5,
                                            justifyContent: 'center',
                                            alignItems: 'center',

                                        }}>
                                        <Icon name="times" size={15} color="#CED0CE" />
                                    </TouchableHighlight>
                                    :
                                    null
                            }
                        </View>

                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                        }} >
                            <Text>Hours</Text>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center'
                                }}>
                                    <Text></Text>
                                    <Text> - </Text>
                                    <Text>asdasd</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text>asd102</Text>
                                    <Text> - </Text>
                                    <Text>asdasd</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                            }} >
                                <Text>Hours</Text>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}>
                                    <View style={{
                                        flex: 1,
                                        borderLeftWidth: 1,
                                        borderLeftColor: 'gray',
                                        justifyContent: 'center'
                                    }}>
                                        <Text>asd102</Text>
                                        <Text> - </Text>
                                        <Text>asdasd</Text>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text>asd102</Text>
                                        <Text> - </Text>
                                        <Text>asdasd</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}