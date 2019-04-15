import React, { Component } from 'react';
import { View } from 'react-native';
import MountainListComp from '../../components/MountainListComp';
import NaviBar from '../../components/NaviBar';
import Drawer from 'react-native-drawer'
import LoadingGIF from '../../components/eventHandlers/LoadingGIF'
import DrawerContainer from '../../components/drawer/DrawerContainer';
import * as firebase from 'firebase'
export default class MountainFinder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AdminLiftTickets: [],
            load: true
        }
        this.closeControlPanel = this.closeControlPanel.bind(this);
    }
    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };

    componentDidMount() {
       
        //UAC
        //Get user location get all admins
        // in that location then filter admindiscription then call their images
        firebase.database()
            .ref('/adminDiscription')
            .once('value')
            .then((snapshot) => {
                users = snapshot.val()
                for (const key in users) {
                    users[key].mountainId = key
                    // State array should be updated this way see ProfileDictionary.js

                    // var joined = this.state.UserProfiles.concat(users);
                    // this.setState({ UserProfiles: joined })
                    this.state.AdminLiftTickets.push(users[key])
                }
            }).then(() => {
                this.setState({ load: false })
            })

    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.load ?
                        <LoadingGIF />
                        :
                        <Drawer
                            type="overlay"
                            tapToClose={true}
                            ref={(ref) => this._drawer = ref}
                            openDrawerOffset={0.2}
                            closedDrawerOffset={-3}
                            styles={drawerStyles}
                            content={<DrawerContainer navigation={navigation} />}
                        >
                            <View style={{ flex: 1 }}>
                                <NaviBar
                                    skiDates={this.props.navigation.state.params.skiDates}
                                    toggleDrawer={this.openControlPanel}
                                    navigation={navigation}
                                    location={this.props.navigation.state.params.address
                                        ? this.props.navigation.state.params.address
                                        : 'Location'} />
                                <View style={{
                                    flex: 4,
                                    justifyContent: 'flex-start'
                                }}>
                                    <View style={{
                                        width: '100%'

                                    }}>
                                        {/* INFO DATA */}
                                        <MountainListComp skiDates={this.props.navigation.state.params.skiDates} data={this.state.AdminLiftTickets} navigation={navigation} title='name' />
                                    </View>
                                </View>
                            </View>
                        </Drawer>
                }
            </View>
        );
    }
}
const drawerStyles = {
    drawer: {
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3,
        backgroundColor: 'white'
    },
    main: { paddingLeft: 3 },
}