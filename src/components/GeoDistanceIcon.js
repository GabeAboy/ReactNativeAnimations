import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class GeoDistanceIcon extends Component {

    render(){
        return (
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center'
            }}>
                <Icon name="map-marker" size={35} color="#9a9ea5" style={{ position: 'absolute' }} />
                <View style={{
                    height: 21, width: 21,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top:22,
                    left:1,
                    backgroundColor:'black'
                   
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 10,
                        fontWeight:'bold'
                    }}>{this.props.count}</Text>
                </View>
            </View>
        );
    }
}

export default GeoDistanceIcon;