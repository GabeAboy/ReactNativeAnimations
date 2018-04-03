import React, { Component } from 'react';
import { View } from 'react-native';
import DrawerHeader from './DrawerHeader'
import MenuButton from './MenuButton'
import Icon from 'react-native-vector-icons/FontAwesome';
export default class DrawerContainer extends Component {

    render() {
        return (
            <View style={styles.ball}>
                <DrawerHeader />
                <View style = {{flex:1}}>
                    <MenuButton Title='History'/>
                    <MenuButton Title='Billing'/>
                    <MenuButton Title='Edit'/>
                    <MenuButton Title='Terms of Agreement'/>
                </View>
            </View>
        );
    }
}
const styles = {
    ball: {
        flex: 1
    }
}