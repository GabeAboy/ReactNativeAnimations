import { StackNavigator } from 'react-navigation';

//User Story screens
import LandingPage from '../screens/LandingPage';

//User
import MountainFinder from '../screens/User/MountainFinder';
import MountainStore from '../screens/User/MountainStore';

//Authentication
import LogIn from '../screens/Authentication/LogIn';
import SignUp from '../screens/Authentication/SignUp'
import MountainRegistration from '../screens/Authentication/MountainRegistration'

//Mountain
import MountainProfile from '../screens/Mountain/MountainProfile'
import EditProfile from '../screens/Mountain/EditDiscription'

//Event handlers
import LoadingGIF from '../components/eventHandlers/LoadingGIF'
import DisplayError from '../components/eventHandlers/DisplayError'
const Routes = StackNavigator(
    {
        
        LandingPage: { screen: LandingPage },
        MountainProfile: { screen: MountainProfile },
        LoadingGIF: { screen: LoadingGIF },
        //Main frames
        
        MountainRegistration: { screen: MountainRegistration },
        MountainFinder: { screen: MountainFinder },
        EditProfile: { screen: EditProfile },
        MountainStore: { screen: MountainStore },
        
        //Registrations
        LogIn: { screen: LogIn },
        SignUp: { screen: SignUp },

        //Events
        DisplayError: { screen: DisplayError }
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