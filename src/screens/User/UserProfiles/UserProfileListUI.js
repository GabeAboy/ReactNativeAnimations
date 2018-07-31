import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

export default class UserProfileListUI extends Component {
    render() {
        return (

            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, backgroundColor: 'red' }} />
                <View style={{ flex: 3 }} >
                    <Text style={{ width: '100%', fontSize: 31 }}>{this.props.firstName}</Text>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'blue',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} >
                        <Text style={{ flex: 1, fontSize: 30, backgroundColor: 'green' }}>Height:{this.props.weight}</Text>
                        <Text style={{ flex: 1, fontSize: 20, backgroundColor: 'yellow' }}>Weight:{this.props.shoeSize} {this.props.shoeMetric}</Text>
                    </View>
                </View>
            </View>

        )
    }
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#4286f4'
    },
});