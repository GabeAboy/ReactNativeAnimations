import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from 'firebase'
import firebaseConfig from '../../../../keys/firebasekeys'
import StarRating from 'react-native-star-rating'
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
export default class RentalEquipmentDisplay extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
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
                        console.log('asdasdasd!!!!!', this.props)
                    }}
                >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 2,  }}>
                            {/* <Image style={{ height: "60%", borderRadius: 40, width: "60%" }}
                                source={require('../../../../img/default-user.png')}
                                resizeMode='contain' /> */}
                            <View style={{ width: '100%',backgroundColor:'red' }}>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={3}
                                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 4, backgroundColor: 'blue' }}></View>
                    </View>
                </TouchableHighlight>
            </View >
        )
    }
}