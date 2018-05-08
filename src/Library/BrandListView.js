import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GeoDistanceIcon from './GeoDistanceIcon';
const SCREEN_WIDTH = Dimensions.get('window').width;
var icon;
export default class BrandListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 2
        }
    }
    componentDidMount() {
        console.log(this.props.key)
    }
    render() {
        const { brand, logo } = this.props;
        return (
            <View style={{
                width: '100%', height: 110,
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <View style={{
                    flex: 2, justifyContent: 'center', alignItems: 'center'
                }}>
                    <Image
                        source={this.props.logo}
                        style={{

                            height: 60, width: 60, borderRadius: 30
                        }}>

                    </Image>
                </View>
                <View style={{
                    flex: 6,
                    borderBottomColor: '#CED0CE',
                    borderBottomWidth: 1

                }}>

                    <View style={
                        {
                            flex: 2,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-end',
                            paddingLeft: 5, marginTop: 10
                        }
                    }>
                        <Text style={
                            {
                                fontSize: 25
                            }
                        }>
                            {brand}
                        </Text>
                    </View>

                    <View style={
                        {
                            flex: 4,

                            flexDirection: 'row',
                            paddingLeft: 10,
                            paddingTop: 5
                        }
                    }>
                        <View style={{
                            flex: 1
                        }}>
                            <Text style={styles.titleText}>Open Trails</Text>
                            <Text style={styles.subText}>
                                {this.props.trailsAvailable}/{this.props.trailsTotal}
                            </Text>
                        </View>

                        <View style={{
                            flex: 1,
                            alignItems: 'center'

                        }}>
                            <Text style={styles.titleText}>Snow</Text>
                            <Text style={styles.subText}>{this.props.weatherReport}</Text>
                        </View>

                    </View>

                </View>
                <View style={{
                    flex: 1.1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingTop: 10,
                    borderBottomWidth: 1, borderColor: '#CED0CE'

                }}>
                    <GeoDistanceIcon count={'2.0'} />
                </View>
                <View style={{
                    flex: 1.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomColor: "#CED0CE",
                    borderBottomWidth: 1
                }}>
                    <Icon name="angle-right" size={55} color="#CED0CE" />

                </View>
            </View>

        );
    }
}
const styles = {
    titleText: {
        fontSize: 20
    },
    subText: {
        color: '#9a9ea5',
        fontSize: 15
    }
}