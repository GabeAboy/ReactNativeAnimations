import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, SectionList, Image, SearchBar, List } from 'react-native';
import BrandListView from './Library/BrandListView';
import MultiSelectList from './Library/MyListItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as dumbData from '../MockDTO/liftsNearBy';
import Hamburger from 'react-native-hamburger';
import DrawerExample from './Library/Navigator'
import Ball from './Ball'
import * as complo from '../img/logo.jpg'
import NaviBar from './Library/NaviBar';

const SCREEN_WIDTH = Dimensions.get('window').width;
class LiftsNearBy extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>

                <NaviBar/>
                <View style={{
                    flex: 4,
                    justifyContent: 'flex-start'
                }}>
                    <View style={{
                        width: '100%'

                    }}>
                        <MultiSelectList data={dumbData.default.data} title='name' />
                    </View>
                </View>
            </View>

        );
    }
}

const styles = {
    container: {
        flex: 1
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    burgerKing: {
        flex: 1, justifyContent: 'flex-start', flexDirection: 'row'
    },
    header: {
        flex: .5, backgroundColor: '#4286f4', paddingTop: 20
    },
    font: {
        marginLeft: 25,
        fontSize: 45,
        color: 'black',
    }
}
export default LiftsNearBy;