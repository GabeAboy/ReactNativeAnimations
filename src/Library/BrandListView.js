import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;
class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 2
        }
    }
    render() {
        const { title, backgroundColor, textColor } = this.props;
        return (
            <View style={{
                width: 320, height: 45, backgroundColor: 'red',
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center'
                }}>
                    <Icon name="map-marker" size={30} color="#900" style={{ position: 'absolute', }} />
                    <View style={{
                        height: 15, width: 15,
                        backgroundColor: 'green',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 10
                        }}>{this.state.count}</Text>
                    </View>
                </View>
                <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}><Text>{this.props.brand}</Text></View>
            </View>

        );
    }
}

export default Button;