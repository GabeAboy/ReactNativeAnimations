import React, { Component } from 'react';
import { View, Text } from 'react-native';
const LiftTicket = ({ title }) => (
    <View style={{
        height: 125,
        width: '100%',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'gray'
    }}>
        <View style={{
            width: '100%',
            height: 40,
            paddingLeft: 5,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
        }}>
            <Text style = {{
                
            }}>{title}</Text>
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
                            borderLeftWidth:1,
                            borderLeftColor:'gray',
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
    </View >
)
export default LiftTicket;