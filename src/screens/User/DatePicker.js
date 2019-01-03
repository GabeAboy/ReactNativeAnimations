import DatePicker from 'react-native-date-ranges';
import React, { Component } from 'react';
import { Platform, View, Text, TextInput, Button } from 'react-native';
import firebase from 'firebase'
import dateFormatter from 'dateformat'
import NaviDrink from '../../components/NaviDrink'
import moment from 'moment';



//customButton usage...
export default class NewPicker extends React.Component {
    componentDidMount(){
        //Get current date
    }
    customButtonOnPress = () => {
        this.picker.onConfirm()
        //Pass date down through props
        //If I navigate here then it will start at button then picker, then return to button
        //Avoid the return to button
        const startDate = this.picker.state.startDate.format('L');
        const endDate = this.picker.state.endDate.format('L')
        this.props.navigation.navigate('MountainFinder', { navigation: this.props.navigation, skiDates: { startDate: startDate, endDate: endDate } })

    }
    render() {
        const {
            //Spread operator extracts all props and makes variable names matching props key val pair
            ...rest
        } = this.props;
        const customButton = (<Button title='hola' onPress={this.customButtonOnPress} style={{ container: { width: '80%', marginHorizontal: '3%' }, text: { fontSize: 20 } }} primary text={'送出'} />);
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <DatePicker
                    ref={(ref) => this.picker = ref}
                    {...rest}
                    style={{ width: 350, height: 45 }}
                    customStyles={{
                        placeholderText: { fontSize: 20 }, // placeHolder style
                        headerStyle: {backgroundColor:'black'},			// title container style
                        headerMarkTitle: {}, // title mark style 
                        headerDateTitle: {}, // title Date style
                        contentInput: {}, //content text container style
                        contentText: {}, //after selected text Style
                    }} // optional 
                    centerAlign // optional text will align center or not
                    allowFontScaling={false} // optional
                    //Should display current date using moment on didMount
                    placeholder={`${moment().format('LL')}`}
                    mode={'range'}
                    customButton={customButton}
                />
            </View>
        )
    }
} 