import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Right, Left, Body, Icon } from 'native-base';

const cards = [
    {
        "session": "Adult Day/Twilight",
        "times": ['9am - 5pm', '1pm - Close'],
        "weekday": '$40.00',
        "weekend/holiday": '$67.00'
    }, {
        "session": "Adult Half Day",
        "times": ['9am - 5pm', '1pm - Close'],
        "weekday": '$40.00',
        "weekend/holiday": '$67.00'
    }, {
        "session": "Adult Night",
        "times": ['9am - 5pm', '1pm - Close'],
        "weekday": '$40.00',
        "weekend/holiday": '$67.00'
    }, {
        "session": "Adult Beech Pass",
        "times": ['9am - 5pm', '1pm - Close'],
        "weekday": '$40.00',
        "weekend/holiday": '$67.00'
    }, {
        "session": "Jr. & Sr. Day/Twilight",
        "times": ['9am - 5pm', '1pm - Close'],
        "weekday": '$40.00',
        "weekend/holiday": '$67.00'
    }
]
export default class DeckSwiperExample extends Component {
    delete = () => {
        console.log('asd')
    }
    render() {
        return (

            <View>
                <DeckSwiper
                    dataSource={cards}
                    renderItem={item =>
                        <Card
                            style={{ elevation: 3 }}>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={this.props.comp.img} />
                                    <Body>
                                        <Text>{item.session}</Text>
                                        <Text note>Click for purchase</Text>
                                    </Body>

                                </Left>
                                <Right>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 60, width: 55,backgroundColor:'green' }}>
                                        <Text>{item.weekday}</Text>
                                    </View>
                                </Right>
                            </CardItem>
                            <CardItem cardBody>
                                <TouchableOpacity onPress={() => { console.log('delete') }} style={{ height: 300, flex: 1, backgroundColor: 'red' }} >
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, backgroundColor: 'black' }}>
                                            <View style={{ flex: 1, backgroundColor: 'white' }} />
                                            <View style={{
                                                flex: 1,
                                                backgroundColor: 'red',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }} >
                                                <Text>{item.times}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, backgroundColor: 'blue' }}>
                                            <View style={{ flex: 1, backgroundColor: 'red',justifyContent:'center',alignItems:'center' }}>
                                                <View style = {{height:'65%',width:'40%',justifyContent:'space-between',alignItems:'center',backgroundColor:'white'}}>
                                                    <Text>High</Text>
                                                    <Text>40deg</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, backgroundColor: 'white',justifyContent:'center',alignItems:'center' }} >
                                            <View style = {{height:'65%',width:'40%',justifyContent:'space-between',alignItems:'center',backgroundColor:'blue'}}>
                                                    <Text>Low</Text>
                                                    <Text>10deg</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </CardItem>
                            <CardItem style={{ justifyContent: 'space-around' }}>
                                <Text>Wind Speed</Text>
                                <Text>Snow</Text>
                                <Text>Ice</Text>
                            </CardItem>
                        </Card>
                    }
                />
            </View>
        );
    }
}