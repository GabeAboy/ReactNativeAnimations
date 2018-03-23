import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { Video } from 'expo';
import { Button } from 'react-native-elements';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
// Container for initial launch
// UAC login/signUp
//     facebook passport
//     logo
export default class Main extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container} >
                <Video
                    source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                    shouldPlay
                    isLooping
                    volume={0.0}
                    resizeMode="cover"
                    style={{ SCREEN_WIDTH, height: 300 }}
                />
                <View style={styles.header}>
                    <Image
                        source={require('../img/logo.jpg')}
                    />
                    <Text > Skiezy </Text>
                </View>


                <View style={styles.footer}>
                    <Button
                        large
                        icon={{ name: 'envira', type: 'font-awesome' }}
                        title='LARGE WITH ICON TYPE'
                        onPress={() => navigate('ShoppingCart')}
                    />

                </View>




            </View>
        )
    }
};


const styles = StyleSheet.create({
    logo: {

    },
    container: {
        flex: 1,
        zIndex: 5,
        paddingTop: 24,
        backgroundColor: 'black',
        zIndex: 0
    },

    header: {
        height: 200,
        width: SCREEN_WIDTH,
        opacity: 0.5,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1
    },
    footer: {
        height: SCREEN_HEIGHT - (SCREEN_HEIGHT * .80),
        width: SCREEN_WIDTH,
        backgroundColor: 'yellow',
        zIndex: 2
    }
});