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
                    borderBottomColor: '#CED0CE',
                    borderBottomWidth: 1

                }}>

                    <View style={
                        {
                            flex: 2,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-end',
                            paddingLeft: 5
                        }
                    }>
                        <Text style={
                            {
                                fontSize: 25,
                            }
                        }>Smugglers CrNotch</Text>
                    </View>

                    <View style={
                        {
                            flex: 4,
                            flexDirection: 'row',
                            paddingLeft: 5,
                            paddingTop: 10
                        }
                    }>
                        <View style={{
                            flex: 1
                        }}>
                            <Text style = {styles.titleText}>Open Trails</Text>
                            <Text style = {styles.subText}>7/10</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            
                        }}>
                            <Text style = {styles.titleText}>Snow</Text>
                            <Text style = {styles.subText}>Powder</Text>
                        </View>

                    </View>

                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomColor: "#CED0CE",
                    borderBottomWidth: 2
                }}>
                    <Icon name="angle-right" size={55} color="#CED0CE" />

                </View>
            </View>

        );
    }
}
const styles = {
    titleText: {
        fontSize:20
    },
    subText:{
        color:'#9a9ea5',
        fontSize:15
    }
}
export default Button;