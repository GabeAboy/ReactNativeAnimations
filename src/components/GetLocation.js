import React, { Component } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Title, Content, Button, Right, Body, Left, Picker, Form, Item, Input, Label } from 'native-base';
//TODO GET LOCATION IF location isn't on
import { Constants, Location, Permissions } from 'expo';
export default class NaviBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: false,
            address: '',
            input: '',
            clearInput: false
        }
    }
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
            alert("Enable location and try again.")
        }

        let location = await Location.getCurrentPositionAsync({});
        let cords = location.coords
        let address = await Location.reverseGeocodeAsync(cords);
        this.setState({ address });

        if (address) {
            this.props.navigation.navigate('MountainFinder',
                {
                    navigation: this.props.navigation,
                    address: address[0].postalCode
                })
        }
    };

    _getByAddressAsync = async () => {

        let location = await Location.geocodeAsync(this.state.input);
        let cords = location.coords
        let address = await Location
            .reverseGeocodeAsync(location[0]).catch((e) => {
                console.log(e)
            });
        this.setState({ address });
        if (address) {
            this.props.navigation.navigate('MountainFinder',
                {
                    navigation: this.props.navigation,
                    address: address[0].postalCode
                })
        }
    };

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
                            <TouchableHighlight
                                onPress={() => {
                                    this.props.navigation.goBack()
                                }}
                                style={{
                                    width: '15%', height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Icon
                                    name="arrow-left"
                                    size={20}
                                    color="#4286f4"
                                />
                            </TouchableHighlight>
                            <View style={{
                                width: '70%',
                                height: '100%',

                            }}>


                                <Form>
                                    <Item floatingLabel>
                                        <Label style={{
                                            color: '#4286f4',
                                            fontSize: 8
                                        }}>ENTER CITY STATE OR ZIP</Label>
                                        <Input
                                            onSubmitEditing={() => {
                                                this._getByAddressAsync()
                                            }}
                                            onChangeText={(input) => this.setState({ input })} />
                                    </Item>

                                </Form>


                            </View>
                            <TouchableHighlight
                                onPress={() => {

                                    this.setState({ input: 'ff' })

                                }}
                                style={{
                                    width: '15%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Icon
                                    name="times"
                                    size={35}
                                    color="#4286f4"
                                    style={{
                                    }}
                                />
                            </TouchableHighlight>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row'
                        }}>

                            <View style={{
                                flex: 2,
                                flexDirection: 'row'
                            }}>
                                <TouchableHighlight
                                    onPress={() => {
                                        this._getLocationAsync()
                                    }}
                                    style={{
                                        width: '15%', height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Icon
                                        name="compass"
                                        size={35}
                                        color="#4286f4"
                                        style={{
                                        }}
                                    />
                                </TouchableHighlight>
                                <View style={{
                                    width: '70%',
                                    height: '100%',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        marginLeft: 10
                                    }}>Get your location</Text>
                                </View>
                                <View
                                    style={{
                                        width: '15%',
                                        height: '100%',
                                    }}>

                                </View>
                            </View>
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
        flex: 5,
        alignItems: 'center'
    },
    diolog: {
        marginTop: 20,
        height: '25%',
        width: '90%',
        backgroundColor: 'white'
    }
}
