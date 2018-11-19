import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Video, TouchableHighlight } from 'react-native';
import TextCarousel from 'react-native-text-carousel';
import * as firebase from 'firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
import NaviDrink from '../../components/NaviDrink'
import UserProfileFlatList from './UserProfiles/UserProfileFlatList'
import LoadingGIF from '../../components/eventHandlers/LoadingGIF'
import { withNavigationFocus } from 'react-navigation';

class ProfileDictionary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'hello',
            UserProfiles: [],
            loading: true,
            newUser: false
        }
        this.GetUserProfiles.bind(this)
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }
    componentDidUpdate() {
        console.log('Did update!', this.state.newUser)
        if (this.state.newUser) {
            this.GetUserProfiles(this.state.userProfileId)
            this.setState({ newUser: false })
            console.log('end', this.state)
        }
    }
    componentDidMount() {

        firebase.auth().onAuthStateChanged((profile) => {
            this.setState({userProfileId:profile.uid})
            this.GetUserProfiles(profile.uid)
        })
    }
    button = () =>{
        this.setState({newUser:true})
    }
    
    GetUserProfiles = async (userProfileId) => {
        let DoesUserHaveData = new Promise((resolve, reject) => {
            firebase.database()
                .ref(`/userProfiles`)
                .child(userProfileId)
                .once('value')
                .then((snapshot) => {
                    if (!_.isEmpty(snapshot.val())) {

                        console.log(snapshot)
                        const snap = snapshot.val()

                        let result = Object.keys(snap).map((key) => {
                            snap[key].pathReference = key
                            return snap[key];
                        });
                        this.setState({ UserProfiles: result })
                        resolve(result)
                        // for (const key in users) {
                        //     users[key].mountainId = key
                        //     // The correct way to change array state
                        //     var joined = this.state.UserProfiles.concat(users[key]);
                        //     this.setState({ UserProfiles: joined })
                        //}
                    }
                    else{
                        this.setState({ UserProfiles: [] })
                        resolve()
                    }
                }).then(() => {
                    resolve()
                }).catch((e) => {
                    reject(e)
                    console.log('e', e)
                })
        })

        let answer = await DoesUserHaveData
        this.setState({ loading: false })
        console.log("here is answer ", answer)

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

                            <UserProfileFlatList data={this.state.UserProfiles} updateFunction={this.button} profileId={this.props.userProfileId} navigate={this.props.navigation} title='name' />
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
                            this.props.navigation.navigate('AddProfile', {
                                navigation: this.props.navigation,
                                button: () => {
                                    this.setState({ newUser: true })
                                }
                            })
                        }}
                        name="user-plus" size={35} color="#9a9ea5" style={{ position: 'absolute' }} />
                </View>
            </View>

        )
    }
};

export default withNavigationFocus(ProfileDictionary)

const styles = StyleSheet.create({

    container: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});