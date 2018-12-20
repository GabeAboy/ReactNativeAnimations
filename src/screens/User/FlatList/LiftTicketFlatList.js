
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions, FlatList, List } from 'react-native';
import { SearchBar } from 'react-native-elements'
import AdminLiftTicketDisplay from '../../Mountain/AdminLiftTicketDisplay';


export default class LiftTicketFlatList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        // Delete me
        this.setState({ data: this.props.data })
        console.log('Show errors', this.state, this.props)
    }

    _onPressItem() {
        console.log('pressed')
        // this.props.updateFunction()
    }
    onPressItem = this._onPressItem.bind(this)
    _renderItem = ({ item }) => (

        <View

            style={{ backgroundColor: 'white' }}
            key={item.id} >
            <FlatList
                style={{ backgroundColor: '#4286f4' }}
                data={this.props.data}// Comes from state and before that didMount
                renderItem={({ item }) => <AdminLiftTicketDisplay
                    button={() => {
                        this.setState({ EditLiftTickets: true })
                    }}
                    key={item.key}
                    title={item.title}
                    reguPrice={item.reguPrice}
                    holiPrice={item.holiPrice}
                    timeOne={item.timeOne}
                    timeTwo={item.timeTwo}
                    pathReference={item.pathReference}
                    profile={this.state.profile}
                    navigation={this.props.navigation}
                    commerse={true}
                />}
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