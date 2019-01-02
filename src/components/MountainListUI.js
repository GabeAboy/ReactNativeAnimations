import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Asset, AppLoading } from 'expo';
import GeoDistanceIcon from './GeoDistanceIcon';
import firebase from 'firebase'
export default class MountainListUI extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 2,
            image: '',
            isCloud: false,
            isReady: false
        }
        this._getMountainIcon.bind(this)
    }
    componentDidMount() {

    }

    _getMountainIcon = async () => {
        var pathReference = firebase.storage().ref(`${this.props.mountainId}/icon/mountainIcon`)
        await new Promise((resolve, reject) => {
            pathReference.getDownloadURL().then(function (url) {
                this.setState({ image: url })
                this.setState({ isCloud: true })
                this.props.autoHideSplash = false
                resolve()
            }.bind(this))
                .catch((e) => {
                    this.setState({ isCloud: false })
                    var defaultImage = require('../../img/compLogo.jpg')
                    this.setState({ image: defaultImage })
                    reject()
                })
            resolve()
        })

    }
    render() {
        const { brand } = this.props;

        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._getMountainIcon}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }

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

                        source={this.state.isCloud ? { uri: this.state.image } : this.state.image}
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
            </View >

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