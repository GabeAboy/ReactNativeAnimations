import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import NaviBar from '../../components/NaviBar'
// import Carousel from '../../components/Carousel'
// import Icon from 'react-native-vector-icons/FontAwesome';
// class Part extends React.Component {
//     render() {
//         { }
//         return (
//             <TouchableOpacity style={{
//                 flex: 1,
//                 borderWidth: 4, borderColor: 'blue'
//             }}>

//             </TouchableOpacity>
//         )
//     }
// }

// import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import Tab1 from './Tabs/tabOne';
import Tab2 from './Tabs/tabTwo';
import Tab3 from './Tabs/tabThree';


export default class MountainStore extends Component {
  render() {
    return (
      <View style={styles.ball}>
        <Container>
          <Header hasTabs />
          <Tabs renderTabBar={() => <ScrollableTab />}>
            <Tab heading="Tab1">
              <Tab1 />
            </Tab>
            <Tab heading="Tab2">
              <Tab2 />
            </Tab>
            <Tab heading="Tab3">
              <Tab3 />
            </Tab>
          </Tabs>
        </Container>
      </View>
    );
  }
}
const styles = {
  ball: {
    flex: 1, justifyContent: 'space-around'
  }
}

// ​export default class MountainStore extends Component {
//   render() {
//     return (
      // <Container>
      //   <Header hasTabs/>
      //   <Tabs renderTabBar={()=> <ScrollableTab />}>
      //     <Tab heading="Tab1">
      //       <Tab1 />
      //     </Tab>
      //     <Tab heading="Tab2">
      //       <Tab2 />
      //     </Tab>
      //     <Tab heading="Tab3">
      //       <Tab3 />
      //     </Tab>
      //   </Tabs>
      // </Container>
//     );
//   }
// }
