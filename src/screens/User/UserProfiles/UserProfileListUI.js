import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import GeoDistanceIcon from '../../../components/GeoDistanceIcon'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class UserProfileListUI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photoURL: false
        }
    }
    render() {
        return (
            <View style={{
                width: '100%', height: 110,
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <View style={{
                    flex: 2, justifyContent: 'center', alignItems: 'center'
                }}>
                    <Image style={{ height: "100%", borderRadius: 40, width: "100%" }}
                        source={this.state.photoURL ? source = { uri: this.state.photoURL } : require('../../../../img/default-user.png')}
                        resizeMode='contain' />

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
                            {'xx'}
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
                                xxxx/xxxx
                            </Text>
                        </View>

                        <View style={{
                            flex: 1,
                            alignItems: 'center'

                        }}>
                            <Text style={styles.titleText}>Snow</Text>
                            <Text style={styles.subText}>xxxx</Text>
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
                    
                </View>
                <View style={{
                    flex: 1.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomColor: "#CED0CE",
                    borderBottomWidth: 1
                }}>
                    <Icon name="pencil-square-o" size={30} color="#CED0CE" />

                </View>
            </View>
            // <View style={{ flex: 1.4, flexDirection: 'row',backgroundColor:'white' }}>
            //     <View style={{ flex: 1 }} >
            //         <Image style={{ height: "100%", borderRadius: 40, width: "100%" }}
            //             source={this.state.photoURL ? source = { uri: this.state.photoURL } : require('../../../../img/default-user.png')}
            //             resizeMode='contain' />
            //     </View>

            //     <View style={{ flex: 3 }} >
            //         <View style={{ width: '100%' }}>
            //             <Text style={{ fontSize: 31 }}>{this.props.firstName}</Text>
            //         </View>

            //         <View style={{
            //             flex: 1,
            //             flexDirection: 'row',
            //         }} >
            //             <View style={{ flex: 1 }}>
            //                 <Text style={{ flex: 1, fontSize: 30 }}>Height</Text>
            //                 <Text style={{ flex: 1, fontSize: 30 }}>{this.props.height}</Text>
            //             </View>
            //             <View style={{ flex: 1 }}>
            //                 <Text style={{ flex: 1, fontSize: 30 }}>ShoeSize</Text>
            //                 <Text style={{ flex: 1, fontSize: 30 }}>{this.props.shoeSize}</Text>
            //             </View>
            //         </View>
            //     </View>
            // </View>

        )
    }
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#4286f4'
    },
    titleText: {
        fontSize: 20
    },
    subText: {
        color: '#9a9ea5',
        fontSize: 15
    }
});