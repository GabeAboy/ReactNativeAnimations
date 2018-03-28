import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList, List } from 'react-native';
import BrandListView from './BrandListView';
import { SearchBar } from 'react-native-elements'


export default class MultiSelectList extends React.PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount(){
        this.setState({ data: this.props.data})
    }

    state = { selected: new Map() };
    _keyExtractor = (item, index) => item.id;
    onChange = (text) => {
        var filterLength = text.length;
        this.setState({data: this.props.data.filter(word => word.title.substring(0,filterLength).includes(text))});
        console.log('hello there friend ',',',this.state.data)
    }
    renderHeader = () => {
        return <SearchBar onChangeText={(text) => this.onChange(text)} placeholder="Type Here..." lightTheme round />;
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
        <BrandListView
            key={item.id}
            id={item.id}
            onPressItem={this._onPressItem}
            // selected={!!this.state.selected.get(item.id)}
            logo={item.img}
            trailsAvailable={item.trailsAvailable}
            trailsTotal = {item.trailsTotal}
            weatherReport={item.weatherReport}
            brand={item.title}
        />
    );
  

    render() {
        return (
            <FlatList
                stickyHeaderIndices={[0]}
                ListHeaderComponent={this.renderHeader}
                data={this.state.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                
            />
        );
    }
}