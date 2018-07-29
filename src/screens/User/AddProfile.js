import React, { Component } from 'react';
import { Platform, View, Text } from 'react-native';
import firebase from 'firebase'
import NaviDrink from '../../components/NaviDrink'
import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form, Item, Input, Label } from 'native-base';
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
            firstName: "2",
            Birthday: {},
            size: {},
            shoeSize: {},
            weight: {},
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
        console.log(ThisYear)

    }
    updateDatabase() {
        /**
         * 
         * 
         */


        // firebase.auth().onAuthStateChanged((profile) => {
        //     console.log(profile.uid)
        //     let mountainAdminId = profile.uid
        //     if (profile) {
        //         firebase.database().ref(`adminDiscription/${mountainAdminId}`).set({
        //             businessName: this.state.businessName,
        //             address: this.state.address,
        //             snowCondition: this.state.snowCondition,
        //             numerator: this.state.numerator,
        //             demoninator: this.state.demoninator
        //         }).then(() => {
        //             console.log('success')
        //             this.props.navigation.navigate('MountainProfile')
        //         }).catch((error) => { console.log('error ', error) })

        //     }
        // })
    }

    render() {

        let serviceItems = this.state.services.map((s, i) => {
            return <Picker.Item key={i} value={ThisYear - i + 1} label={ThisYear - i + 1} />
        });
        return (
            <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
                <NaviDrink />
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>First Name</Label>
                            <Input onChangeText={(businessName) => this.setState({ businessName })} />
                        </Item>
                        <Item style={{ marginTop: 15 }} floatingLabel last>
                            <Label>Address</Label>
                            <Input onChangeText={(address) => this.setState({ address })} />
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
                                selectedValue={this.state.demoninator}
                                onValueChange={(demoninator) => this.setState({ demoninator })}
                            >

                                {this.renderDaysMonths(this.state.monthArray)}

                            </Picker>
                            <Text style={{ fontSize: 20 }}>/</Text>
                            <Picker
                                mode="dropdown"
                                iosHeader="Your Header"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: Platform.OS === "ios" ? undefined : 120 }}
                                selectedValue={this.state.numerator}
                                onValueChange={(numerator) => this.setState({ numerator })}
                            >
                                {this.renderDaysMonths(this.state.dayArray)}
                            </Picker>
                            <Text style={{ fontSize: 20 }}>/</Text>
                            <Picker
                                mode="dropdown"
                                iosHeader="Your Header"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: Platform.OS === "ios" ? undefined : 120 }}
                                selectedValue={this.state.demoninator}
                                onValueChange={(demoninator) => this.setState({ demoninator })}
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
                            <Label>First Name</Label>
                            <Input onChangeText={(businessName) => this.setState({ businessName })} />
                        </Item>
                        <Picker
                            mode="dropdown"
                            iosHeader="Your Header"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{
                                width: Platform.OS === "ios" ? undefined :
                                    50
                            }}
                            selectedValue={this.state.numerator}
                            onValueChange={(numerator) => this.setState({ numerator })}
                        >
                            <Picker.Item value='1' label='2' />
                            <Picker.Item value='3' label='d' />
                            <Picker.Item value='f' label='d' />
                        </Picker>
                    </View>
                    <View style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center'
                    }} >

                        <Item style={{ width: '70%' }} floatingLabel>
                            <Label>First Name</Label>
                            <Input onChangeText={(businessName) => this.setState({ businessName })} />
                        </Item>
                        <Picker
                            mode="dropdown"
                            iosHeader="Your Header"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{
                                width: Platform.OS === "ios" ? undefined :
                                    50
                            }}
                            selectedValue={this.state.numerator}
                            onValueChange={(numerator) => this.setState({ numerator })}
                        >
                            <Picker.Item value='cm' label='2' />
                            <Picker.Item value='feet' label='d' />
                            <Picker.Item value='f' label='d' />
                        </Picker>
                    </View>
                    <View style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center'
                    }} >

                        <Item style={{ width: '70%' }} floatingLabel>
                            <Label>First Name</Label>
                            <Input onChangeText={(businessName) => this.setState({ businessName })} />
                        </Item>
                        <Picker
                            mode="dropdown"
                            iosHeader="Your Header"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{
                                width: Platform.OS === "ios" ? undefined :
                                    50
                            }}
                            selectedValue={this.state.numerator}
                            onValueChange={(numerator) => this.setState({ numerator })}
                        >
                            <Picker.Item value='1' label='2' />
                            <Picker.Item value='3' label='d' />
                            <Picker.Item value='f' label='d' />
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
                    selectedValue={this.state.numerator}
                    onValueChange={(numerator) => this.setState({ numerator })}
                >
                    <Picker.Item value='1' label='2' />
                    <Picker.Item value='3' label='d' />
                    <Picker.Item value='f' label='d' />
                </Picker>
                <Button onPress={this.updateDatabase.bind(this)} block success>
                    <Text>Save Changes</Text>
                </Button>
            </Container >
        );
    }
}