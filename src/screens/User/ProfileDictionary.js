import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Video, TouchableHighlight } from 'react-native';
import TextCarousel from 'react-native-text-carousel';
import * as firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
import NaviDrink from '../../components/NaviDrink'
import UserProfileFlatList from './UserProfiles/UserProfileFlatList'
import LoadingGIF from '../../components/eventHandlers/LoadingGIF'

export default class ProfileDictionary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'hello',
            UserProfiles: [],
            loading: true,
        }
        this.GetUserProfiles.bind(this)
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((profile) => {
            this.GetUserProfiles(profile.uid)
        })
    }
    GetUserProfiles(userProfileId) {


        firebase.database()
            .ref(`/userProfiles/${userProfileId}`)
            .once('value')
            .then((snapshot) => {
                users = snapshot.val()
                for (const key in users) {
                    users[key].mountainId = key
                    // The correct way to change array state

                    var joined = this.state.UserProfiles.concat(users);
                    this.setState({ UserProfiles: joined })
                }
            }).then(() => {
                this.setState({ loading: false })
            })


    }
    static navigationOptions = {
        title: 'Welcome',
    };


    render() {
        const { navigate } = this.props.navigation;
        return (

            <View style={{ flex: 1 }}>
                {
                    this.state.loading ?
                        <LoadingGIF />
                        :
                        <View style={styles.container} >
                            <NaviDrink navigation={this.props.navigation} profile={true} />

                            {/* <TouchableHighlight style={{
                                height: 125,
                                width: '100%',
                                marginBottom: 5,
                                borderWidth: 1,
                                borderColor: 'gray',
                                backgroundColor: 'white',
                            }}
                                onPress={() => {
                                    console.log('ttt', this.state)
                                }}
                            > */}
                            <UserProfileFlatList data={this.state.UserProfiles} navigate={this.props.navigation} title='name' />
                            {/* </TouchableHighlight> */}
                            <View style={{
                                flex: .25,
                                justifyContent: 'center',
                                alignItems:'flex-end'
                            }} >
                                <Icon 
                                onPress={()=>{
                                    this.props.navigation.navigate('AddProfile')
                                }}
                                name="user-plus" size={35} color="#9a9ea5" style={{ position: 'absolute' }} />
                            </View>
                        </View>
                }
            </View>

        )
    }
};


const styles = StyleSheet.create({

    container: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#4286f4'
    },
});