import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Text, Platform } from 'react-native';
import * as firebase from 'firebase'
import { ImagePicker } from 'expo'
export default class DrawerHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            photoURL: '',
        }
        this.uploadImageAsync.bind(this)
        this.getProfileImage.bind(this)
    }
    componentDidMount() {
        // this should be transfered by parent state through props
        // var userId = firebase.auth().currentUser.providerData[0].uid;
        // console.log('user ',user)
        // this._getUserData()
        this.getProfileImage()


    }

    _getUserData = async () => {
        await firebase.auth().onAuthStateChanged((profile) => {
            // this.setState({ userName: profile.displayName })
            this.setState({ photoURL: profile.photoURL })
            this.setState({ uid: profile.uid })
            if (Platform.OS === 'ios') {
                this.getPermissionsAsync()
            }
        })
    }
    getCurrentLoggedinUser = async () => {

        let firebasevar = new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((profile) => {
                console.log(profile)
                let mountainAdminId = profile.uid
                this.setState({ profile: mountainAdminId });
                resolve(mountainAdminId)
            })
        });
        let answer = await firebasevar;
        return answer;
    }
    getProfileImage = async () => {
        const userUid = this.state.uid;
        console.log('State is here ', this.state)
        var storage = firebase.storage();
        var pathReference = storage.ref(`${userUid}/icon/userProfilePicture`);
        // Get the download URL
        let profileImage = new Promise((resolve, reject) => {
            pathReference.getDownloadURL()
                .then((url) => {
                    this.setState({ photoURL: url })
                    resolve(url)
                }).catch((error) => {
                    console.log('type of ', error.code)
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {

                        case '404':
                            // Image not found and setstate to error
                            var defaultImage = require('../../../img/download.png')
                            this.setState({ image: defaultImage })
                            resolve()
                            // File doesn't exist
                            break;
                        case 'storage/unauthorized':
                            reject()
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            reject()
                            break;
                        case 'storage/unknown':
                            // Unknown error occur#4286f4, inspect the server response
                            reject()
                            break;
                    }
                });
        });
        let answer = await profileImage;
        // return answer;
    }


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
        console.log('Entered')
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
                console.log('ASDASD', uploadUrl)
                this.setState({ photoURL: pickerResult.uri });
                firebase.database()
                    .ref(`userPicture/${this.state.uid}`)
                    .update({
                        profileImage: uploadUrl
                    })
                    .catch((error) => { console.log('error ', error) })
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };
    uploadImageAsync = async (uri) => {
        console.log('got this far ', uri)
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase
            .storage()
            .ref(`${this.state.uid}/icon`)
            .child('userProfilePicture');
        const snapshot = await ref.put(blob);
        let downloadURL = `gs://${snapshot.metadata.bucket}/${snapshot.metadata.fullPath}`
        //gs://skieasy-e12b4.appspot.com/WbyF9PD6MDZJeFhAIe8yvkZ2eUE3/icon/mountainIcon
        return downloadURL;
    }

    render() {
        return (
            <View style={{ height: '20%', width: '100%' }}>
                <View style={styles.headerContainer}>
                 
                {/* <View style={{
                        flex: 1,
                        backgroundColor: 'red',
                        zIndex: 5
                    }}>

                    </View>
                    <View style={styles.top} >
                        <TouchableHighlight
                            onPress={this._pickImage}
                            style={{
                                borderWidth: 1,
                                borderColor: 'white',
                                backgroundColor: 'gray',
                                width: 75,
                                height: 75,
                                borderRadius: 40,
                                zIndex: 10,
                                top: -40,
                                left: 30
                            }}>
                            <Image style={
                                {
                                    height: "100%",
                                    borderRadius: 40,
                                    width: "100%",

                                }}
                                source={this.state.photoURL ? source = { uri: this.state.photoURL } : require('../../../img/default-user.png')}
                                resizeMode='cover' />


                        </TouchableHighlight>
                    </View> */}


                </View>
            </View>
        );
    }
}
const styles = {
    headerContainer: {
        flex:1,
        // backgroundColor: 'white',
        // justifyContent: 'flex-end',
        // position: 'absolute',
        // zIndex: 2,
        backgroundColor: 'blue'
    },
    top: {
        backgroundColor: 'white',
        flex: 1,
        zIndex: 5
    },
    font: {
        color: 'black',
        fontSize: 20
    }
}