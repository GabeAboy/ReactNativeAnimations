import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions, FlatList, List } from 'react-native';
import BrandListView from './BrandListView';
import { SearchBar } from 'react-native-elements'


export default class MultiSelectList extends React.PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentWillMount() {
        this.setState({ data: this.props.data })
        console.log("WHATS UPPPPP  ",this.props)
        
    }

    state = { selected: new Map() };
    _keyExtractor = (item, index) => item.id;
    onChange = (text) => {
        var filterLength = text.length;
        this.setState({ data: this.props.data.filter(word => word.title.substring(0, filterLength).includes(text)) });
        console.log('hello there friend ', ',', this.state.data)
    }
    renderHeader = () => {
        return (
            <View style={{
                height: 110, backgroundColor: '#4286f4', alignItems: 'center'
            }}>
                <View style={{ width: '90%', backgroundColor: '#4286f4' }}>
                    <SearchBar
                        onChangeText={(text) => this.onChange(text)}
                        placeholder="Type Here..."
                    />
                </View>
                <View style={{
                    paddingLeft: 40,
                    width: '100%', height: 50, backgroundColor: '#4286f4', justifyContent: 'flex-start',
                    flexDirection: 'row', alignItems: 'center'
                }}>
                    <Text style={styles.font}>Mountains</Text><Text style={styles.font}>Stores</Text>
                </View>
            </View>
        )
    };
    _onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return { selected };
        });
    };

    _renderItem = ({ item }) => (
        
        <TouchableHighlight onPress={() =>
            this.props.navigate.navigate('Commerse')
        } >
            <BrandListView
                key={item.id}
                id={item.id}
                onPressItem={this._onPressItem}
                // selected={!!this.state.selected.get(item.id)}
                logo={item.img}
                trailsAvailable={item.trailsAvailable}
                trailsTotal={item.trailsTotal}
                weatherReport={item.weatherReport}
                brand={item.title}
            />
        </TouchableHighlight>
    );


    render() {
        
        return (

            <FlatList
                ListHeaderComponent={this.renderHeader}
                data={this.state.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}

            />
        );
    }
}
const styles = {

    font: {
        fontWeight: 'bold',
        fontSize: 15, paddingRight: 35,
        color: 'white',
    }
}