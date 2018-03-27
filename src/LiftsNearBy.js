import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, SectionList, SearchBar, List } from 'react-native';
import BrandListView from './Library/BrandListView';
import MultiSelectList from './Library/MyListItem';
const SCREEN_WIDTH = Dimensions.get('window').width;
class LiftsNearBy extends Component {
    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.font}>Lifts Near You!</Text>
                </View>
                <View style={{
                    flex: 4, 
                    justifyContent:'flex-start'
                }}>
                    <View style={{
                        width:'100%'

                    }}>
                        <MultiSelectList data={[{ title: 'asd' }, { title: 'b' }, { title: 'b' }, { title: 'b' }, { title: 'b' }, { title: 'b' }, { title: 'b' }, { title: 'b' }, { title: 'b' }, { title: 'b' }, { title: 'basdas' }, { title: 'sd' }]} title='name' />
                    </View>
                </View>
            </View>

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
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: SCREEN_WIDTH
    },
    font: {
        marginLeft: 25,
        fontSize: 45,
        color: 'black',
    }
}
export default LiftsNearBy;