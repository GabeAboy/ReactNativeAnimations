import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GeoDistanceIcon from './GeoDistanceIcon';
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
                width: '100%', height: 110,
                flexDirection: 'row'
            }}>
                <GeoDistanceIcon count={this.state.count} />
                <View style={{
                    flex: 4,
                    borderColor: 'grey',
                    backgroundColor: 'black', flexDirection:'row',
                    borderTopWidth: 1, justifyContent: 'center',
                    paddingLeft: 25, alignItems: 'flex-start'
                }}>

                </View>
                <View style = {
                    {
                        backgroundColor:'red', flex:1
                    }
                }>

                </View>

                <View style = {
                    {
                        backgroundColor:'blue', flex:4
                    }
                }>

                </View>
            </View>

        );
    }
}

export default Button;