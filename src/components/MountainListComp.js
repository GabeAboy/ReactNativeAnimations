import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions, FlatList, List } from 'react-native';
import MountainListUI from './MountainListUI';
import { SearchBar } from 'react-native-elements'


export default class MultiSelectList extends React.PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount() {
        // Delete me
        console.log('props',this.props)
        this.setState({data:this.props.data})
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
    _onPressItem(){
        console.log('Hey button worked')
    }
    _renderItem = ({ item }) => (
        
        <TouchableHighlight key={item.id} onPress={() =>
            this.props.navigate.navigate('MountainStore',{data:item,navigation:this.props.navigate})
        } >
            <MountainListUI
                key={item.id}
                id={item.id}
                onPressItem={this._onPressItem}
                mountainId={item.mountainId}
                //selected={!!this.state.selected.get(item.id)}
                logo={item.profileImage}
                trailsAvailable={item.numerator}
                trailsTotal={item.denominator}
                weatherReport={item.snowCondition}
                brand={item.businessName}
                navigation={this.props.navigation}
                
            />
        </TouchableHighlight>
    );


    render() {
        
        return (

            <FlatList
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