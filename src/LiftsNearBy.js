import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, SectionList } from 'react-native';
import BrandListView from './Library/BrandListView';
const SCREEN_WIDTH = Dimensions.get('window').width;
class LiftsNearBy extends Component {

    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.font}>Lifts Near You!</Text>
                <FlatList
                    style={{
                        height: 500
                    }}
                    data={[{ key: 'a' }, { key: 'b' }]}
                    renderItem={({ item }) => <BrandListView style={styles.item} brand={item.key} />}
                />         

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
        height: 100,
        width: SCREEN_WIDTH
    },
    font: {
        marginLeft: 25,
        fontSize: 45,
        color: 'black',
    }
}
export default LiftsNearBy;