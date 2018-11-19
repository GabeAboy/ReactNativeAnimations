import React, { Component } from 'react';
import { Platform, View, Text, TextInput } from 'react-native';
import firebase from 'firebase'
import dateFormatter from 'dateformat'
import NaviDrink from '../../components/NaviDrink'
import ValidationComponent from 'react-native-form-validator';
import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form, Item, Input, Label, Segment } from 'native-base';
let ModeArray;
const maxAge = 70
const Months = 12
const MaxDays = 31
const ThisYear = new Date().getFullYear()

//TODO This component needs to have some restrictions on input and completed
// Everything must be filled in!

export default class AddProfile extends ValidationComponent {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            Birthday: {
                day: '',
                month: '',
                year: ''
            },
            //YYYY-MM-DD
            height: {
                size: '',
                metric: 'cm'
            },
            shoeSize: {
                size: '',
                metric: 'US'
            },
            weight: {
                amount: '',
                metric: 'lb'
            },
            validateInputs: {
                firstName: false,
                lastName: false,
                // birthday: false,
                height: false,
                shoe: false,
                weight: false,
                skiLevel: true
            },
            // This array changes upon form completion
            // First name and last name need to me more than two letters long
            formCompletionArray: [false, false, false, false, false, false, false, false, false],
            skiLevel: 'Beginner',
            dayArray: [...Array(MaxDays)],
            monthArray: [...Array(Months)],
            services: [...Array(maxAge)],
            selectedService: '1'

        };
    }
    componentDidMount() {
        console.log('hmmmm prop', this.props)
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
        this.birthdayParser()

    }

    birthdayParser() {
        var x = `${this.state.Birthday.year}:${this.state.Birthday.month}:${this.state.Birthday.day}`
        console.log('this is date ', x)
        this.setState({ formattedBirthday: x })
    }
    InfoProxy = async () => {
        let thingProfile = await this.getCurrentLoggedinUser()

        //this.getProfileInformation(thingProfile)
        this.getAdminDiscription(thingProfile)
        this.getLiftTickets(thingProfile)
        this.getProfileImage(thingProfile)
        this.setState({ dataLoaded: true })
    }
    // make this a promisP
    validateInputs = () => {
        console.log(this.props)
        //
        if (this.state.firstName.length > 2) this.state.validateInputs.firstName = true;
        if (this.state.lastName.length > 2) this.state.validateInputs.lastName = true;
        if (this.state.height.metric != '' && this.state.height.size != '') this.state.validateInputs.height = true;
        if (this.state.shoeSize.size != '' && this.state.shoeSize.metric != '') this.state.validateInputs.shoe = true;
        if (this.state.weight.amount != '' && this.state.weight.metric != '') this.state.validateInputs.weight = true;
        if (this.state.skiLevel != '') this.state.validateInputs.skiLevel = true;
        var doWeHaveValidInputs = () => {
            //Can update this funtion to give a list of all false characters to display, but not nec
            for (const key in this.state.validateInputs) {
                if (this.state.validateInputs[key] == false) {
                    console.log("Error on field ", key)
                    return false
                }
            }
            return true

        }
        if (doWeHaveValidInputs()) this.updateDatabase()
        else {
            alert("Fix Input Fields")
        }
        console.log('entered validate', doWeHaveValidInputs())
        var formattedBirthday = `${this.state.Birthday.year}:${this.state.Birthday.month}:${this.state.Birthday.day}`
        this.validate({
            // IS this seriously getting my state values 
            // Because I might want to reconsider my state object structure
            //firstName: { minlength: 2, maxlength: 20, required: true },
            //lastName: { minlength: 2, maxlength: 20, required: true },
            formattedBirthday: { date: 'YYYY:MM:DD' },
            // formattedHeight: { number: true },
            // formattedShoeSize: { number: true },
            // formattedWeight: { number: true }
            // I need to write date in this format
        });

        console.log("\n\n\nis valid? ", this.isFormValid())
        //The form has been submitted so I want to display the success error component

        //TODO if form has been submitted I need to display good or bad inputs from the validateInputs object
        this.setState({ hasFormBeenSubmitted: true })
        if (!this.isFormValid()) {
            alert("Your birth date is required.")
        }
        // alert(this.getErrorMessages())
        //  this.isFormValid()

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
                firebase.database().ref(`userProfiles/${userProfileId}/${state.firstName + state.lastName}`).set({
                    Birthday: {
                        day: state.Birthday.day,
                        month: state.Birthday.month,
                        year: state.Birthday.year
                    },
                    Name: {
                        first: state.firstName,
                        last: state.lastName
                    },
                    shoeSize: {
                        metric: state.shoeSize.metric,
                        size: state.shoeSize.size
                    },
                    weight: {
                        amount: state.weight.amount,
                        metric: state.weight.metric
                    },
                    height: {
                        size: state.height.size,
                        metric: state.height.metric
                    },
                    skiLevel: state.skiLevel,
                }).then(() => {
                    console.log('success', props)
                    props.navigation.state.params.button()
                    props.navigation.goBack()
                }).catch((error) => { console.log('error ', error) })

            } else {
                // No user is signed in.
                console.log('error')
            }
        });
    }

    render() {

        let serviceItems = this.state.services.map((s, i) => {
            return <Picker.Item key={i} value={ThisYear - i + 1} label={ThisYear - i + 1} />
        });
        return (
            <Container style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                <NaviDrink navigation={this.props.navigation} />
                <Content>
                    <Form>
                        {
                            !this.state.hasFormBeenSubmitted ?

                                <View style={{ flex: 1 }}>

                                    <Item floatingLabel>
                                        <Label>First Name</Label>
                                        <Input onChangeText={(firstName) => this.setState({ firstName })} />
                                    </Item>




                                    <Item floatingLabel>
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

                                                    var oldState = this.state;
                                                    oldState.Birthday.month = month
                                                    this.setState(oldState)

                                                        , () => {

                                                            this.birthdayParser()
                                                        }
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
                                                    var oldState = this.state;
                                                    oldState.Birthday.day = day
                                                    this.setState(oldState)
                                                    console.log('this state', this.state.Birthday)

                                                        , () => {
                                                            console.log("here is BDAY ", this.state.Birthday)
                                                            this.birthdayParser()
                                                        }
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
                                                    var oldState = this.state
                                                    oldState.Birthday.year = year
                                                    this.setState(oldState)
                                                        , () => {

                                                            this.birthdayParser()
                                                        }

                                                }
                                            }
                                        >

                                            {this.renderItems()}

                                        </Picker>

                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                                        <View style={{
                                            flex: 1, flexDirection: 'row', justifyContent: 'center',
                                            alignItems: 'center'
                                        }} >
                                            <Item style={{ width: '70%' }} floatingLabel>
                                                <Label>Height</Label>
                                                <Input
                                                    keyboardType='phone-pad'
                                                    onChangeText={
                                                        (size) => {
                                                            this.setState(prevState => ({
                                                                height: {
                                                                    ...prevState.height,
                                                                    size: size
                                                                }
                                                            }))
                                                        }
                                                    }
                                                />
                                            </Item>

                                            <Picker
                                                mode="dropdown"
                                                iosHeader="Your Header"
                                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                style={{
                                                    width: Platform.OS === "ios" ? undefined :
                                                        100,
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
                                                <Input
                                                    keyboardType='phone-pad'
                                                    onChangeText={
                                                        (size) => {
                                                            this.setState(prevState => ({
                                                                shoeSize: {
                                                                    ...prevState.shoeSize,
                                                                    size: size
                                                                }
                                                            }))
                                                        }
                                                    }
                                                />
                                            </Item>

                                            <Picker
                                                mode="dropdown"
                                                iosHeader="Your Header"
                                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                style={{
                                                    width: Platform.OS === "ios" ? undefined :
                                                        100,
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
                                                <Input
                                                    keyboardType='phone-pad'
                                                    onChangeText={
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
                                                        100,
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

                                    </View >

                                </View>

                                :

                                <View style={{ flex: 1 }}>

                                    {
                                        this.state.validateInputs.firstName ?
                                            <Item floatingLabel success>
                                                <Label>First Name</Label>
                                                <Input onChangeText={(firstName) => this.setState({ firstName })} />
                                                <Icon name='checkmark-circle' />
                                            </Item> :
                                            <Item floatingLabel error>
                                                <Label>First Name</Label>
                                                <Input onChangeText={(firstName) => this.setState({ firstName })} />
                                                <Icon name='close-circle' />
                                            </Item>
                                    }

                                    {
                                        this.state.validateInputs.lastName ?
                                            <Item floatingLabel success>
                                                <Label>Last Name</Label>
                                                <Input onChangeText={(lastName) => this.setState({ lastName })} />
                                                <Icon name='checkmark-circle' />
                                            </Item> :
                                            <Item floatingLabel error>
                                                <Label>Last Name</Label>
                                                <Input onChangeText={(lastName) => this.setState({ lastName })} />
                                                <Icon name='close-circle' />
                                            </Item>
                                    }

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
                                                    }, () => {

                                                        this.birthdayParser()
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
                                                    }, () => {

                                                        this.birthdayParser()
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
                                                    }, () => {

                                                        this.birthdayParser()
                                                    }))

                                                }
                                            }
                                        >

                                            {this.renderItems()}

                                        </Picker>

                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                                        <View style={{
                                            flex: 1, flexDirection: 'row', justifyContent: 'center',
                                            alignItems: 'center'
                                        }} >
                                            {
                                                this.state.validateInputs.height ?
                                                    <Item style={{ width: '70%' }} success floatingLabel>
                                                        <Label>Height</Label>
                                                        <Input
                                                            keyboardType='phone-pad'
                                                            onChangeText={
                                                                (size) => {
                                                                    this.setState(prevState => ({
                                                                        height: {
                                                                            ...prevState.height,
                                                                            size: size
                                                                        }
                                                                    }))
                                                                }
                                                            }
                                                        />
                                                        <Icon name='checkmark-circle' />
                                                    </Item>

                                                    :
                                                    <Item style={{ width: '70%' }} error floatingLabel>
                                                        <Label>Height</Label>
                                                        <Input
                                                            keyboardType='phone-pad'
                                                            onChangeText={
                                                                (size) => {
                                                                    this.setState(prevState => ({
                                                                        height: {
                                                                            ...prevState.height,
                                                                            size: size
                                                                        }
                                                                    }))
                                                                }
                                                            }
                                                        />
                                                        <Icon name='close-circle' />
                                                    </Item>
                                            }

                                            <Picker
                                                mode="dropdown"
                                                iosHeader="Your Header"
                                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                style={{
                                                    width: Platform.OS === "ios" ? undefined : 100,
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
                                            {
                                                this.state.validateInputs.shoeSize ?
                                                    <Item style={{ width: '70%' }} success floatingLabel>
                                                        <Label>Shoe Size</Label>
                                                        <Input
                                                            keyboardType='phone-pad'
                                                            onChangeText={
                                                                (size) => {
                                                                    this.setState(prevState => ({
                                                                        shoeSize: {
                                                                            ...prevState.shoeSize,
                                                                            size: size
                                                                        }
                                                                    }))
                                                                }
                                                            }
                                                        />
                                                        <Icon name='checkmark-circle' />
                                                    </Item>
                                                    : <Item style={{ width: '70%' }} error floatingLabel>
                                                        <Label>Shoe Size</Label>
                                                        <Input
                                                            keyboardType='phone-pad'
                                                            onChangeText={
                                                                (size) => {
                                                                    this.setState(prevState => ({
                                                                        shoeSize: {
                                                                            ...prevState.shoeSize,
                                                                            size: size
                                                                        }
                                                                    }))
                                                                }
                                                            }
                                                        />
                                                        <Icon name='close-circle' />
                                                    </Item>

                                            }

                                            <Picker
                                                mode="dropdown"
                                                iosHeader="Your Header"
                                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                style={{
                                                    width: Platform.OS === "ios" ? undefined :
                                                        100,
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
                                            {
                                                this.state.validateInputs.weight ?

                                                    <Item style={{ width: '70%' }} success floatingLabel>
                                                        <Label>Weight</Label>
                                                        <Input
                                                            keyboardType='phone-pad'
                                                            onChangeText={
                                                                (amount) => {
                                                                    this.setState(prevState => ({
                                                                        weight: {
                                                                            ...prevState.weight,
                                                                            amount: amount
                                                                        }
                                                                    }))
                                                                }

                                                            } />
                                                        <Icon name='checkmark-circle' />
                                                    </Item>
                                                    : <Item style={{ width: '70%' }} error floatingLabel>
                                                        <Label>Weight</Label>
                                                        <Input
                                                            keyboardType='phone-pad'
                                                            onChangeText={
                                                                (amount) => {
                                                                    this.setState(prevState => ({
                                                                        weight: {
                                                                            ...prevState.weight,
                                                                            amount: amount
                                                                        }
                                                                    }))
                                                                }
                                                            } />
                                                        <Icon name='close-circle' />
                                                    </Item>
                                            }



                                            <Picker
                                                mode="dropdown"
                                                iosHeader="Your Header"
                                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                style={{
                                                    width: Platform.OS === "ios" ? undefined :
                                                        100,
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

                                    </View >
                                </View>

                        }

                    </Form>
                </Content>
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
                <Button onPress={this.validateInputs.bind(this)} block success>
                    <Text>Save Changes</Text>
                </Button>
            </Container >
        );
    }
}