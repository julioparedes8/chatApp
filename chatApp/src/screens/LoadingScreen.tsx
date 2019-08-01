import React from 'react'
import {NavigationScreenProp, StackActions, NavigationActions } from 'react-navigation';
import localstorage from '../localstorage';
import { Container,Spinner, Content, List,Footer,FooterTab, ListItem, Accordion, Button, Icon,Left,Right, Text, Item  } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet } from 'react-native';
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
interface State {
  sesion?: boolean;
}
let LOCALSTORAGE = new localstorage();
export default class LoadingScreen extends React.Component<Props,State>{
    constructor(props: Props){
        super(props);
        this.state={
            sesion:false
        }
        //hacemos la petición al local storage para saber si existe la sesión
        LOCALSTORAGE.existToken().then(response=>{
            this.setState({sesion:response})
        })
    }
    componentDidUpdate(){
      //si existe sesión se navegará al appStack que son las pantallas de la app y si no al authStack que es el login
      console.log(this.state.sesion)
      if(this.state.sesion==true){
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        this.props.navigation.dispatch(resetAction);
        //this.props.navigation.navigate('Home');
      }else{
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });
        this.props.navigation.dispatch(resetAction);
        //this.props.navigation.navigate('Login');
      }
      //this.props.navigation.navigate(this.state.sesion ? 'App' : 'Auth');
    }
    render(){
        return (
            <Container style={styles.container}>
                <Content  contentContainerStyle={styles.spinnerStyle}>
                    <Spinner color='blue' />
                    <Text>Cargando...</Text>
                </Content>
            </Container>
            )

    }
  }
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#4286f4',
      },
    spinnerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });