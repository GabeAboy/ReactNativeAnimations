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
    componentWillReceiveProps() {
        console.log('RECEIVING PROPS')
    }
    componentDidMount() {
        //UAC
        //Get user location get all admins
        // in that location then filter admindiscription then call their images
        firebase.database()
            .ref('/adminDiscription')
            .once('value')
            .then((snapshot) => {
                console.log('look I can do it', this.state)

                users = snapshot.val()
                console.log('user', users)
                for (const key in users) {
                    console.log('sdf', key)
                    users[key].mountainId = key
                    // State array should be updated this way see ProfileDictionary.js
                    
                    // var joined = this.state.UserProfiles.concat(users);
                    // this.setState({ UserProfiles: joined })
                    this.state.AdminLiftTickets.push(users[key])
                }
            }).then(() => {
                this.setState({ load: false })
            })
        // Merge the two
        // Compare location
        // Call for images display
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
                                        <MountainListComp data={this.state.AdminLiftTickets} navigate={navigation} title='name' />
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