import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import Tab1 from './Tabs/tabOne';
import Tab2 from './Tabs/tabTwo';
import Tab3 from './Tabs/tabThree';
import NaviBar from '../../components/NaviBar';
import firebase from 'firebase'
import Drawer from 'react-native-drawer'
import DrawerContainer from '../../components/drawer/DrawerContainer';
import RentalEquipmentDisplay from '../Mountain/FlatList_UI/RentalEquipmentDisplay'
export default class MountainStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      LiftTickets: [],
      Rental: []
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
    this.getTicketData()
    this.getRentalData()
  }

  getTicketData = async () => {
    let TicketData = new Promise((resolve, reject) => {
      //Mountain ID passed down as props
      firebase.database().ref('/liftTicketDiscription/')
        .child(this.props.navigation.state.params.data.mountainId)
        .once('value')
        .then((snapshot) => {
          if (!_.isEmpty(snapshot.val())) {


            const snap = snapshot.val()

            let result = Object.keys(snap).map((key) => {
              snap[key].pathReference = key
              return snap[key];
            });
            this.setState({ LiftTickets: result })

            resolve(result)
            // for (const key in users) {
            //     users[key].mountainId = key
            //     // The correct way to change array state
            //     var joined = this.state.UserProfiles.concat(users[key]);
            //     this.setState({ UserProfiles: joined })
            //}
          }
          else {
            this.setState({ LiftTickets: [] })
            resolve()
          }
        })
        .then(() => {

          this.setState({ dataLoaded: true })
          resolve()
        }).catch((e) => {
          console.log(
            'err', e
          )
          reject()
        })
    });
    let answer = await TicketData;
    return answer;
  };

  getRentalData = async () => {
    let RentalData = new Promise((resolve, reject) => {
      //Mountain ID passed down as props
      firebase.database().ref('/rentalEquipment/')
        .child(this.props.navigation.state.params.data.mountainId)
        .once('value')
        .then((snapshot) => {
          if (!_.isEmpty(snapshot.val())) {

            console.log('Rental', snapshot)
            const snap = snapshot.val()

            let result = Object.keys(snap).map((key) => {
              snap[key].pathReference = key
              return snap[key];
            });
            this.setState({ Rental: result })

            resolve(result)

          }
          else {
            this.setState({ Rental: [] })
            resolve()
          }
        }).then(() => {

          this.setState({ dataLoaded: true })
          resolve()
        }).catch((e) => {
          console.log(
            'err', e
          )
          reject()
        })
    });
    let answer = await RentalData;
    return answer;
  };
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Drawer
          type="overlay"
          tapToClose={true}
          ref={(ref) => this._drawer = ref}
          openDrawerOffset={0.2}
          closedDrawerOffset={-3}
          styles={drawerStyles}
          content={<DrawerContainer navigation={navigation} />}
        >
        <NaviBar toggleDrawer={this.openControlPanel} skiDates={this.props.navigation.state.params.skiDates} navigation={this.props.navigation} MountainFinder={false} />
        {/* <Header searchBar={true} hasTabs /> */}
        <Tabs renderTabBar={() => <ScrollableTab backgroundColor='#4286f4' />}>
          <Tab tabStyle={{ flex: 1, backgroundColor: '#4286f4' }} activeTabStyle={{ flex: 1, backgroundColor: '#4286f4' }} heading="Pictures">
            <Tab1 />
          </Tab>
          <Tab tabStyle={{ flex: 1, backgroundColor: '#4286f4' }} activeTabStyle={{ flex: 1, backgroundColor: '#4286f4' }} heading="Tickets">
            <Tab2 data={this.state.LiftTickets} />
          </Tab>
          <Tab tabStyle={{ flex: 1, backgroundColor: '#4286f4' }} activeTabStyle={{ flex: 1, backgroundColor: '#4286f4' }} heading="Rentals">
            <Tab3 data={this.state.Rental} />
          </Tab>
        </Tabs>
        </Drawer>
      </Container >
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