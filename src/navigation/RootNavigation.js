import { createStackNavigator } from 'react-navigation';

//User Story screens
import LandingPage from '../screens/LandingPage';

//User
import MountainFinder from '../screens/User/MountainFinder';
import MountainStore from '../screens/User/MountainStore';
import ProfileDictionary from '../screens/User/ProfileDictionary'
import AddProfile from '../screens/User/AddProfile'
import Navi from '../components/NaviBar'
//Authentication
import LogIn from '../screens/Authentication/LogIn';
import SignUp from '../screens/Authentication/SignUp'
import MountainRegistration from '../screens/Authentication/MountainRegistration'
import PasswordReset from '../screens/Authentication/PasswordReset';
import ShoppingCart from '../screens/User/ShoppingCart/ShoppingCart'
//Mountain
import MountainProfile from '../screens/Mountain/MountainProfile'
import EditProfile from '../screens/Mountain/EditDiscription'
import EditLiftTickets from '../screens/Mountain/EditLiftTickets'
import EditRentalEquipment from '../screens/Mountain/EditRentalEquipment'

//Event handlers
import LoadingGIF from '../components/eventHandlers/LoadingGIF'
import DisplayError from '../components/eventHandlers/DisplayError'
import GetLocation from '../components/GetLocation'
import RentalEquipmentDisplay from '../screens/Mountain/FlatList_UI/RentalEquipmentDisplay'
import DatePicker from '../screens/User/DatePicker'
import PurchaseItemDisplay from '../screens/User/ShoppingCart/PurchaseItemDisplay'
import drawerHeader from '../components/drawer/DrawerHeader'
const Routes = createStackNavigator(
    {
        LandingPage: { screen: LandingPage },
        drawerHeader: { screen: drawerHeader},
        PurchaseItemDisplay: { screen: PurchaseItemDisplay },
        DatePicker: { screen: DatePicker },
        ShoppingCart: { screen: ShoppingCart },
        Navi: { screen: Navi },
        MountainStore: { screen: MountainStore },
        RentalEquipmentDisplay: { screen: RentalEquipmentDisplay },
        EditRentalEquipment: { screen: EditRentalEquipment },
        AddProfile: { screen: AddProfile },
        ProfileDictionary: { screen: ProfileDictionary },
        GetLocation: { screen: GetLocation },
        MountainFinder: { screen: MountainFinder },
        MountainProfile: { screen: MountainProfile },
        EditLiftTickets: { screen: EditLiftTickets },
        LoadingGIF: { screen: LoadingGIF },
        //Main frames
        MountainRegistration: { screen: MountainRegistration },
        EditProfile: { screen: EditProfile },

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