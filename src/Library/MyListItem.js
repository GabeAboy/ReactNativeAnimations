import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList, List } from 'react-native';
import BrandListView from './BrandListView';
import { SearchBar } from 'react-native-elements'


export default class MultiSelectList extends React.PureComponent {
    state = { selected: new Map() };

    _keyExtractor = (item, index) => item.id;
    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
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
            id={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            brand={item.title}
        />
    );

    render() {
        return (
            <FlatList
                ListHeaderComponent={this.renderHeader}
                data={this.props.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}