import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Video, TouchableHighlight, FlatList, TextInput, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextCarousel from 'react-native-text-carousel';
import Button from '../../components/Button';
import EditLiftTickets from './EditLiftTickets';
import AdminLiftTicketDisplay from './AdminLiftTicketDisplay'
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import Header from '../../components/Header'
import * as firebase from 'firebase'
import { ImagePicker } from 'expo'
import uuid from 'uuid';
import firebaseConfig from '../../../keys/firebasekeys'
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// On load get data from firebase for the logged in user
// Display that information
var storage = firebase.storage();

export default class MountainProfile extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            address: 'Address',
            businessName: 'Business',
            demoninator: '0',
            numerator: '0',
            snowCondition: 'Weather',
            image: null,
            uploading: false,
            profile: null,
            liftTickets: []
        })
    }
    
    componentDidUpdate() {
        console.log(
            'update', this.state
        )

    }
    componentDidMount() {
        console.log(
            'mount', this.state
        )
        console.log('Mountain Profile')
        if (Platform.OS === 'ios') {
            this.getPermissionsAsync()
        }
        this.getProfileInformation()
    }
    static navigationOptions = {
        title: 'MountainProfile',
    };
    getPermissionsAsync = async () => {
        const { Location, Permissions } = Expo;
        console.log('checking your platform')
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            return;
        } else {
            throw new Error('Permission permission not granted');
        }
    }
    _pickImage = async () => {

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            base64: true,
            aspect: [4, 3]
        });
        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async pickerResult => {
        try {
            this.setState({ uploading: true });
            if (!pickerResult.cancelled) {
                uploadUrl = await this.uploadImageAsync(pickerResult.uri);
                this.setState({ image: pickerResult.uri });
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };
    uploadImageAsync = async (uri) => {
        console.log(uri)
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase
            .storage()
            .ref(`${this.state.profile}/icon`)
            .child('mountainIcon');

        const snapshot = await ref.put(blob);
        return snapshot.downloadURL;
    }
    getProfileInformation = () => {
        firebase.auth().onAuthStateChanged((profile) => {
            let mountainAdminId = profile.uid
            this.setState({ profile: mountainAdminId });
            firebase.database().ref('/adminDiscription/' + mountainAdminId)
                .once('value')
                .then((snapshot) => {
                    //this.setState(snapshot)
                    this.setState({ address: snapshot.val().address })
                    this.setState({ businessName: snapshot.val().businessName })
                    this.setState({ demoninator: snapshot.val().demoninator })
                    this.setState({ numerator: snapshot.val().numerator })
                    this.setState({ snowCondition: snapshot.val().snowCondition })
                });
            firebase.database().ref('/liftTicketDiscription/' + this.state.profile)
                .once('value')
                .then((snapshot) => {
                    console.log(snapshot)
                    const snap = snapshot.val()
                    let result = Object.keys(snap).map(function (key) {
                        return snap[key];
                    });
                    this.setState({ liftTickets: result })

                })
            console.log('this', this.state)
            var storage = firebase.storage();
            var pathReference = storage.ref(`${this.state.profile}/icon/mountainIcon`);
            // Get the download URL
            pathReference.getDownloadURL()
                .then((url) => {
                    this.setState({ image: url })
                }).catch((error) => {
                    console.log('type of ', typeof error.code)
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {

                        case '404':
                            // Image not found and setstate to error
                            var defaultImage = require('../../../img/download.png')
                            this.setState({ image: defaultImage })
                            // File doesn't exist
                            break;
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });
        })
    }
    render() {
        const { navigate } = this.props.navigation;
        return (



            <View style={styles.container}>

                <Header />
                <View
                    style={{
                        height: 50,
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        //Change background color to off black
                        borderBottomColor: 'black'

                    }}>
                    <Icon
                        name="arrow-left"
                        size={25}
                        color="black"
                        style={{ paddingRight: 20, paddingLeft: 20 }} />
                    <Text>Log out</Text>
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
                    <View
                        style={{
                            height: SCREEN_HEIGHT / 4.5,
                            width: SCREEN_WIDTH,
                            flexDirection: 'row'
                        }}>
                        <TouchableHighlight onPress={this._pickImage} style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} >
                            <View style={{ width: '100%', height: '100%' }}>
                                <Image
                                    style={{ width: '100%', height: '100%' }}
                                    source={this.state.image ? { uri: this.state.image } : this.state.image}
                                    //||require('../../../img/download.png')
                                    resizeMode='cover' />
                                <View style={styles.imageEdit}>
                                    <Icon name='camera'
                                        size={15}
                                        color="black"
                                    />
                                    <Text style={{ fontWeight: '500' }}>Edit</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <View style={{ flex: 3, justifyContent: 'space-between', alignItems: 'flex-start' }} >
                            <View style={{ paddingLeft: 10, alignItems: 'center', flexDirection: 'row', flex: 1 }}>
                                <Icon name='id-badge'
                                    size={15}
                                    color="black"
                                />
                                <Text style={{ paddingLeft: 15, fontWeight: '500' }}>{this.state.businessName || 'Title'}</Text>
                            </View>
                            <View style={{ paddingLeft: 10, alignItems: 'center', flexDirection: 'row', flex: 1 }}>
                                <Icon name='map-marker'
                                    size={15}
                                    color="black"
                                />
                                <Text style={{ paddingLeft: 15, fontWeight: '500' }}>{this.state.address || 'Address'}</Text>
                            </View>
                            <View style={{ paddingLeft: 10, alignItems: 'center', flexDirection: 'row', flex: 1 }}>
                                <Icon name='snowflake-o'
                                    size={15}
                                    color="black"
                                />
                                <Text style={{ paddingLeft: 15, fontWeight: '500' }}>{this.state.snowCondition || 'Default'}</Text>
                            </View>
                            <View style={{ paddingLeft: 10, alignItems: 'center', flex: 1, flexDirection: 'row', }}>
                                <Icon name='map'
                                    size={15}
                                    color="black"
                                />
                                <Text style={{ paddingLeft: 15, fontWeight: '500' }}>{this.state.numerator} out of {this.state.demoninator} trails open</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: SCREEN_HEIGHT / 15,
                        width: SCREEN_WIDTH,
                        borderBottomWidth: 1,
                        borderBottomColor: 'gray'
                    }} >
                        <TouchableHighlight onPress={() => { this.props.navigation.navigate('EditProfile', { navigation: this.props.navigation }) }} style={{ width: '90%', height: '75%', borderWidth: 1, borderColor: 'blue', borderRadius: 5 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1, }}>
                                <Icon name='pencil-square-o'
                                    size={15}
                                    color="black"
                                    style={{ paddingLeft: 20 }}
                                />
                                <Text style={{ paddingLeft: 15, fontWeight: '500' }}>Edit</Text>
                            </View>
                        </TouchableHighlight>
                    </View>


                    <View style={{
                        height: SCREEN_HEIGHT / 1.68,
                        width: SCREEN_WIDTH,
                        marginTop: 10,
                        borderTopWidth: 1,
                        borderColor: 'gray',
                        borderBottomWidth: 1
                    }} >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            height: SCREEN_HEIGHT / 15,
                            width: SCREEN_WIDTH,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1
                        }}>
                            <Icon name='users'
                                size={15}
                                color="black"
                                style={{ paddingLeft: 20 }}
                            />
                            <Text style={{ paddingLeft: 15, fontWeight: '500' }}>Featured Photos</Text>

                        </View>
                        <View style={{ flex: 4, backgroundColor: 'white' }}>
                            <Text style={{
                                paddingTop: 10,
                                paddingBottom: 10,
                                paddingLeft: 10
                            }}>Choose up to 6 photos of your business</Text>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }} >
                                    <View style={{
                                        width: '70%',
                                        justifyContent: 'center',
                                        alignItems: 'center', height: '70%',
                                        borderRadius: 10,
                                        backgroundColor: 'orange'
                                    }} >
                                        <Icon name='file-image-o'
                                            size={25}
                                            color="black"
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '70%', height: '70%', borderRadius: 10, backgroundColor: 'gray' }} >
                                        <Icon name='file-image-o'
                                            size={25}
                                            color="black"
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '85%', height: '70%', borderRadius: 10, backgroundColor: 'gray' }} >
                                        <Icon name='file-image-o'
                                            size={25}
                                            color="black"
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '70%', height: '70%', borderRadius: 10, backgroundColor: 'gray' }} >
                                        <Icon name='plus-square-o'
                                            size={25}
                                            color="black"
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '70%', height: '70%', borderRadius: 10, backgroundColor: 'gray' }} >
                                        <Icon name='plus-square-o'
                                            size={25}
                                            color="black"
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '70%', height: '70%', borderRadius: 10, backgroundColor: 'gray' }} >
                                        <Icon name='file-image-o'
                                            size={25}
                                            color="black"
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        height: SCREEN_HEIGHT - 73,
                        width: SCREEN_WIDTH,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        marginTop: 10,
                        borderColor: 'gray',
                    }} >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            height: SCREEN_HEIGHT / 15,
                            width: SCREEN_WIDTH,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1,

                        }}>
                            <Icon name='wrench'
                                size={15}
                                color="black"
                                style={{ paddingLeft: 20 }}
                            />
                            <Text style={{ paddingLeft: 15, fontWeight: '500' }}>Lift Ticket Management</Text>

                        </View>
                        <FlatList
                            data={this.state.liftTickets}// Comes from state and before that didMount
                            renderItem={({ item }) => <AdminLiftTicketDisplay
                                key={item.key}
                                title={item.title}
                                reguPrice={item.reguPrice}
                                holiPrice={item.holiPrice}
                                timeOne={item.timeOne}
                                timeTwo={item.timeTwo} />}
                        />

                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            height: SCREEN_HEIGHT / 15,
                            width: SCREEN_WIDTH,
                            borderBottomWidth: 1,
                            borderBottomColor: 'gray'
                        }} >
                            <TouchableHighlight onPress={() => { this.props.navigation.navigate('EditLiftTickets', { navigation: this.props.navigation }) }} style={{ width: '90%', height: '75%', borderWidth: 1, borderColor: 'blue', borderRadius: 5 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1, }}>
                                    <Icon name='pencil-square-o'
                                        size={15}
                                        color="black"
                                        style={{ paddingLeft: 20 }}
                                    />
                                    <Text style={{ paddingLeft: 15, fontWeight: '500' }}>Edit</Text>
                                </View>
                            </TouchableHighlight>
                        </View>


                    </View>
                </ScrollView>

            </View>
        )

    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#4286f4'
    },
    discription: {
        backgroundColor: 'red', flex: 1.5,
        flexDirection: 'row'
    },
    photos: {
        backgroundColor: 'white',
        flex: 2
    },
    rental: {
        backgroundColor: 'red', flex: .5
    },
    passes: {
        backgroundColor: 'black', flex: .5
    },
    imageEdit: {
        width: 60,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        opacity: .6,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        position: 'absolute',
        top: 125,
        left: 80
    }
});
