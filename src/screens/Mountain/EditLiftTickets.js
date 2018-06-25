import React, { Component } from 'react';
import { Platform, View, Text } from 'react-native';
import firebase from 'firebase'
import firebaseConfig from '../../../keys/firebasekeys'
import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form, Item, Input, Label } from 'native-base';
//Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
var database = firebase.database();
export default class EditLiftTickets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            timeOne: "",
            timeTwo: '',
            reguPrice: '',
            holiPrice: ''
        };
    }

    //TODO: Componentdidmount to fill in the properties from database if they exist
    updateDatabase() {
        firebase.auth().onAuthStateChanged((profile) => {
            let mountainAdminId = profile.uid
            console.log(profile)
            if (profile) {
                firebase.database().ref(`liftTicketDiscription/${mountainAdminId}/${this.state.title}`).set({
                    title: this.state.title,
                    timeOne: this.state.timeOne,
                    timeTwo: this.state.timeTwo,
                    reguPrice: this.state.reguPrice,
                    holiPrice: this.state.holiPrice
                }).then(() => {
                    console.log('Successfuly updated LiftTicket database')
                    this.props.navigation.navigate('MountainProfile')
                }).catch((error) => {
                    console.log('error ', error)
                })

            }
        })
    }

    render() {
        return (
            <Container>
                <Header>
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Title</Label>
                            <Input onChangeText={(title) => this.setState({ title })} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Time 1</Label>
                            <Input onChangeText={(timeOne) => this.setState({ timeOne })} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Time 2</Label>
                            <Input onChangeText={(timeTwo) => this.setState({ timeTwo })} />
                        </Item>

                        <Item floatingLabel last>
                            <Label>Regular Price</Label>
                            <Input onChangeText={(reguPrice) => this.setState({ reguPrice })} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Holliday Price</Label>
                            <Input onChangeText={(holliPrice) => this.setState({ holliPrice })} />
                        </Item>
                        {/* bundle and send to firebase  */}
                        <Button onPress={this.updateDatabase.bind(this)} block success>
                            <Text>Save Changes</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}