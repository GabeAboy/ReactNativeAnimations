import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
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
                                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 50, width: 50 }}>
                                            <Text>{item.weekday}</Text>
                                        </View>
                                    </Right>
                                </CardItem>
                                <CardItem cardBody>
                                    <View style={{ height: 300, flex: 1,backgroundColor:'red' }} >

                                    </View>
                                </CardItem>
                                <CardItem style={{ justifyContent: 'space-around' }}>
                                    <Text>{this.props.comp.weatherReport}</Text>
                                    <Text>{item.name}</Text>
                                    <Text>{item.name}</Text>
                                </CardItem>
                                <Text  onPress = {()=>{console.log('delete')}} style = {{justifyContent:'center',width:'100%',height:20,backgroundColor:'red'}}>Delete</Text>
                            </Card>
                        }
                    />
                </View>
        );
    }
}