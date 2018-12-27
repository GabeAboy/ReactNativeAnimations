import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import Tab1 from './Tabs/tabOne';
import Tab2 from './Tabs/tabTwo';
import Tab3 from './Tabs/tabThree';
import NaviBar from '../../components/NaviBar';
import firebase from 'firebase'

import RentalEquipmentDisplay from '../Mountain/FlatList_UI/RentalEquipmentDisplay'
export default class MountainStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      LiftTickets: [],
      Rental:[]
    }
  }
  componentDidMount() {
    // console.log('GOT store??',this.props.nagivation.state.params.skiDates)
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

            console.log(snapshot)
            const snap = snapshot.val()

            let result = Object.keys(snap).map((key) => {
              snap[key].pathReference = key
              return snap[key];
            });
            this.setState({ LiftTickets: result })
            console.log("\n\n\n Tickets ", result)
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

            console.log('Rental',snapshot)
            const snap = snapshot.val()

            let result = Object.keys(snap).map((key) => {
              snap[key].pathReference = key
              return snap[key];
            });
            this.setState({ Rental: result })
            console.log("\n\n\ndsaaddsa", result)
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
    return (
      <Container>
        <NaviBar skiDates={this.props.navigation.state.params.skiDates} navigation={this.props.navigation} MountainFinder={false}/>
        {/* <Header searchBar={true} hasTabs /> */}
        <Tabs renderTabBar={() => <ScrollableTab style={{ backgroundColor: 'blue' }} />}>
          <Tab tabStyle={{ flex: 1 }} activeTabStyle={{ flex: 1 }} heading="Pictures">
            <Tab1 />
          </Tab>
          <Tab tabStyle={{ flex: 1 }} activeTabStyle={{ flex: 1 }} heading="Tickets">
            <Tab2 data={this.state.LiftTickets} />
          </Tab>
          <Tab tabStyle={{ flex: 1 }} activeTabStyle={{ flex: 1 }} heading="Rentals">
            <Tab3 data={this.state.Rental}/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
const styles = {
  ball: {

    flex: 1, justifyContent: 'space-around'
  }
}
