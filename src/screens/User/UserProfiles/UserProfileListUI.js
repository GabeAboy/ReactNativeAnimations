import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import GeoDistanceIcon from '../../../components/GeoDistanceIcon'
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase'
export default class UserProfileListUI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photoURL: false
        }

    }

    render() {
        return (
            <View style={{
                width: '100%', height: 110,
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <View style={{
                    flex: 2, justifyContent: 'center', alignItems: 'center'
                }}>
                    <Image style={{ height: "70%", borderRadius: 40, width: "70%" }}
                        source={this.state.photoURL ? source = { uri: this.state.photoURL } : require('../../../../img/default-user.png')}
                        resizeMode='contain' />

                </View>
                <View style={{
                    flex: 6,
                    borderBottomColor: '#CED0CE',
                    borderBottomWidth: 1

                }}>

                    <View style={
                        {
                            flex: 2,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-end',
                            paddingLeft: 5, marginTop: 10
                        }
                    }>
                        <Text style={
                            {
                                fontSize: 25
                            }
                        }>
                            {this.props.firstName + " " + this.props.lastName}
                        </Text>
                    </View>

                    <View style={
                        {
                            flex: 4,

                            flexDirection: 'row',
                            paddingLeft: 10,
                            paddingTop: 5
                        }
                    }>
                        <View style={{
                            flex: 1
                        }}>
                            <Text style={styles.titleText}>Weight</Text>
                            <Text style={styles.subText}>
                                {this.props.weight + this.props.weightMetric}
                            </Text>
                        </View>

                        <View style={{
                            flex: 1,
                            alignItems: 'center'

                        }}>
                            <Text style={styles.titleText}>Shoe Size</Text>
                            <Text style={styles.subText}>{this.props.shoeSize + this.props.shoeMetric}</Text>
                        </View>

                    </View>

                </View>
                <TouchableHighlight
                    onPress={() => {
                        var mountainId = this.props.firstName + this.props.lastName
                        firebase.auth().onAuthStateChanged((profile) => {
                            if (profile) {
                                firebase.database()
                                    .ref(`/userProfiles/${profile.uid}`)
                                    .child(mountainId)
                                    .remove()
                                this.props.onPressItem()
                            }
                        });

                    }}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomWidth: 1, borderColor: '#CED0CE',
                    }}>
                    <Icon name="times" size={30} color="red" />
                </TouchableHighlight>
                <TouchableHighlight style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomColor: "#CED0CE",
                    borderBottomWidth: 1
                }}
                    onPress={() => {
                 
                        this.props.navigation.navigate('AddProfile',{data:this.props});


                    }}
                >
                    <Icon name="pencil-square-o" size={30} color="#CED0CE" />

                </TouchableHighlight>
            </View>
        )
    }
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#4286f4'
    },
    titleText: {
        fontSize: 20
    },
    subText: {
        color: '#9a9ea5',
        fontSize: 15
    }
});