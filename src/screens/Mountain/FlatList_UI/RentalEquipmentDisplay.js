import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from 'firebase'
import firebaseConfig from '../../../../keys/firebasekeys'

import StarRating from 'react-native-star-rating'
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
var image;
export default class RentalEquipmentDisplay extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {

    }
    getImage() {
        var cat = this.props.category
        switch (cat) {
            case 'Boot':
                return require('../../../../img/rentalImages/ski_boot.png')
                break;
            case 'Ski':
                return require('../../../../img/rentalImages/ski.png')
                break;
            case 'Pole':
                return require('../../../../img/rentalImages/pole.png')
                break
            case 'Snowboard':
                return require('../../../../img/rentalImages/snowboard.png')
                break
            case 'Helmet':
                return require('../../../../img/rentalImages/helmet.png')
                break
            default:
                return require('../../../../img/rentalImages/snowboard_boot.png')
        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TouchableHighlight style={{
                    height: 125,
                    width: '100%',
                    marginBottom: 5,
                    borderWidth: 1,
                    borderColor: 'gray',
                    backgroundColor: 'white',
                }}
                    onPress={() => {
                        this.props.navigation.navigate('EditRentalEquipment', {
                            properties: this.props,
                            pathReference: this.props.pathReference,
                            isEdit: true,
                            button: this.props.button
                        })
                    }}
                >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'space-around' }}>
                            <Image style={{ height: "60%", borderRadius: 40, width: "60%", paddingTop: 5 }}
                                source={this.getImage()}
                                resizeMode='contain' />
                            {/* For the image needs tomake if statements to see what category is */}
                            <StarRating
                                style={{ witdh: 10, height: 10 }}
                                disabled={true}
                                maxStars={5}
                                rating={this.props.starCount}
                                starSize={25}
                                fullStarColor={'#4286f4'}
                            />
                        </View>
                        <View style={{ flex: 4 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'space-between', justifyContent: 'space-between' }} >
                                <Text style={style.title}>{'IBEX 9000'}</Text>
                                <TouchableHighlight
                                    onPress={() => {
                                        var rentalProduct = this.props.title
                                        firebase.auth().onAuthStateChanged((profile) => {
                                            if (profile) {
                                                // User is signed in.
                                                firebase.database()
                                                    .ref(`/rentalEquipment/${profile.uid}`)
                                                    .child(rentalProduct)
                                                    .remove()
                                                console.log(`Item ${this.props.title} deleted`)
                                                this.props.button()// for reload
                                            } else {
                                                // No user is signed in.
                                            }
                                        });

                                    }}
                                    style={{
                                        paddingRight: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: '#CED0CE',
                                    }}>
                                    <Icon name="times" size={30} color="red" />
                                </TouchableHighlight>
                            </View>
                            <View style={{ flex: 1 }} >
                                <Text style={style.title}>{'Burton'}</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', }} >
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={style.title}>Size</Text>
                                    <Text>{160}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={style.title}>Metric</Text>
                                    <Text>{'cm'}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                                    <View style={{ width: '80%', height: '100%', backgroundColor: '#6496e5' }}>
                                        <View style={{ flexDirection: 'row',alignItems:'center' }}>

                                            <Text style={{ fontSize: 30 }}>$</Text><Text style = {{fontSize:15}}>{'30'} {'USD'}</Text>
                                        </View>
                                        <View>

                                            <Text>Per/Day</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>

                        </View>
                    </View>
                </TouchableHighlight>
            </View >
        )
    }
}
const style = StyleSheet.create({


    title: {
        fontSize: 15,
        paddingLeft: 5
    }

});