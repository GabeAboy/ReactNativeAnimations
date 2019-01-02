import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
const names = {

}
export default class Heading extends Component {
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.left}>
                    <View style={styles.imageBox}></View>
                </View>
                <View style={styles.right}>
                    <View style={styles.top}>
                        <Text style ={{fontSize:20}}>You have purchased the super cool ticket</Text>
                        <Text>$100.00</Text>
                    </View>

                    <View style={styles.bottom}>
                        <Button title="one" />
                        <Button title="delete" />
                        <Button title="three" />
                    </View>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flexDirection: 'row',

        height: 150,
        width: '90%',
        backgroundColor: 'blue'
    },
    left: {
        alignItems: 'center',

        flex: 1,
        backgroundColor: 'black'
    },
    right: {
        flex: 3,
        backgroundColor: 'white'
    },
    top: {
        flex: 2,
    },
    bottom: {
        flex: 1,
        backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    imageBox: {
        height: 40,
        width: 40,
        backgroundColor: 'white'
    }
});