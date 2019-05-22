import React from 'react'
import {NavigationScreenProp } from 'react-navigation';
import { Container,Spinner, Content, List,Footer,FooterTab, ListItem, Accordion, Button, Icon,Left,Right, Text, Item  } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet } from 'react-native';
export interface Props {
    navigation: NavigationScreenProp<any,any>,
}
interface State {
  sesion?: boolean;
}
export default class LoadingScreen extends React.Component<Props,State>{
    constructor(props: Props){
        super(props);
        this.state={
            sesion:false
        }
        this.getToken()
    }
    getToken=async ()=>{
        try {
            //await AsyncStorage.setItem('Token', JSON.stringify('logueado'))
            const tkn = await AsyncStorage.getItem('Token')
            console.log(tkn)
            if (tkn==null){
                this.setState({sesion:false})
            }
            this.setState({sesion:true})
        } catch (e) {
        // saving error
        }
    }
    componentDidUpdate(){
        this.props.navigation.navigate(this.state.sesion ? 'App' : 'Auth');
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