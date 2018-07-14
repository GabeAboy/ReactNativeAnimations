import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NaviBar from '../../components/NaviBar'
import Carousel from '../../components/Carousel'
import Icon from 'react-native-vector-icons/FontAwesome';
class Part extends React.Component {
    render() {
        { }
        return (
            <TouchableOpacity style={{
                flex: 1,
                borderWidth: 4, borderColor: 'blue'
            }}>

            </TouchableOpacity>
        )
    }
}

export default class MountainStore extends Component {
    render() {
        return (
            <View style={styles.ball}>
                <NaviBar company={this.props.navigation.state.params.data.businessName} picture={this.props.navigation.state.params.data.profileImage} />

                <View style={{
                    flex: 3
                }}>
                    <Carousel comp={this.props.navigation.state.params.data} />
                </View>
                <View style={{ flex: .4, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: '50%', height: 63, backgroundColor: 'grey' }} />
                    <TouchableOpacity style={{ width: '50%', height: 63, backgroundColor: 'blue' }} />
                </View>
                <TouchableOpacity style={{ width: '100%', height: 63, backgroundColor: 'green' }} />


            </View>
        );
    }
}
const styles = {
    ball: {
        flex: 1,justifyContent:'space-around'
    }
}