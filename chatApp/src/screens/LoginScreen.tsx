import React, {Component} from 'react';
import {View,StyleSheet,FlatList,ImageBackground, Alert} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import api from '../api';
import localstorage from '../localstorage';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container,Toast, Header, Title,Form, Left, Icon, Right, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
import { Login } from '../entidades/login';
export interface Props{
    navigation: NavigationScreenProp<any,any>
}
interface state{
    hidden?: boolean;
    loading?: boolean;
    usuario?: string;
    password?: string,
    modal?: boolean,
}
let API = new api();
let LOCALSTORAGE = new localstorage();
let token=""
let refresh=""
class LoginScreen extends React.Component<Props,state> {
  constructor(props: Readonly<Props>){
    super(props);
    this.state = {
      hidden:true,
      usuario:'',
      password:'',
      modal:false
    }
  }
  prueba=()=>{
    this.mensajeShow('correcto',200)
  }
  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };
  ocultarPress = () =>{
    this.setState({ 
      hidden: !this.state.hidden 
    })
  }
  sesionPress = () =>{
    let config = {
      headers: { 'tenantId':'macropro','Content-Type': 'application/json','codigo':this.state.usuario,'password':this.state.password}
    }
    API.sesion('login',config)
    .then(response => {
      const parsedJSON = response;
      var login: Login[] = parsedJSON as Login[];
      //console.log('MESSAGE: ' +login.message);
      //console.log('STATUS: ' +login.status);
      //console.log('TOKEN: ' +login.resp.token);
      if (String(login.status)=='200'){
        token=login.resp.token
        refresh=login.resp.refresh
      }
    this.mensajeShow(login.message,login.status)
    })
    .catch(error => console.log(error))
  }
  mensajeShow = (mensaje:any,status:any)=>{
    if (status==200){
      Alert.alert(
        'Inicio de Sesión',
        'Bienvenido',
        [
          {text: 'OK', onPress: () => this.loginCorrecto()},
        ],
        {cancelable: false},
      );
    }else if(status==400){
      Alert.alert(
        'Inicio de Sesión',
        mensaje,
        [
          {text: 'OK', onPress: () => 'cerrar'},
        ],
        {cancelable: false},
      );
    }
  }
  loginCorrecto=()=>{
    //console.log('subtr '+token.substr(1,token.length-1))
    LOCALSTORAGE.setToken(token)
    LOCALSTORAGE.setRefresh(refresh)
    this.props.navigation.navigate("Home")
  }
  render() {
    return (
      //<ImageBackground 
      //source={require('../../assets/background.png')}
     // style={styles.container}>
          <Content padder>
            <Form>
              <View>
                <Text style={styles.txtLogin}>INICIO DE SESIÓN</Text>
              </View>
              <Item rounded style={{ marginLeft: 15,margin:15, marginTop: 250, marginRight:15,backgroundColor:'#EBF1F3' }}>
                <Icon name='person' style={styles.icon}/>
                <Input autoCorrect={false} value={this.state.usuario} placeholder="usuario" onChangeText={(value) => this.setState({usuario: value})}/>
              </Item>
              <Item rounded style={{ marginLeft: 15,margin:15, marginTop: 0, marginRight:15,backgroundColor:'#EBF1F3' }}>
                <Icon name='lock' style={styles.icon}/>
                <Input autoCorrect={false} secureTextEntry={this.state.hidden} value={this.state.password} placeholder="contraseña" onChangeText={(value) => this.setState({password: value})} />
                <Icon name='eye' style={styles.icon} onPress={this.ocultarPress}/>
              </Item>
            </Form>
            <Button rounded block info  style={styles.button} onPress={this.sesionPress}>
              <Text>Iniciar Sesión</Text>
            </Button>
          </Content>
   // </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent'
  },
  icon: {
    color: "#818586",
    backgroundColor:'#EBF1F3'
  },
  input:{
    //backgroundColor:'#EBF1F3'
  },
  button:{
    margin: 60, 
    marginTop: 50,
    backgroundColor:'#70CCF6'
  },
  txtLogin:{
    position: 'absolute',
    top:100,
    alignSelf: 'center',
    fontFamily:'Cochin',
    fontSize: 36,
    fontWeight: 'bold',
    color:'#70CCF6'

  }
});

export default LoginScreen;