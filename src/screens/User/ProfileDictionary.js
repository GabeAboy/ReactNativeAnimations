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
        this.GetUserProfiles('TGHaNJrSMNZJ4z4lmAfNFuYZZC82')
        firebase.auth().onAuthStateChanged((profile) => {
        })
    }
    GetUserProfiles(userProfileId) {

        firebase.database()
            .ref(`/userProfiles/${userProfileId}`)
            .once('value')
            .then((snapshot) => {
                console.log('entered the call')
                users = snapshot.val()
                for (const key in users) {
                    users[key].mountainId = key
                    // The correct way to change array state
                    var joined = this.state.UserProfiles.concat(users[key]);
                    this.setState({ UserProfiles: joined })
                }
            }).then(() => {
                console.log('what the fuck?', this.state)
                this.setState({ loading: false })
            }).catch((e) => {
                console.log('e', e)
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

                            <UserProfileFlatList data={this.state.UserProfiles} navigate={this.props.navigation} title='name' />
                            {/* </TouchableHighlight> */}

                        </View>
                }
                <View style={{
                    flex: .25,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    position: 'absolute',
                    top: '85%',
                    left: '60%',
                    width: 100,
                    height: 100,

                }} >
                    <Icon
                        onPress={() => {
                            this.props.navigation.navigate('AddProfile', { navigation: this.props.navigation })
                        }}
                        name="user-plus" size={35} color="#9a9ea5" style={{ position: 'absolute' }} />
                </View>
            </View>

        )
    }
};


const styles = StyleSheet.create({

    container: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});