import React, { Component } from 'react';
import { Platform, View, Text } from 'react-native';
import firebase from 'firebase'
import firebaseConfig from '../../../keys/firebasekeys'
import LoadingGIF from '../../components/eventHandlers/LoadingGIF';
import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form, Item, Input, Label } from 'native-base';
//Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
var database = firebase.database();
export default class EditLiftTickets extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            title: "",
            timeOne: "",
            timeTwo: '',
            reguPrice: '',
            holliPrice: '',
            dataLoaded: true
        });

        this.updateDatabase.bind(this)
    }
    componentDidMount() {
        //this.getData()
        console.log('good things', this.props.navigation.state.params.properties)
        if (this.props.navigation.state.params.isEdit) {
            this.setState({ title: this.props.navigation.state.params.properties.title })
            this.setState({ timeOne: this.props.navigation.state.params.properties.timeOne })
            this.setState({ timeTwo: this.props.navigation.state.params.properties.timeTwo })
            this.setState({ reguPrice: this.props.navigation.state.params.properties.reguPrice })
        }
    }


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
        console.log('FINDER\n\n\nNow..', this.props.navigation.state.params.isEdit)
        this.props.navigation.state.params.isEdit ? this.EditLiftTickets() : this.updateDatabase()
    }
    EditLiftTickets = () => {
        console.log('entered the funciton\n\n\n', this.props.navigation.state.params.properties.pathReference)
        //props already has profile id
        firebase.auth().onAuthStateChanged((profile) => {
            let mountainAdminId = profile.uid
            firebase.database()
                .ref(`liftTicketDiscription/${mountainAdminId}/${this.props.navigation.state.params.properties.pathReference}`)
                .update({
                    title: this.state.title,
                    timeOne: this.state.timeOne,
                    timeTwo: this.state.timeTwo,
                    reguPrice: this.state.reguPrice,
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
                {this.state.dataLoaded ?
                    <Container>
                        <Header>
                        </Header>
                        <Content>
                            <Form>
                                <Item floatingLabel>
                                    <Label>Title{this.state.title ? `: ${this.state.title}` : ''}</Label>
                                    <Input onChangeText={(title) => this.setState({ title })} />
                                </Item>
                                <Item floatingLabel last>
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
                                </Item>
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