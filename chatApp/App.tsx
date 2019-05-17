/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */
import React, {Component} from 'react';
import { Root } from "native-base";
import {Platform, StyleSheet, Text, View} from 'react-native';
import HomeScreen from './src/screens/MessagesScreen'
//import DrawerNavigator from './src/navigation/DrawerNavigator'
import MainNavigator from './src/navigation/MainNavigator';
import FooterComponent from './src/components/Footer';

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
       <Root>
          <MainNavigator/>
       </Root>
      </View>
    );
  }
}
const styles= StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff'
  },
})