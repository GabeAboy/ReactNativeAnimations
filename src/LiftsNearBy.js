import React, { Component } from 'react';
import { View } from 'react-native';
import MyListItem from './Library/MyListItem';
import * as dumbData from '../MockDTO/liftsNearBy';
import NaviBar from './Library/NaviBar';
import Drawer from 'react-native-drawer'
import DrawerContainer from './Library/DrawerContainer';
export default class LiftsNearBy extends Component {
    componentDidMount() {
        openControlPanel()
    }
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


    }
    render() {
        const { navigation } = this.props;
        return (
            <Drawer
                type="overlay"
                ref={(ref) => this._drawer = ref}
                openDrawerOffset={0.2}
                closedDrawerOffset={-3}
                styles={drawerStyles}
                content={<DrawerContainer />}
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
                            <MyListItem data={dumbData.default.data} navigate = {navigation} title='name' />
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