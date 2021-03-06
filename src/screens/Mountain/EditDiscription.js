import React, { Component } from 'react';
import { Platform, View, Text } from 'react-native';
import firebase from 'firebase'
import firebaseConfig from '../../../keys/firebasekeys'
import { Asset, AppLoading } from 'expo';
import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form, Item, Input, Label } from 'native-base';
//Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
var database = firebase.database();
var storage = firebase.app()
export default class EditDiscription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            demoninator:  this.props.navigation.state.params.data.demoninator ? this.props.navigation.state.params.data.demoninator : '3',
            numerator:  this.props.navigation.state.params.data.numerator ? this.props.navigation.state.params.data.numerator : '2',
            businessName: this.props.navigation.state.params.data.businessName ? this.props.navigation.state.params.data.businessName : 'Business Name',
            address:  this.props.navigation.state.params.data.address ? this.props.navigation.state.params.data.address : 'Address',
            snowCondition:  this.props.navigation.state.params.data.snowCondition ? this.props.navigation.state.params.data.snowCondition : 'Snow Condition',
            isReady: false
        };
        // this.setTheState = this.setTheState.bind(this)
    }
    componentWillMount() {

    }
    setTheState = () => {
        // this.setState({ businessName: })
        this.setState({ address: this.props.navigation.state.params.data.address })
        this.setState({ demoninator: this.props.navigation.state.params.data.demoninator })
        this.setState({ numerator: this.props.navigation.state.params.data.numerator })
        this.setState({ snowCondition: this.props.navigation.state.params.data.snowCondition })
        // this.props.autoHideSplash = false
    }
    updateDatabase() {

        if (this.props.isEdit) {
          
        }

        firebase.auth().onAuthStateChanged((profile) => {

            let mountainAdminId = profile.uid
            if (profile) {
                firebase.database().ref(`adminDiscription/${mountainAdminId}`).set({
                    businessName: this.state.businessName,
                    address: this.state.address,
                    snowCondition: this.state.snowCondition,
                    numerator: this.state.numerator,
                    demoninator: this.state.demoninator
                }).then(() => {
                    
                    this.props.navigation.navigate('MountainProfile', { EditDiscription: true })
                }).catch((error) => { console.log('error ', error) })

            }
        })
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this.setTheState}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }
        return (
            <Container>

                <Header>

                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>{this.state.businessName}</Label>
                            <Input onChangeText={(businessName) => this.setState({ businessName })} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>{this.state.address}</Label>
                            <Input onChangeText={(address) => this.setState({ address })} />
                        </Item>
                        <View style={{
                            width: '100%', height: 50,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 15 }}>Trail Availability</Text>
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Picker
                                mode="dropdown"
                                iosHeader="Your Header"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: Platform.OS === "ios" ? undefined : 120 }}
                                selectedValue={this.state.numerator}
                                onValueChange={(numerator) => this.setState({ numerator })}
                            >
                                <Picker.Item label="1" value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="5" value="5" />
                                <Picker.Item label="6" value="6" />
                                <Picker.Item label="7" value="7" />
                                <Picker.Item label="8" value="8" />
                                <Picker.Item label="9" value="9" />
                                <Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" />
                                <Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" />
                                <Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" />
                                <Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" />
                                <Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" />
                                <Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" />
                                <Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" />
                                <Picker.Item label="24" value="24" />
                                <Picker.Item label="25" value="25" />
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
                                <Picker.Item label="1" value="1" />
                                <Picker.Item label="2" value="2" />
                                <Picker.Item label="3" value="3" />
                                <Picker.Item label="4" value="4" />
                                <Picker.Item label="5" value="5" />
                                <Picker.Item label="6" value="6" />
                                <Picker.Item label="7" value="7" />
                                <Picker.Item label="8" value="8" />
                                <Picker.Item label="9" value="9" />
                                <Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" />
                                <Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" />
                                <Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" />
                                <Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" />
                                <Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" />
                                <Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" />
                                <Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" />
                                <Picker.Item label="24" value="24" />
                                <Picker.Item label="25" value="25" />
                            </Picker>
                        </View>
                        <Item floatingLabel last>
                            <Label>{this.state.snowCondition}</Label>
                            <Input onChangeText={(snowCondition) => this.setState({ snowCondition })} />
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