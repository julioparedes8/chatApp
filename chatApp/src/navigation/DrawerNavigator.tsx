import React from 'react'
import {createDrawerNavigator, createAppContainer,DrawerActions,NavigationScreenProp} from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import LinkScreen from '../screens/LinkScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SideBar from '../components/MenuDrawer';
import LoginScreen from '../screens/LoginScreen';
var openDrawer = () => {
    (DrawerActions.openDrawer());
}
var closeDrawer = () => {
    (DrawerActions.closeDrawer());
}
const DrawerNavigator= createDrawerNavigator(
    {
        Home:{
            screen: HomeScreen
        },
        Links:{
            screen: LinkScreen
        },
        Settings:{
            screen: SettingsScreen
        },
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
);
export default createAppContainer(DrawerNavigator);


