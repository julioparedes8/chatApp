import React, {Component} from 'react';
import {View,StyleSheet,FlatList,ImageBackground, Alert} from 'react-native'
import api from '../api';
import localstorage from '../localstorage';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container,Toast, Header, Title,Form, Left, Icon, Right, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
import { Login } from '../entidades/login';
import md5 from 'md5';
import Usuario from '../entidades/Usuario'
import DeviceInfo from 'react-native-device-info';
import { BaseResponse } from '../entidades/BaseResponse';
import LocalStorage from '../localstorage';
import { ClientRequest } from 'http';
//import * as StopmWS from 'react-native-stomp-websocket';
//const StompWS = require("react-native-stomp-websocket").default
export interface Props{
    navigation: NavigationScreenProp<any,any>
}
interface state{
    hidden?: boolean;
    loading?: boolean;
    usuario?: string;
    password?: string;
    modal?: boolean;
    macADD?:String;
    pcName?:String;
}
//definimos variables globales
let API = new api();
let LOCALSTORAGE = new localstorage();
let token=""
let refresh=""
let id="";
let usuario="";
let isAdmin:String=''
//const client = StompWS.client('ws://10.10.1.82:8008/connect');
class LoginScreen extends React.Component<Props,state> {
  constructor(props: Readonly<Props>){
    super(props);
    this.state = {
      hidden:true,
      usuario:'',
      password:'',
      modal:false,
      macADD:'',
      pcName:''
    }
    this.obtenerMac()
  }
  
  //obtiene la macAddress
  obtenerMac(){
    DeviceInfo.getMACAddress().then(mac => {
      // "E5:12:D8:E5:69:97"
      this.setState({macADD:mac})
    });
    const deviceName = DeviceInfo.getDeviceId();
    this.setState({pcName: deviceName})
    console.log('Nombre: '+deviceName)
  }
  //sirve para ocultar y mostrar el texto de la contraseña
  ocultarPress = () =>{
    this.setState({ 
      hidden: !this.state.hidden 
    })
  }
  //se ejecuta al presionar el botonn iniciar sesión
  sesionPress = () =>{
    //definimos el json de configuración de la api para poder hacer la petición
    //en los headers van los paramteros base mas el usuario y contraseña
    if (this.state.usuario==""){
      this.mensajeShow("Ingrese usuario",1)
    } else if (this.state.password==""){
      this.mensajeShow("Ingrese contraseña",1)
    }else {
      let config = {
        headers: { 'tenantId':'macropro','Content-Type': 'application/json','MacAddress':this.state.macADD,'pid':1,'pcName':this.state.pcName,'codigo':this.state.usuario,'password':md5(String(this.state.password))}
      }
      //hacemos la petición pasando como referencia el tipo de sesión y la confiracion
      API.sesion('login',config)
      .then(response => {
        //aqui cachamos la respuesta
        const parsedJSON = response;
        var login: Login[] = parsedJSON as Login[];
        //console.log('MESSAGE: ' +login.message);
        //si es un login correcto asignamos los valores de los tokens
        if (String(login.status)=='200'){
          token=login.resp.token
          refresh=login.resp.refresh
        }
        //llamamos a la siguiente función para mostrar el mensaje del estado del login, se le pasa los parametros del status y mensaje
        this.mensajeShow(login.message,login.status)
      })
      .catch(error => this.mensajeShow(error.message,error.status))
    }
  }
  //se muestra una alerta en base al status del login
  mensajeShow = (mensaje:any,status:any)=>{
    //si el status es 200 (correcto) se muestra el siguiente mensaje
    if (status==1){
      Alert.alert(
        "Error de validación",
        mensaje,
        [
          {text: 'OK', 
          onPress: () => ""},
        ],
        {cancelable: false},
      );
    }else if (status==200){
      Alert.alert(
        'Inicio de Sesión',
        'Bienvenido',
        [
          //al presionar ok se llama la siguiente función
          {text: 'OK', onPress: () => this.getUsuario()},
        ],
        {cancelable: false},
      );
    //si es status 400 (login incorrecto) se meustra el siguiente mensaje
    }else if(status==300){
      Alert.alert(
        'Inicio de Sesión',
        mensaje,
        [
          {text: 'OK', onPress: () => 'cerrar'},
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
    }else if(status==500){
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
  //aqui se almacena los tokens en el LS ya que el login fue correcto y te navega a la pantalla principal
  loginCorrecto=()=>{
    LOCALSTORAGE.setToken(token)
    LOCALSTORAGE.setIdUsuario(id.toString())
    LOCALSTORAGE.setUsuario(usuario.toString())
    LOCALSTORAGE.setRefresh(refresh)
    LOCALSTORAGE.setIsAdmin(isAdmin.toString())
    this.props.navigation.push("Home",{index:3,idUsuario:id.toString()})
  }
  getUsuario(){
    console.log("entro");
    let config = {
      headers: { 'tenantId':'macropro','Content-Type': 'application/json','Authorization': 'Bearer '+token,'MacAddress':this.state.macADD,'codigo':this.state.usuario}
    }
    //hacemos la petición pasando como referencia el tipo de sesión y la confiracion
    API.getAll('UsuarioRest/getUsuarioByCodigo',config)
    .then(response => {
      const parsedJSON = response;
      var baseResponse: BaseResponse<Usuario>[] = parsedJSON as BaseResponse<Usuario>[];
      console.log(response);
      //si es un login correcto asignamos los valores de los tokens
      if (String(baseResponse.status)=='200'){
        id=baseResponse.resp.id
        console.log("id: " +id)
        usuario=baseResponse.resp.codigo
        isAdmin=baseResponse.resp.nivelAccesoSistema
        console.log("isAdmin: " +isAdmin)
        this.loginCorrecto()
      }
      //llamamos a la siguiente función para guardar id en localStorage
    })
    .catch(error => this.mensajeShow(error.message,error.status))
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
    backgroundColor:'#EBF1F3',
    fontSize:25,
    borderRadius: 35,
  },
  input:{
    //backgroundColor:'#EBF1F3'
  },
  button:{
    margin: 60, 
    marginTop: 50,
    backgroundColor:'#142851'
  },
  txtLogin:{
    position: 'absolute',
    top:100,
    alignSelf: 'center',
    fontFamily:'Cochin',
    fontSize: 36,
    fontWeight: 'bold',
    color:'#142851'

  }
});

export default LoginScreen;