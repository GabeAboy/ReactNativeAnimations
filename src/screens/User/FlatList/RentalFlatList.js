import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions, FlatList, List } from 'react-native';
import { SearchBar } from 'react-native-elements'
import RentalListUI from '../../Mountain/FlatList_UI/RentalEquipmentDisplay';


export default class RentalFLatList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        // Delete me
        this.setState({ data: this.props.data })
    }

    _onPressItem() {
        // this.props.updateFunction()
    }
    onPressItem = this._onPressItem.bind(this)
    _renderItem = ({ item }) => (

        <View

            style={{ justifyContent: 'center' }}
            key={item.id} >
            <FlatList
                style={{ flex:1 }}
                data={this.state.data}// Comes from state and before that didMount
                renderItem={({ item }) =>
                    <RentalListUI
                        button={() => {
                            this.setState({ EditRentalEquipment: false })
                        }}
                        key={item.key}
                        title={item.title}
                        brand={item.brand}
                        price={item.price}
                        size={item.size}
                        type={item.type}
                        starCount={item.starCount}
                        category={item.category}
                        profile={this.state.profile}
                        navigation={this.props.navigation}
                        commerse={true}
                    />}
            // contentContainerStyle={{ flexGrow: 1 }}

            />
        </View>
    );


    render() {


        return (

            <FlatList
                style={{ flex: 1 }}
                key={this.key}
                // ListHeaderComponent={this.renderHeader}
                data={this.props.data}
                updateFunction={this.props.updateFunction}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
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