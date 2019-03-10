import React, { Component } from 'react';
import { View, TouchableHighlight, Dimensions, FlatList, List, Text } from 'react-native';
import MountainListUI from './MountainListUI';
import { Container, Header, Item, Input, Button, } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class MultiSelectList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
        //     <View style={{ width: '90%', flexDirection: 'row' }}>
        //         <Item>
        //             <Icon name="ios-search" />
        //             <Input placeholder="Search" />
        //             <Icon name="ios-people" />
        //         </Item>
        //         <Icon style={{
        //             marginBottom: 5,
        //             marginLeft: 5
        //         }} name="map-marker" size={27} color="white" />
        //     </View>
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }
    componentDidMount() {
        this.setState({ data: this.props.data })
    }

    renderHeader = () => {
        return (
            <View style={{
                height: 55,
                flexDirection: 'row'
            }}>
                <Container>
                    <Header noShadow={true} searchBar style ={{backgroundColor:'#4286F4'}}>
                        <Item>

                            <Input placeholder="Search" />
                            <View style={{
                                backgroundColor: '#2A569C',
                                height: '100%',
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Icon style={{
                                
                                }} name="search" size={20} color="#CBDEFC" />
                            </View>

                        </Item>
                        <Button transparent>
                            <Text>Search</Text>
                        </Button>

                    </Header>

                </Container>
                <TouchableHighlight
                    onPress={
                        () => {
                            this.props.navigation('GetLocation', { navigation: this.props.navigation })
                        }
                    }
                    style={{
                        justifyContent: 'center',
                        alignItems:'center',
                        width:50,
                        backgroundColor:"#4286F4"
                    }} >

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: '100%',
                        width: '100%',
                    }} >

                        <Icon style={{
                       
                        }} name="map-marker" size={25} color="#CBDEFC" />
                        <Text>{this.props.location}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    };
    _onPressItem() {
    }
    _renderItem = ({ item }) => (
        <TouchableHighlight key={item.id} onPress={() => {

            this.props.navigate.navigate('MountainStore', { data: item, navigation: this.props.navigate, skiDates: this.props.skiDates })
        }
        } >
            <MountainListUI
                key={item.id}
                id={item.id}
                skiDates={this.props.skiDates}
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