import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from 'firebase'
import firebaseConfig from '../../../../keys/firebasekeys'
import Modal from "react-native-modal"
import StarRating from 'react-native-star-rating'
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
var image;
export default class RentalEquipmentDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
        this.setModalVisible = this.setModalVisible.bind(this);
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
    setModalVisible() {
        this.setState({ modalVisible: !this.state.modalVisible })
    }
    render() {
        return (
            <View>

                <Modal isVisible={this.state.modalVisible}>
                    <View style={{ flex: 1 }}>
                        <Text>Hello world!</Text>
                        <TouchableOpacity onPress={this.setModalVisible}>
                            <Text>Hide me!</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <TouchableHighlight style={{
                    height: 125,
                    width: '90%',
                    marginBottom: 5,
                    backgroundColor: 'white',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    
                    elevation: 5,
                }}
                    onPress={() => {
                        if (this.props.commerse) {
                            //add to cart 
                        }
                        else {
                            this.setModalVisible();
                            this.props.navigation.navigate('EditRentalEquipment', {
                                properties: this.props,
                                pathReference: this.props.pathReference,
                                isEdit: true,
                                button: this.props.button
                            })
                        }
                    }}
                >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{
                            flex: 2,
                            alignItems: 'center',
                            justifyContent: 'space-around',

                        }}>
                            <Image style={{ height: "60%", borderRadius: 40, width: "60%", paddingTop: 5 }}
                                source={this.getImage()}
                                resizeMode='contain' />
                            {/* For the image needs tomake if statements to see what category is */}

                        </View>
                        <View style={{ flex: 4, }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                paddingLeft: 10,
                                paddingRight: 10,
                                alignItems: 'flex-end',
                                justifyContent: 'space-between'
                            }} >
                                <Text style={style.title}>{'IBEX 9000'}</Text>
                                {
                                    !this.props.commerse ?
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
                                        :
                                        null
                                }

                            </View>

                            <View style={{ flex: 2, flexDirection: 'row', }}>
                                <View style={{
                                    flex: 3,
                                    paddingLeft: 10,
                                }}>
                                <View style = {{width:'85%',paddingBottom:5}}> 
                                    <StarRating
                                        style={{ witdh: 10, height: 10 }}
                                        disabled={true}
                                        maxStars={5}
                                        rating={this.props.starCount}
                                        starSize={25}
                                        fullStarColor={'#4286f4'}
                                    />
                                    </View>
                                    <Text style={{ fontSize: 15 }}>Size</Text>
                                    <Text style={{ color: "#4286F4" }} >40cm</Text>


                                </View>
                                <View style={{
                                    flex: 2,
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                    paddingRight:12
                                }}>
                                    <Text style={{ fontSize: 35,  }}>$300</Text>
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
        fontSize: 20,
    }

});