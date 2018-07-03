import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Text } from 'react-native';
import * as firebase from 'firebase'

export default class DrawerHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            photoURL: '',
        }
    }
    componentDidMount() {
        // this should be transfered by parent state through props
        firebase.auth().onAuthStateChanged((profile) => {
            this.setState({ userName: profile.displayName })
            this.setState({ photoURL: profile.photoURL })
            console.log(this.state)
        });
    }
    render() {
        return (
            <View style={styles.headerContainer} >

                <View style={{ flex: 1, marginTop: 20 }}>
                    <View style={{ flex: 1.5 }} >
                        <View style={{
                            marginTop: 25,
                            marginLeft: 25,
                            borderWidth: 1,
                            borderColor: 'white',
                            backgroundColor: 'gray',
                            width: 75, height: 75,
                            borderRadius: 40
                        }}>
                            <Image style={{ height: "100%", borderRadius: 40, width: "100%" }}
                                source={this.state.photoURL ? source = { uri: this.state.photoURL } : require('../../../img/default-user.png')}
                                resizeMode='contain' />

                        </View>
                    </View>
                    <View style={{ flex: .7, justifyContent: 'flex-start', paddingTop: 20 }} >
                        <Text style={styles.font}>{this.state.userName ? this.state.userName : 'Name'}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = {
    headerContainer: {
        height: '30%',
        width: '100%',
        backgroundColor: '#4286f4'
    },
    font: {
        marginLeft: 25,
        color: 'black',
        fontSize: 20
    }
}