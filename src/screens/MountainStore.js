import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NaviBar from '../components/NaviBar'
import Carousel from '../components/Carousel'
import Icon from 'react-native-vector-icons/FontAwesome';
class Part extends React.Component {
    render() {
        { }
        return (
            <View style={{
                flex: 1,
                borderWidth: 4, borderColor: 'red'
            }}>

            </View>
        )
    }
}

export default class one extends Component {
    componentDidMount() {
    }
    render() {
        return (
            <View style={styles.ball}>
                <NaviBar company={this.props.navigation.state.params.company} />

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