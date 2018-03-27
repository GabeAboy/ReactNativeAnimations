import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class GeoDistanceIcon extends Component {

    render(){
        return (
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center'
            }}>
                <Icon name="map-marker" size={55} color="#900" style={{ position: 'absolute' }} />
                <View style={{
                    height: 20, width: 20,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top:20,
                    left:16,
                    backgroundColor:'green'
                   
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 10
                    }}>{this.props.count}</Text>
                </View>
            </View>
        );
    }
}

export default GeoDistanceIcon;