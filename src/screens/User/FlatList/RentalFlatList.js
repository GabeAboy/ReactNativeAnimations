import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions, FlatList, List } from 'react-native';
import { SearchBar } from 'react-native-elements'
import RentalListUI from '../../Mountain/FlatList_UI/RentalEquipmentDisplay';
import firebase from 'firebase'
import { Asset, AppLoading } from 'expo';

export default class RentalFLatList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            profile:[]
        }
    }
    componentDidMount() {
        // Delete me
        console.log("enter1")
        firebase.auth().onAuthStateChanged((profile) => {
            console.log("enter2j")
            this.setState({ userProfileId: profile.uid })
            this.GetUserProfiles(profile.uid)
        })
        this.setState({ data: this.props.data })
    }

    _onPressItem() {
        // this.props.updateFunction()
    }

    onPressItem = this._onPressItem.bind(this)

    GetUserProfiles = async (userProfileId) => {
        console.log("enter3")
        var profile;
        firebase.auth().onAuthStateChanged((profile) => {
            console.log("enter2j")
            this.setState({ userProfileId: profile.uid })
            profile = profile.uid
            // this.GetUserProfiles(profile.uid)
        })
        let DoesUserHaveData = new Promise((resolve, reject) => {
            console.log("enter4")
            firebase.database()
                .ref(`/userProfiles`)
                .child(userProfileId)
                .once('value')
                .then((snapshot) => {
                    console.log("enter5", snapshot)
                    if (!_.isEmpty(snapshot.val())) {


                        const snap = snapshot.val()
                        console.log("here is some info "+snap)
                        let result = Object.keys(snap).map((key) => {
                            snap[key].pathReference = key
                            return snap[key];
                        });
                        this.setState({ UserProfiles: result })
                        resolve(result)
                        // for (const key in users) {
                        //     users[key].mountainId = key
                        //     // The correct way to change array state
                        //     var joined = this.state.UserProfiles.concat(users[key]);
                        //     this.setState({ UserProfiles: joined })
                        //}
                    }
                    else {
                        this.setState({ UserProfiles: [] })
                        resolve()
                    }
                }).then(() => {
                    resolve()
                }).catch((e) => {
                    reject(e)
                    console.log('e', e)
                })
        })

        let answer = await DoesUserHaveData
        this.setState({ loading: false })
        // TODO HERE WAIT FOR ANSWER 
        this.setState({profile:answer})
        console.log("here is answer ", answer)

    }
    _renderItem = ({ item }) => (

        <View

            style={{ justifyContent: 'center' }}
            key={item.id} >
            <FlatList
                style={{ flex: 1 }}
                data={this.state.data}// Comes from state and before that didMount
                // profiles={this.state.profile}
                renderItem={({ item }) =>
                    <RentalListUI
                        button={() => {
                            this.setState({ EditRentalEquipment: false })
                        }}
                        key={item.key}
                        title={item.title}
                        brand={item.brand}
                        price={item.price}
                        size={item.size}
                        type={item.type}
                        starCount={item.starCount}
                        category={item.category}
                        profile={this.state.profile}
                        navigation={this.props.navigation}
                        commerse={true}
                    />}


            />
        </View>
    );


    render() {

        if (!this.state.isReady) {
            return (
              <AppLoading
                startAsync={this.GetUserProfiles}
                onFinish={() => this.setState({ isReady: true })}
                onError={console.warn}
              />
            );
          }
        return (
            
            <FlatList
                style={{ flex: 1 }}
                key={this.key}
                // ListHeaderComponent={this.renderHeader}
                data={this.props.data}
                // profiles={this.state.profile}
                updateFunction={this.props.updateFunction}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this._renderItem}

            />
        );
    }
}
const styles = {

    font: {
        fontWeight: 'bold',
        fontSize: 15, paddingRight: 35,
        color: 'white',
    }
}