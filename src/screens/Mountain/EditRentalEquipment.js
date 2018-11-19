import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, TextInput } from 'react-native';
import firebase from 'firebase'
import firebaseConfig from '../../../keys/firebasekeys'
import LoadingGIF from '../../components/eventHandlers/LoadingGIF';
import NaviDrink from '../../components/NaviDrink'
import StarRating from 'react-native-star-rating';

import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form, Item, Input, Label } from 'native-base';
//Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
var database = firebase.database();
export default class EditRentalEquipment extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            title: "",
            brand: "",
            price: "",
            currency: "USD",
            sex: "Men",
            size: "",
            type: "",
            starCount: 3.5,
            dataLoaded: true
        });

        this.updateDatabase.bind(this)
    }
    componentDidMount() {
        //this.getData()
        // if (this.props.navigation.state.params.isEdit) {
        //     this.setState({ title: this.props.navigation.state.params.properties.title })
        //     this.setState({ timeOne: this.props.navigation.state.params.properties.brand })
        //     this.setState({ timeTwo: this.props.navigation.state.params.properties.price })
        //     this.setState({ reguPrice: this.props.navigation.state.params.properties.size })
        //     this.setState({ reguPrice: this.props.navigation.state.params.properties.type })
        //     this.setState({ reguPrice: this.props.navigation.state.params.properties.stars })
        // }
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    updateDatabase() {
        firebase.auth().onAuthStateChanged((profile) => {
            let mountainAdminId = profile.uid
            console.log(profile)
            if (profile) {
                firebase.database().ref(`RentalEquipment/${mountainAdminId}/${this.state.title}`).set({
                    title: this.state.title,
                    timeOne: this.state.timeOne,
                    timeTwo: this.state.timeTwo,
                    reguPrice: this.state.reguPrice,
                    holliPrice: this.state.holliPrice
                }).then(() => {
                    console.log('Successfuly updated LiftTicket database', this.props)
                    this.props.navigation.state.params.button()
                    this.props.navigation.navigate('MountainProfile')
                }).catch((error) => {
                    console.log('error ', error)
                })

            }
        })
    }
    routingFunction = () => {
        this.EditLiftTickets()
        // this.props.navigation.state.params.isEdit ? this.EditLiftTickets() : this.updateDatabase()
    }
    EditLiftTickets = () => {
        //props already has profile id
        firebase.auth().onAuthStateChanged((profile) => {
            let mountainAdminId = profile.uid
            firebase.database()
                .ref(`rentalEquipment/${mountainAdminId}/${this.state.title}`)
                .update({
                    title: this.state.title,
                    brand: this.state.brand,
                    price: this.state.price,
                    currency: this.state.currency,
                    sex: this.state.sex,
                    size: this.state.size,
                    type: this.state.type,
                    starCount: this.state.starCount,
                })
                .then((e) => {
                    console.log('fun', this.props.navigation.state.params)
                    this.props.navigation.state.params.button()
                    this.props.navigation.navigate('MountainProfile')
                })
                .catch((error) => { console.log('error ', error) })

        })

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {true ?
                    <Container style={{ flex: 1 }}>
                        <NaviDrink navigation={this.props.navigation} />
                        <Content style={{ flex: 1 }}>
                            <Form style={{ flex: 1 }}>


                                <Item floatingLabel last>
                                    <Label>Title</Label>
                                    <Input placeholder={this.props.title} onChangeText={(title) => this.setState({ title })} />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Brand</Label>
                                    <Input placeholder={this.props.brand} onChangeText={(brand) => this.setState({ brand })} />
                                </Item>
                                <View style={{ width: '100%', height: 100 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }} >
                                            <Text>Size</Text>
                                            <TextInput
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                keyboardType='email-address'
                                                keyboardAppearance='dark'
                                                underlineColorAndroid='transparent'
                                                style={styles.input}
                                                onChangeText={(size) => this.setState({ size })}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }} >
                                            <Picker
                                                mode="dropdown"
                                                iosHeader="Your Header"
                                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                style={{
                                                    width: Platform.OS === "ios" ? undefined :
                                                        100,
                                                    marginLeft: 5
                                                }}
                                                selectedValue={this.state.metric}
                                                onValueChange={
                                                    (metric) => {
                                                        this.setState({ metric: metric })
                                                    }
                                                }
                                            >
                                                <Picker.Item value='Men' label='Men' />
                                                <Picker.Item value='Woman' label='Woman' />
                                                <Picker.Item value='cm' label='cm' />
                                                <Picker.Item value='mm' label='mm' />
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }} >
                                            <Text>Price</Text>
                                            <TextInput
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                keyboardType='email-address'
                                                keyboardAppearance='dark'
                                                underlineColorAndroid='transparent'
                                                style={styles.input}
                                                onChangeText={(price) => this.setState({ price })}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }} >
                                            <Picker
                                                mode="dropdown"
                                                iosHeader="Your Header"
                                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                style={{
                                                    width: Platform.OS === "ios" ? undefined :
                                                        100,
                                                    marginLeft: 5
                                                }}
                                                selectedValue={this.state.currency}
                                                onValueChange={
                                                    (metric) => {
                                                        this.setState({ currency: metric })
                                                    }
                                                }
                                            >
                                                <Picker.Item value='EUR' label='EUR' />
                                                <Picker.Item value='USD' label='USD' />
                                            </Picker>
                                        </View>
                                    </View>

                                </View>


                                {/* <Input onChangeText={(title) => this.setState({ title })} /> */}
                                <View style={{ width: '100%', height: 100, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Label>Category</Label>

                                        <Picker
                                            mode="dropdown"
                                            iosHeader="Your Header"
                                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                                            style={{
                                                width: Platform.OS === "ios" ? undefined :
                                                    100,
                                                marginLeft: 5
                                            }}
                                            selectedValue='1'
                                            onValueChange={
                                                (metric) => {
                                                    this.setState(prevState => ({
                                                        height: {
                                                            ...prevState.height,
                                                            metric: metric
                                                        }
                                                    }))
                                                }
                                            }
                                        >
                                            <Picker.Item value='1' label='Ski' />
                                            <Picker.Item value='3' label='Snowboard' />
                                            <Picker.Item value='f' label='Boots' />
                                            <Picker.Item value='f' label='Poles' />
                                            <Picker.Item value='f' label='Helmet' />

                                        </Picker>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Label>Rating</Label>
                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={this.state.starCount}
                                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                                        />
                                    </View>
                                </View>
                                {/* <Item floatingLabel last>
                                    <Label>Time 1 {this.state.timeOne ? `: ${this.state.timeOne}` : ''}</Label>
                                    <Input placeholder={this.props.title} onChangeText={(timeOne) => this.setState({ timeOne })} />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Time 2 {this.state.timeTwo ? `: ${this.state.timeTwo}` : ''}</Label>
                                    <Input onChangeText={(timeTwo) => this.setState({ timeTwo })} />
                                </Item>

                                <Item floatingLabel last>
                                    <Label>Regular Price {this.state.reguPrice ? `: ${this.state.reguPrice}` : ''}</Label>
                                    <Input onChangeText={(reguPrice) => this.setState({ reguPrice })} />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Holliday Price {this.state.holliPrice ? `: ${this.state.holliPrice}` : ''}</Label>
                                    <Input onChangeText={(holliPrice) => this.setState({ holliPrice })} />
                                </Item> */}
                                {/* bundle and send to firebase  */}
                                <Button onPress={this.routingFunction.bind(this)} block success>
                                    <Text>Save Changes</Text>
                                </Button>
                            </Form>
                        </Content>
                    </Container>
                    :
                    <LoadingGIF />
                }
            </View>

        );
    }
}
const styles = StyleSheet.create({


    input: {
        height: 40,
        width: '60%',
        borderRadius: 7,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingLeft: 10,
        fontSize: 15,
        justifyContent: 'center',
        // marginBottom: 20
    }

});