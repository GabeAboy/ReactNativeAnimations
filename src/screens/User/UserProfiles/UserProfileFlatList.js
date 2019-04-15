import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions, FlatList, List } from 'react-native';
import { SearchBar } from 'react-native-elements'
import UserProfileListUI from './UserProfileListUI';
import UserProfileRentalUI from './UserProfileRentalUI';


export default class MultiSelectList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        // Delete me
        this.setState({ data: this.props.data })
        console.log('Show errors', this.props)
    }

    // renderHeader = () => {
    //     return (
    //         <View style={{
    //             height: 110, backgroundColor: '#4286f4', alignItems: 'center'
    //         }}>


    //         </View>
    //     )
    // };
    _onPressItem() {

        this.props.updateFunction()
    }
    onPressItem = this._onPressItem.bind(this)
    _renderItem = ({ item }) => (

        <View

            style={{ backgroundColor: 'white' }}
            key={item.id} >

            {
                this.props.rental ?
                    <UserProfileRentalUI
                        key={item.id}
                        id={item.id}
                        onPressItem={this.onPressItem}
                        updateFunction={item.updateFunction}
                        weight={item.weight.amount ? item.weight.amount : 0}
                        weightMetric={item.weight.metric ? item.weight.metric : 0}
                        firstName={item.Name.first ? item.Name.first : 'default'}
                        lastName={item.Name.last ? item.Name.last : 'default'}
                        shoeSize={item.shoeSize.size ? item.shoeSize.size : 0}
                        shoeMetric={item.shoeSize.metric ? item.shoeSize.metric : 0}
                        mountainId={item.mountainId}
                        userProfileId={this.props.userProfileId}
                        Birthday={item.Birthday}
                        //selected={!!this.state.selected.get(item.id)}

                        navigation={this.props.navigation}

                    /> :
                    <UserProfileListUI
                        key={item.id}
                        id={item.id}
                        onPressItem={this.onPressItem}
                        updateFunction={item.updateFunction}
                        weight={item.weight.amount ? item.weight.amount : 0}
                        weightMetric={item.weight.metric ? item.weight.metric : 0}
                        firstName={item.Name.first ? item.Name.first : 'default'}
                        lastName={item.Name.last ? item.Name.last : 'default'}
                        shoeSize={item.shoeSize.size ? item.shoeSize.size : 0}
                        shoeMetric={item.shoeSize.metric ? item.shoeSize.metric : 0}
                        mountainId={item.mountainId}
                        userProfileId={this.props.userProfileId}
                        Birthday={item.Birthday}
                        //selected={!!this.state.selected.get(item.id)}

                        navigation={this.props.navigation}

                    />
            }
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