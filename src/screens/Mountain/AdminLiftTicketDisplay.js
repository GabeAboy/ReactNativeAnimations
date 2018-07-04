import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
const LiftTicket = ({ title }) => (
    <TouchableHighlight style={{
        height: 125,
        width: '100%',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor:'white'
    }}
        onPress={() => {

            console.log('asdasdasd!!!!!')
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
                    <Text>{title}</Text>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                }} >
                    <TouchableHighlight
                    onPress={()=>{
                        console.log('redirect to edit state loaded')
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
    </TouchableHighlight >
)
export default LiftTicket;