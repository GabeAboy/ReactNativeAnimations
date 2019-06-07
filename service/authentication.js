import * as firebase from 'firebase'

    loginWithFacebook = async() => {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1634938636614030', {
            permissions: ['public_profile'],
        });
        if (type == 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)
    
            firebase.auth()
                .signInAndRetrieveDataWithCredential(credential)
                .then(() => {
                    this.props.navigation.navigate('DatePicker', { navigation: this.props.navigation })
                })
                .catch((error) => {
                    console.log(error)
                })
    
        }
    }
    
    currentlyLoggedInUser = async() =>{
        var loggedInUser;
        firebase.auth().onAuthStateChanged((user) => {
            loggedInUser = user;
        })
        return loggedInUser;
    }


export default {FacebookAuthProvider,currentlyLoggedInUser}