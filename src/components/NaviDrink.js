import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class NaviDrink extends React.Component {
    render() {
        if (this.props.comp) {
            return (
                <Text style={{
                    paddingTop: 15,
                    paddingLeft: 5
                }}>{this.props.comp}</Text>
            )
        }
        else {
            return (
                <Image style={{ flex: 1, position: 'absolute', top: 10, left: 70, height: 30, width: 75 }} source={require('../../img/spot.png')}
                    resizeMode='contain' />
            )
        }
    }
}

export default class NaviBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }

    render() {
        return (
            <View>
                <View style={{ width: '100%', height: 24 }} />
                <View style={styles.nav}>
                    <Icon onPress={() => {
                        this.props.navigate.goBack()
                    }} name="angle-left" size={35} color="white" />
                </View>
            </View>
        );
    }
}

const styles = {
    nav: {
        paddingTop: 20,
        paddingLeft: 30,
        width: '100%', height: 70
    },
}
