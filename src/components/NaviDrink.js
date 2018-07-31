import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class NaviBar extends Component {
    componentDidMount() {
        console.log('nah', this.props.navigation)
    }
    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }

    render() {
        return (
            <View style={{ width: '100%' }}>
                <View style={{ width: '100%', height: 24 }} />
                <View style={styles.nav}>
                    <Icon onPress={() => {
                        console.log('true')
                        this.props.navigation.goBack()
                    }} name="angle-left" size={35} color="white" />
                    {
                        this.props.profile ?
                            <Text style = {{marginLeft:5,fontSize:20}}> Profiles </Text>
                            :
                            null
                    }
                </View>
            </View>
        )
    }
}

const styles = {
    nav: {
        backgroundColor: '#4286f4',
        paddingTop: 20,
        paddingLeft: 30,
        width: '100%', height: 65,
        flexDirection:'row',
        alignItems:'center'
    },
}
