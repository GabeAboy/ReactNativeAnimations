import { StackNavigator } from 'react-navigation';

//User Story screens

import LandingPage from '../screens/LandingPage';
import MountainFinder from '../screens/MountainFinder';
import MountainStore from '../screens/MountainStore';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp'

const Routes = StackNavigator(

    {
        MountainFinder: { screen: MountainFinder },
        MountainStore: { screen: MountainStore },
        LandingPage: { screen: LandingPage },
        LogIn: { screen: LogIn },
        SignUp: { screen: SignUp },
    },
    {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        }
    }
);

module.exports = Routes