import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage, Alert} from 'react-native'
import api from '../api';
import { GiftedChat } from 'react-native-gifted-chat';
import localstorage from '../localstorage';
import DeviceInfo from 'react-native-device-info';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header,List,ListItem,Thumbnail, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
const StompWS = require("react-native-stomp-websocket").default
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
//interface User {
    //_id: number;
    //name: string;
    //avatar: string; 
//}
interface Messages {
    _id: number;
    text: string;
    createdAt: Date;
    //user:User;
}
interface state{
  messages?:Messages[];
  idUsuario:any,
  idDestinatario:any,
  nomDestintario:any,
  token?:String,
  macADD?:String
}
let API = new api();
let LOCALSTORAGE = new localstorage();
let idUsuario:string
let config:any
let idDestinatario:string
let nomDestintario:string
var subscription:any;
const client = StompWS.client('ws://10.10.1.82:8008');
client.debug = function(str:any) {
  // append the debug log to a #debug div
  console.log(str)
}
class ChatScreen extends React.Component<Props,state> {
    constructor(props: Props){
      super(props);
      idUsuario = this.props.navigation.getParam('idUsuario');
      idDestinatario = this.props.navigation.getParam('idDestinatario');
      nomDestintario = this.props.navigation.getParam('nomDestinatario');
      console.log(idUsuario+' '+idDestinatario+' '+nomDestintario)
      this.state = {
        messages:[],idUsuario:idUsuario,idDestinatario:idDestinatario,nomDestintario:nomDestintario
      }
      DeviceInfo.getMACAddress().then(mac => {
        // "E5:12:D8:E5:69:97"
        this.setState({macADD:mac})
      });
      this.upDateToken().then(res => this.hacerConexion())
    }
    connectCallback () {
      // called back after the client is connected and authenticated to the STOMP server
      console.log('ya se conectó');
      subscription = client.subscribe('/chat/'+idUsuario,this.callBack)
    }
    callBack(message:any) {
      // called when the client receives a STOMP message from the server
      console.log("mensaje " + message)
      if (message.body) {
        Alert.alert("got message with body " + message.body)
      } else
      {
        Alert.alert("got empty message");
      }
    }
    errorCallback(error:any) {
      // display the error's message header:
      console.log(error);
    }
    upDateToken(){
      return new Promise((resolve, reject) => {
        LOCALSTORAGE.getToken().then(response=>{
          this.setState({token:response})
          console.log(this.state.token)
          config = {
            headers: { 'tenantId':'macropro','Content-Type': 'application/json','Authorization': 'Bearer '+this.state.token,'MacAddress':this.state.macADD }
          }
          resolve()
        })
      });
    }
    hacerConexion(){
      config = {
        headers: { 'tenantId':'macropro','authorization': 'Bearer '+this.state.token,'MacAddress':this.state.macADD }
      }
      console.log(config);
      client.connect('/connect',config.headers.tenantId,config.headers.MacAddress,config.headers.authorization, this.connectCallback, this.errorCallback);
    }
    componentWillMount() {
      this.setState({
        messages: [
          {
            _id: 1,
            text: "Como estas?",
            createdAt: new Date(),
            //user: {
             // _//id: 2,
              //name: "React Native",
              ///avatar: "https://placeimg.com/140/140/any"
           // }
          },
          {
          _id: 2,
           text: "Hello developer",
            createdAt: new Date(),
            //user: {
             // _//id: 2,
              //name: "React Native",
              //avatar: "https://placeimg.com/140/140/any"
            //}
          },
        ]
      })
    }
    onSend=(messages:any = [])=> {
      this.enviarMensaje(messages[0].text)
      this.setState(prevState => {
        return ({
          messages: GiftedChat.append(prevState.messages, messages)
        });
      });
    }
    enviarMensaje(messages:any){
      console.log(messages)
      config = {
        headers: { 'tenantId':'macropro','Content-Type': 'application/json','Authorization': 'Bearer '+this.state.token, 'idRemitente': idUsuario,'idDestinatario': idDestinatario,'MacAddress':this.state.macADD }
      }
      var data={
        "idRemitente": idUsuario,
        "idDestinatario": idDestinatario,
        "contenido": messages
      }
      console.log(config)
      console.log(data)
      API.post('SysMensajeRest/enviar',data,config)
          .then(response => {
            const parsedJSON = response;
            console.log('response '+response);
           // var baseResponse: BaseResponse<Tarea>[] = parsedJSON as BaseResponse<Tarea>[];
            //console.log(baseResponse.status);
            //console.log('valor de i: '+valor);
            //console.log('usuarios: '+this.state.usuarios.length);
            //if((valor+1)==numUser){
              //this.mensajeShow("Asunto: "+baseResponse.resp.asunto,baseResponse.status)
            //}
          })
        .catch(error =>   this.mensajeShow(error.message,error.status,1))
    }
    //muestra mensajes/alertas dependiendo de status ya sea de peticion o de validacion
    mensajeShow = (mensaje:any,status:any,peticion?:any)=>{
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
      } else if (status==200){
        Alert.alert(
          "Tarea agregada exitosamente",
          mensaje,
          [
            {text: 'OK', 
            onPress: () => 'this.limpiar()'},
          ],
          {cancelable: false},
        );
      }else if(status==300){
        Alert.alert(
          'Inicio de Sesión',
          mensaje,
          [
            {text: 'OK', onPress: () => 'cerrar'},
          ],
          {cancelable: false},
        );
      }else if (status==400){
        Alert.alert(
          "Error",
          mensaje,
          [
            {text: 'OK', 
            onPress: () =>'this.salir()'},
          ],
          {cancelable: false},
        );
      }else if (status==401){
        //Alert.alert(
          //"Error",
          //mensaje,
          //[
            //{text: 'OK', 
            //onPress: () =>  this.refresh()},
          //],
          //{cancelable: false},
        //);
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
    render(){
          return (
            <Container>
              <Header style={{backgroundColor:"#4377C6",height:70}}>
                <Left style={{ flex:1}}>
                    
                      <Button
                        transparent
                        onPress={()=>this.props.navigation.push("Home")}
                          >
                        <Icon type="Ionicons" name="ios-arrow-back" />
                      </Button>
                    
                  </Left>
                  <Body style={{ flex:1}}>
                    <Text  style={{ alignSelf: 'center'}}>{this.state.nomDestintario}</Text>
                  </Body>
                  <Right style={{ flex:1}}>
                  
                  </Right>
                </Header>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                />
                
            </Container>
            
          )
    }
}
  export default ChatScreen;