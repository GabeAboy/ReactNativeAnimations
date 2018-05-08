import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DrawerHeader from './DrawerHeader'
import MenuButton from './MenuButton'
export default class DrawerContainer extends Component {

    render() {
        return (
            <View style={styles.ball}>
                <DrawerHeader />
                <View style={{ flex: 1 }}>
                    <MenuButton icon='wrench' buttonName='Settings' />
                    <MenuButton icon='history' buttonName='History' />
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