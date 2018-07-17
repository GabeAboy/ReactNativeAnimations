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
import PasswordReset from '../screens/Authentication/PasswordReset';

//Mountain
import MountainProfile from '../screens/Mountain/MountainProfile'
import EditProfile from '../screens/Mountain/EditDiscription'
import EditLiftTickets from '../screens/Mountain/EditLiftTickets'

//Event handlers
import LoadingGIF from '../components/eventHandlers/LoadingGIF'
import DisplayError from '../components/eventHandlers/DisplayError'
import GetLocation from '../components/GetLocation'
const Routes = StackNavigator(
    {
        GetLocation: { screen: GetLocation },
        LandingPage: { screen: LandingPage },
        MountainFinder: { screen: MountainFinder },
        MountainProfile: { screen: MountainProfile },
        EditLiftTickets: { screen: EditLiftTickets },

        LoadingGIF: { screen: LoadingGIF },
        //Main frames

        MountainRegistration: { screen: MountainRegistration },
        EditProfile: { screen: EditProfile },

        MountainStore: { screen: MountainStore },
        //Registrations
        LogIn: { screen: LogIn },
        SignUp: { screen: SignUp },

        //Events
        DisplayError: { screen: DisplayError },

        //Authentication
        PasswordReset: { screen: PasswordReset }
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