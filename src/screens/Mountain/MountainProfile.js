import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Video, TouchableHighlight, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextCarousel from 'react-native-text-carousel';
import Button from '../../components/Button';
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
        })
    }
    componentDidMount() {
        console.log('Mountain Profile')
        this.getProfileInformation()
    }
    static navigationOptions = {
        title: 'MountainProfile',
    };
    _pickImage = async () => {
        console.log('Image picked')
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3]
        });
        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async pickerResult => {
        try {
            this.setState({ uploading: true });
            console.log('picker', pickerResult)
            if (!pickerResult.cancelled) {
                uploadUrl = await this.uploadImageAsync(pickerResult.uri);
                this.setState({ image: uploadUrl });
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };

    uploadImageAsync = async uri => {
        console.log('hell',uri)
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase
            .storage()
            .ref()
            .child(uuid.v4());
        console.log('done')
        const snapshot = await ref.put(blob);
        return snapshot.downloadURL;
    }
    getProfileInformation = () => {
        firebase.auth().onAuthStateChanged((profile) => {
            console.log(profile.uid)
            console.log('asdasd')
            let mountainAdminId = profile.uid
            firebase.database().ref('/adminDiscription/' + mountainAdminId)
                .once('value')
                .then((snapshot) => {
                    console.log('What is this ', snapshot)
                    //this.setState(snapshot)
                    this.setState({ address: snapshot.val().address })
                    this.setState({ businessName: snapshot.val().businessName })
                    this.setState({ demoninator: snapshot.val().demoninator })
                    this.setState({ numerator: snapshot.val().numerator })
                    this.setState({ snowCondition: snapshot.val().snowCondition })
                    console.log('shit', this.state)
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
                <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}>
                    <View
                        style={{

                            flex: 1,
                            flexDirection: 'row'
                        }}>
                        <TouchableHighlight onPress={this._pickImage} style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} >
                            <View style={{ width: '100%', height: '100%' }}>
                                <Image
                                    style={{ width: '100%', height: '100%' }}
                                    source={this.state.image ? { uri: this.state.image } : require('../../../img/download.png')}
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
                                <Icon name='diamond'
                                    size={15}
                                    color="black"
                                />
                                <Text style={{ paddingLeft: 15, fontWeight: '500' }}>{this.state.numerator} out of {this.state.demoninator} trails open</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: .3, borderBottomWidth: 1, borderBottomColor: 'gray' }} >
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


                    <View style={{ flex: 3 }} >
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: .4, borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                            <Icon name='users'
                                size={15}
                                color="black"
                                style={{ paddingLeft: 20 }}
                            />
                            <Text style={{ paddingLeft: 15, fontWeight: '500' }}>Featured Photos</Text>

                        </View>
                        <View style={{ flex: 4, backgroundColor: 'white' }}>
                            <Text style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 10 }}>Choose up to 6 photos of your business</Text>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                    <View style={{ width: '70%', justifyContent: 'center', alignItems: 'center', height: '70%', borderRadius: 10, backgroundColor: 'gray' }} >
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
                    {/* <View style={{ flex: 1, backgroundColor: 'blue' }} /> */}
                </ScrollView>

            </View>
            // <View style={styles.container} >
            // <ScrollView>


            //     <View style={styles.discription}>
            //         <View
            //             style={{
            //                 flex: 1.5,
            //                 backgroundColor: 'green',
            //                 justifyContent: 'center',
            //                 alignItems: 'center'
            //             }}>
            //             {/* profile picture */}
            //             <View
            //                 style={{
            //                     height: 50,
            //                     width: '100%',
            //                     flexDirection: 'row',
            //                     alignItems: 'center'

            //                 }}>
            //                 <Icon name='user-circle'
            //                     size={20}
            //                     color="white"
            //                     style={{ paddingRight: 10, paddingLeft: 20 }}
            //                 />
            //                 <Text>Profile Picture</Text>

            //             </View>
            //             <View style={{ height: '70%', width: '75%', backgroundColor: 'gray' }} >
            //                 {/* swap view bellow with image */}
            //                 <Image style={{ height: "100%", width: "100%" }} source={require('../../../img/default-user.png')}
            //                     resizeMode='cover' />

            //                 <View
            //                     style={{
            //                         flex: .8,
            //                         justifyContent: 'center',
            //                         alignItems: 'flex-end',
            //                         paddingRight: 15
            //                     }}>
            //                     <View style={styles.imageEdit}>
            //                         <Icon name='camera'
            //                             size={15}
            //                             color="white"
            //                         />
            //                         <Text>Edit</Text>
            //                     </View>
            //                 </View>
            //             </View>
            //         </View>
            //         {/* details */}
            //         <View
            //             style={{
            //                 flex: 2,
            //                 backgroundColor: 'blue',
            //                 alignItems: 'center'
            //             }}>
            //             <View
            //                 style={{
            //                     height: 50,
            //                     width: '100%',
            //                     flexDirection: 'row',
            //                     alignItems: 'center'

            //                 }}>
            //                 <Icon name='list'
            //                     size={16}
            //                     color="white"
            //                     style={{ paddingRight: 10, paddingLeft: 20 }}
            //                 />
            //                 <Text>Details</Text>

            //             </View>
            //             <View
            //                 style={{
            //                     borderWidth: 1,
            //                     borderColor: 'white',
            //                     borderRadius: 10,
            //                     width: '70%',
            //                     height: '70%',
            //                     backgroundColor: 'red'
            //                 }}>

            //             </View>
            //         </View>
            //     </View>
            //     <View style={styles.photos} >
            //         <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'blue' }}>
            //             <View
            //                 style={{
            //                     height: 125,
            //                     width: 125,
            //                     backgroundColor: 'red',

            //                     borderWidth: 7,
            //                     borderColor: 'black'
            //                 }} />
            //             <View
            //                 style={{
            //                     height: 125,
            //                     width: 125,
            //                     backgroundColor: 'red',

            //                     borderWidth: 7,
            //                     borderColor: 'black'
            //                 }} />
            //         </View>
            //         <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'blue' }}>

            //             <View
            //                 style={{
            //                     height: 125,
            //                     width: 125,
            //                     backgroundColor: 'red',

            //                     borderWidth: 7,
            //                     borderColor: 'black'
            //                 }} />
            //             <View
            //                 style={{
            //                     height: 125,
            //                     width: 125,
            //                     backgroundColor: 'red',

            //                     borderWidth: 7,
            //                     borderColor: 'black'
            //                 }} />
            //         </View>
            //     </View>
            //     <View style={styles.rental} />
            //     <View style={styles.passes} />
            //     </ScrollView>
            // </View>
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