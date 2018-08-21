import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions, FlatList, List } from 'react-native';
import { SearchBar } from 'react-native-elements'
import UserProfileListUI from './UserProfileListUI';


export default class MultiSelectList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        // Delete me
        this.setState({ data: this.props.data })
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
            
            </View>
        )
    };
    _onPressItem() {
        console.log('Hey button worked')
    }
    _renderItem = ({ item }) => (
        
        <TouchableHighlight
        style={{backgroundColor:'white'}}
        key={item.id} onPress={() =>
            console.log('clicked')
        } >
            <UserProfileListUI
                key={item.id}
                id={item.id}
                onPressItem={this._onPressItem}

                weight={item.weight.amount}
                weightMetric={item.weight.metric}
                firstName={item.Name.first}
                lastName={item.Name.last}
                shoeSize={item.shoeSize.size}
                shoeMetric={item.shoeSize.metric}
                //selected={!!this.state.selected.get(item.id)}

                navigation={this.props.navigation}

            />
        </TouchableHighlight>
    );


    render() {


        return (

            <FlatList
            style = {{backgroundColor:'#4286f4'}}
                key={this.key}
                ListHeaderComponent={this.renderHeader}
                data={this.state.data}
                extraData={this.state}
                keyExtractor={(item, index) => index}
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