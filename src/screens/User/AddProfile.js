import React, { Component } from 'react';
import { Platform, View, Text } from 'react-native';
import firebase from 'firebase'
import NaviDrink from '../../components/NaviDrink'
import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form, Item, Input, Label, Segment } from 'native-base';
//Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form
let ModeArray;
const maxAge = 70
const Months = 12
const MaxDays = 31
const ThisYear = new Date().getFullYear()

export default class AddProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: '',
            Birthday: {
                day: '',
                month: '',
                year: ''
            },
            height: {
                size: '',
                metric: ''
            },
            shoeSize: {
                size: '',
                metric: ''
            },
            weight: {
                amount: '',
                metric: ''
            },
            skiLevel: '',
            dayArray: [...Array(MaxDays)],
            monthArray: [...Array(Months)],
            services: [...Array(maxAge)],
            selectedService: '1'

        };
    }
    renderItems() {

        return this.state.services.map((s, i) => {
            return <Picker.Item key={i} value={`${ThisYear - (i + 1)}`} label={`${ThisYear - (i + 1)}`} />
        });
    }
    renderDaysMonths(number) {
        return number.map((s, i) => {
            return <Picker.Item key={i} value={`${(i + 1)}`} label={`${(i + 1)}`} />
        });
    }
    componentDidMount() {

    }
    updateDatabase() {
        let state = this.state
        let props = this.props
        /**
         * 
         * 
         */
        firebase.auth().onAuthStateChanged(function (profile) {
            if (profile) {
                // User is signed in.
                let userProfileId = profile.uid
                firebase.database().ref(`userProfiles/${userProfileId}/${state.firstName+state.lastName}`).set({
                    Birthday: {
                        day: state.Birthday.day,
                        month: state.Birthday.month,
                        year: state.Birthday.year
                    },
                    Name: {
                        first: state.firstName,
                        last: state.lastName
                    },
                    shoeSize:{
                        metric:state.shoeSize.metric,
                        size:state.shoeSize.size
                    },
                    weight:{
                        amount:state.weight.amount,
                        metric:state.weight.metric
                    },
                    height:{
                        size:state.height.size,
                        metric:state.height.metric
                    },
                    skiLevel: state.skiLevel,
                }).then(() => {
                    console.log('success')

                    props.navigation.goBack()
                }).catch((error) => { console.log('error ', error) })

            } else {
                console.log('error')
                // No user is signed in.
            }
        });
    }

    render() {

        let serviceItems = this.state.services.map((s, i) => {
            return <Picker.Item key={i} value={ThisYear - i + 1} label={ThisYear - i + 1} />
        });
        return (
            <Container style={{ justifyContent: 'center', alignItems: 'center',flex:1 }}>
                <NaviDrink />
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>First Name</Label>
                            <Input onChangeText={(firstName) => this.setState({ firstName })} />
                        </Item>
                        <Item style={{ marginTop: 15 }} floatingLabel last>
                            <Label>Last Name</Label>
                            <Input onChangeText={(lastName) => this.setState({ lastName })} />
                        </Item>

                        <View style={{
                            width: '100%', height: 50,
                            justifyContent: 'center',
                            alignItems: 'center', marginTop: 20
                        }}>
                            <Text style={{ fontSize: 15 }}>Birthday</Text>
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>

                            <Picker
                                mode="dropdown"
                                iosHeader="Your Header"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: Platform.OS === "ios" ? undefined : 120 }}
                                selectedValue={this.state.Birthday.month}
                                onValueChange={
                                    (month) => {
                                        this.setState(prevState => ({
                                            Birthday: {
                                                ...prevState.Birthday,
                                                month: month
                                            }
                                        }))
                                    }
                                }
                            >

                                {this.renderDaysMonths(this.state.monthArray)}

                            </Picker>
                            <Text style={{ fontSize: 20 }}>/</Text>
                            <Picker
                                mode="dropdown"
                                iosHeader="Your Header"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: Platform.OS === "ios" ? undefined : 120 }}
                                selectedValue={this.state.Birthday.day}
                                onValueChange={
                                    (day) => {
                                        this.setState(prevState => ({
                                            Birthday: {
                                                ...prevState.Birthday,
                                                day: day
                                            }
                                        }))
                                    }
                                }
                            >
                                {this.renderDaysMonths(this.state.dayArray)}
                            </Picker>
                            <Text style={{ fontSize: 20 }}>/</Text>
                            <Picker
                                mode="dropdown"
                                iosHeader="Your Header"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: Platform.OS === "ios" ? undefined : 120 }}
                                selectedValue={this.state.Birthday.year}
                                onValueChange={
                                    (year) => {
                                        this.setState(prevState => ({
                                            Birthday: {
                                                ...prevState.Birthday,
                                                year: year
                                            }
                                        }))
                                    }
                                }
                            >

                                {this.renderItems()}

                            </Picker>

                        </View>

                        {/* bundle and send to firebase  */}
                    </Form>
                </Content>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <View style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center'
                    }} >

                        <Item style={{ width: '70%' }} floatingLabel>
                            <Label>Height</Label>
                            <Input onChangeText={
                                (size) => {
                                    this.setState(prevState => ({
                                        height: {
                                            ...prevState.height,
                                            size: size
                                        }
                                    }))
                                }
                            } />
                        </Item>
                        <Picker
                            mode="dropdown"
                            iosHeader="Your Header"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{
                                width: Platform.OS === "ios" ? undefined :
                                    70,
                                marginLeft: 5
                            }}
                            selectedValue={this.state.height.metric}
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
                            <Picker.Item value='1' label='cm' />
                            <Picker.Item value='3' label='m' />
                            <Picker.Item value='f' label='ft' />
                        </Picker>
                    </View>
                    <View style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center'
                    }} >

                        <Item style={{ width: '70%' }} floatingLabel>
                            <Label>Shoe Size</Label>
                            <Input onChangeText={
                                (size) => {
                                    this.setState(prevState => ({
                                        shoeSize: {
                                            ...prevState.shoeSize,
                                            size: size
                                        }
                                    }))
                                }
                            } />
                        </Item>
                        <Picker
                            mode="dropdown"
                            iosHeader="Your Header"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{
                                width: Platform.OS === "ios" ? undefined :
                                    70,
                                marginLeft: 5
                            }}
                            selectedValue={this.state.shoeSize.metric}
                            onValueChange={
                                (metric) => {
                                    this.setState(prevState => ({
                                        shoeSize: {
                                            ...prevState.shoeSize,
                                            metric: metric
                                        }
                                    }))
                                }
                            }
                        >
                            <Picker.Item value='US' label='US' />
                            <Picker.Item value='EU' label='EU' />
                            <Picker.Item value='AS' label='AS' />
                        </Picker>
                    </View>
                    <View style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center'
                    }} >

                        <Item style={{ width: '70%' }} floatingLabel>
                            <Label>Weight</Label>
                            <Input onChangeText={
                                (amount) => {
                                    this.setState(prevState => ({
                                        weight: {
                                            ...prevState.weight,
                                            amount: amount
                                        }
                                    }))
                                }
                            } />
                        </Item>
                        <Picker
                            mode="dropdown"
                            iosHeader="Your Header"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{
                                width: Platform.OS === "ios" ? undefined :
                                    70,
                                marginLeft: 5
                            }}
                            selectedValue={this.state.weight.metric}
                            onValueChange={
                                (metric) => {
                                    this.setState(prevState => ({
                                        weight: {
                                            ...prevState.weight,
                                            metric: metric
                                        }
                                    }))
                                }
                            }
                        >
                            <Picker.Item value='lb' label='lb' />
                            <Picker.Item value='kg' label='kg' />
                            <Picker.Item value='g' label='g' />
                        </Picker>
                    </View>

                </View>
                <Picker
                    mode="dropdown"
                    iosHeader="Your Header"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    style={{
                        width: Platform.OS === "ios" ? undefined :
                            '80%'
                    }}
                    selectedValue={this.state.skiLevel}
                    onValueChange={(skiLevel) => this.setState({ skiLevel })}
                >
                    <Picker.Item value='Beginner' label='Beginner' />
                    <Picker.Item value='Intermediate' label='Intermediate' />
                    <Picker.Item value='Expert' label='Expert' />
                </Picker>
                <Button onPress={this.updateDatabase.bind(this)} block success>
                    <Text>Save Changes</Text>
                </Button>
            </Container >
        );
    }
}