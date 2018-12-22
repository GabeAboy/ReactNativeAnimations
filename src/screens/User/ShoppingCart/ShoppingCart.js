import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NaviBar from '../../../components/NaviBar';

export default class MountainStore extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <NaviBar />
                <View
                    style={{
                        height: 100, width: '100%', backgroundColor: 'blue'
                    }}>
                    <View style={{}}> </View>
                    
                    <View style={{}}> </View>

                </View>
            </View>
        );
    }
}
const styles = {

}
