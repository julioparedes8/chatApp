import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage, Alert} from 'react-native'
import api from '../api';
import { BaseResponse } from '../entidades/BaseResponse';
import { Login } from '../entidades/Login';
import localstorage from '../localstorage';
import DeviceInfo from 'react-native-device-info';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input, List, ListItem, Thumbnail } from "native-base";
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
interface State {
  refresh?: String;
  token?:String;
  macADD?:String
}
let API = new api();
let LOCALSTORAGE = new localstorage();
let config={}
let config2={}
let token=""
let refresh=""
class AlertaScreen extends React.Component<Props,State> {
    constructor(props: Props){
      super(props);
      this.state = {
        token: '',
        refresh:'',
        macADD:''
      }
    }
    upDateToken(){
      LOCALSTORAGE.getToken().then(response=>{
        this.setState({token:response})
        console.log(this.state.token)
        config = {
          headers: { 'tenantId':'macropro','Content-Type': 'application/json','Authorization': 'Bearer '+this.state.token }
        }
      })
      LOCALSTORAGE.getRefresh().then(response=>{
        this.setState({refresh:response})
        console.log(this.state.refresh)
        config2 = {
          headers: { 'tenantId':'macropro','refreshToken': this.state.refresh,'Content-Type': 'application/json' }
        }
      })
      DeviceInfo.getMACAddress().then(mac => {
        // "E5:12:D8:E5:69:97"
        this.setState({macADD:mac})
      });
    }
    componentDidUpdate(){
      this.upDateToken()
    }
    componentDidMount(){
     this.upDateToken()
    }
    peticion = () =>{
      API.getAll('SysTareaRest',config)
      .then(response => {
        const parsedJSON = response;
        var baseResponse: BaseResponse[] = parsedJSON as BaseResponse[];
        console.log('MESSAGE: ' +baseResponse.message);
        console.log('STATUS: ' +baseResponse.status);
        console.log('Resp: ' +baseResponse.resp);
        this.mensajeShow(baseResponse.message,baseResponse.status)
        //this.mensajeShow(login.message,login.status)
      })
      .catch(error => this.mensajeShow('Fallo Autenticacion','401'))
    }
    refresh=()=>{
      API.sesion('refresh',config2)
    .then(response => {
      const parsedJSON = response;
      var login: Login[] = parsedJSON as Login[];
      //console.log('MESSAGE: ' +login.message);
      //console.log('STATUS: ' +login.status);
      //console.log('TOKEN: ' +login.resp);
      if (String(login.status)=='200'){
        token=login.resp.token
        refresh=login.resp.refresh
      }
    this.mensajeShow(login.message,login.status)
    this.refreshCorrecto()
    })
    .catch(error => this.mensajeShow('A signing key must be specified if the specified JWT is digitally signed.','500'))
    }
    refreshCorrecto=()=>{
      LOCALSTORAGE.setToken(token)
      LOCALSTORAGE.setRefresh(refresh)
      this.upDateToken()
      //this.peticion()
    }
    mensajeShow = (mensaje:any,status:any)=>{
      if (status==200){
        Alert.alert(
          'Peticion correcta',
          mensaje,
          [
            {text: 'OK', onPress: () => ''},
          ],
          {cancelable: false},
        );
      }else if(status==401){
        Alert.alert(
          'Error',
          mensaje,
          [
            {text: 'OK', onPress: () => this.refresh()},
          ],
          {cancelable: false},
        );
      }else if(status==500){
        Alert.alert(
          'Error',
          mensaje,
          [
            {text: 'OK', onPress: () => this.salir()},
          ],
          {cancelable: false},
        );
      }
    }
    salir=()=>{
      LOCALSTORAGE.borrarToken()
      this.props.navigation.navigate("Login")
    }
    render() {
      return (
        <Container>
          <Content>
            <List>
              <ListItem thumbnail >
                <Left>
                  <Thumbnail style={{}} square source={require('../../assets/priority_high.png')} />
                </Left>
                <Body>
                  <Text>Prioridad 1</Text>
                  <Text note numberOfLines={1}>{this.state.token}</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Ver</Text>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail >
                <Left>
                  <Thumbnail style={{}}  square source={require('../../assets/priority_medium.png')} />
                </Left>
                <Body>
                  <Text>Prioridad 2</Text>
                  <Text note numberOfLines={1}>{this.state.refresh}</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Ver</Text>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail >
                <Left>
                  <Thumbnail style={{}}  square source={require('../../assets/priority_low.png')} />
                </Left>
                <Body>
                  <Text>Prioridad 3</Text>
                  <Text note numberOfLines={1}>{this.state.macADD}</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Ver</Text>
                  </Button>
                </Right>
              </ListItem>
            </List>
            <Button onPress={this.peticion}>
              <Text>Hacer petición</Text>
            </Button>
          </Content>
        </Container>
      );
    }
  }
  export default AlertaScreen;