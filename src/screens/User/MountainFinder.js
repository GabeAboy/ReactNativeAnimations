import React, { Component } from 'react';
import { View } from 'react-native';
import MountainListComp from '../../components/MountainListComp';
import * as dumbData from '../../../MockDTO/liftsNearBy';
import NaviBar from '../../components/NaviBar';
import Drawer from 'react-native-drawer'
import DrawerContainer from '../../components/drawer/DrawerContainer';
import * as firebase from 'firebase'
export default class MountainFinder extends Component {
    constructor(props) {
        super(props)
        this.state = {
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

        firebase.database().ref('/users')
            .once('value')
            .then((snapshot) => {
                console.log(snapshot)
                const snap = snapshot.val()
                console.log(snap)

            })

        firebase.database().ref('/permissions')
            .once('value')
            .then((snapshot) => {
                console.log(snapshot)
                const snap = snapshot.val()


            })
            // Merge the two
            // Compare location
            // Call for images display
    }

    render() {
        const { navigation } = this.props;
        return (
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
                    <NaviBar toggleDrawer={this.openControlPanel} navigation={this.openControlPanel} />
                    <View style={{
                        flex: 4,
                        justifyContent: 'flex-start'
                    }}>
                        <View style={{
                            width: '100%'

                        }}>
                            <MountainListComp data={dumbData.default.data} navigate={navigation} title='name' />
                        </View>
                    </View>
                </View>
            </Drawer>
        );
    }
}
const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, backgroundColor: 'white' },
    main: { paddingLeft: 3 },
}