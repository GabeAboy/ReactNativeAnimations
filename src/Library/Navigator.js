import React from 'react';
import { Button, Text} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Ball from '../Ball'
const DrawerExample = DrawerNavigator(
    {
        Ball:{
            path:'/',
            screen: Ball
        }
    },
    {
        initialRouteName:'Ball',
        drawerPosition:'left'
    }
)
export default DrawerExample