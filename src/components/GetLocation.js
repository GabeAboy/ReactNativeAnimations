import React, { Component } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Title, Content, Button, Right, Body, Left, Picker, Form, Item, Input, Label } from 'native-base';
export default class NaviBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: false,
            zipcode: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <View style={styles.box}>
                    <View style={styles.diolog}>
                        <View style={{
                            flex: 2,
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                width: '15%', height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Icon
                                    name="arrow-left"
                                    size={20}
                                    color="#4286f4"
                                />
                            </View>
                            <View style={{
                                width: '70%', height: '100%',

                            }}>


                                <Form>
                                    <Item floatingLabel>
                                        <Label style={{
                                            color:'#4286f4',
                                            fontSize: 8
                                        }}>ENTER CITY STATE OR ZIP</Label>
                                        <Input onChangeText={(zipcode) => this.setState({ zipcode })} />
                                    </Item>

                                </Form>


                            </View>
                            <View style={{
                                width: '15%', height: '100%',
                            }}></View>
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: 'black'
                        }}>
                            <View style={{}}></View>
                            <Text>Txt</Text>
                        </View>
                    </View>
                </View>

            </View >
        );
    }
}

const styles = {
    container: {
        flex: 1, backgroundColor: 'gray'
    },
    box: {
        flex: 6,
        alignItems: 'center'
    },
    diolog: {
        marginTop: 20,
        height: '25%',
        width: '90%',
        backgroundColor:'white'
    }
}
