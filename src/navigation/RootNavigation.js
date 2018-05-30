import { StackNavigator } from 'react-navigation';

//User Story screens
import LandingPage from '../screens/LandingPage';
import MountainFinder from '../screens/MountainFinder';
import MountainStore from '../screens/MountainStore';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp'
import MountainRegistration from '../screens/MountainRegistration'
import LoadingGIF from '../components/eventHandlers/LoadingGIF'
import DisplayError from '../components/eventHandlers/DisplayError'
import MountainProfile from '../screens/MountainProfile'

const Routes = StackNavigator(
    {
        LandingPage: { screen: LandingPage },
        LoadingGIF: { screen: LoadingGIF },
        //Main frames
        MountainRegistration: { screen: MountainRegistration },
        MountainFinder: { screen: MountainFinder },
        MountainStore: { screen: MountainStore },
        MountainProfile: { screen: MountainProfile},

        //Registrations
        LogIn: { screen: LogIn },
        SignUp: { screen: SignUp },

        //Events
        DisplayError: { screen: DisplayError}
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