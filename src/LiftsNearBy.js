import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, SectionList, SearchBar, List } from 'react-native';
import BrandListView from './Library/BrandListView';
import MultiSelectList from './Library/MyListItem';
import * as dumbData from '../MockDTO/liftsNearBy';
const SCREEN_WIDTH = Dimensions.get('window').width;
class LiftsNearBy extends Component {
    componentDidMount() {
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{
                        flex: 3, backgroundColor: 'red'
                    }}>

                    </View>
                    <View style={{
                        flex: 2,
                        alignItems:'flex-start',
                        justifyContent:'flex-end'
                    }}>
                    <Text style = {
                        {
                            fontSize:20,fontWeight:'bold'
                        }
                    }>Find merchants near you!</Text>
                    </View>
                </View>
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
            </View >

        );
    }
}

const styles = {
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    header: {
        flex: 1
    },
    font: {
        marginLeft: 25,
        fontSize: 45,
        color: 'black',
    }
}
export default LiftsNearBy;