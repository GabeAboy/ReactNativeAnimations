import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
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
                <View style={styles.header}>
                    <Image
                        source={require('../img/logo.jpg')}
                    />
                    <Text > Skiezy </Text>
                </View>
                {/* <View style = { styles.body }/> */}
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
        justifyContent: 'space-between',
        backgroundColor: 'black',
    },
    header: {
        height: SCREEN_HEIGHT - (SCREEN_HEIGHT * .80),
        width: SCREEN_WIDTH,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    footer: {
        height: SCREEN_HEIGHT - (SCREEN_HEIGHT * .80),
        width: SCREEN_WIDTH,
        backgroundColor: 'yellow'
    }
});