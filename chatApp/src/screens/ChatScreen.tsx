import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage, Alert} from 'react-native'
import api from '../api';
import { GiftedChat } from 'react-native-gifted-chat';
import localstorage from '../localstorage';
import DeviceInfo from 'react-native-device-info';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header,List,ListItem,Thumbnail, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
import SessionWebSocket from '../SessionWebSocket';
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
  messages?:any[];
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
let mac : string
let webSocket = SessionWebSocket.getInstance()
class ChatScreen extends React.Component<Props,state> {
  //private stompClient:any;
    constructor(props: Props){
      super(props);
      idUsuario = this.props.navigation.getParam('idUsuario');
      idDestinatario = this.props.navigation.getParam('idDestinatario');
      nomDestintario = this.props.navigation.getParam('nomDestinatario');
      console.log(idUsuario+' '+idDestinatario+' '+nomDestintario)
      DeviceInfo.getMACAddress().then(mac => {
        // "E5:12:D8:E5:69:97"
        mac=mac
      });
      this.state = {
        messages:[],idUsuario:idUsuario,macADD:mac,idDestinatario:idDestinatario,nomDestintario:nomDestintario
      }
      this.upDateToken().then(res => this.hacerSubscripcion())
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
    hacerSubscripcion(){
      let socketStatus:Boolean=webSocket.isConnected()
      console.log(socketStatus)
      if(socketStatus==true){
        webSocket.unSubscribe('sub-inicio')
        webSocket.subscribe('/topic/chat/'+idUsuario,'sub-chat').then((res:any)=>{
          console.log(res)
          const incomingMessage:any = {
            _id:(res.id),
            text: (res.contenido),
            createdAt: new Date()
          }
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, incomingMessage),
          }));
        })
      }else {
        webSocket.connect().then( res =>  {
          webSocket.unSubscribe('sub-inicio')
          webSocket.subscribe('/topic/chat/'+idUsuario,'sub-chat').then((res:any)=>{
            console.log(res)
            const incomingMessage:any = {
              _id:(res.id),
              text: (res.contenido),
              createdAt: new Date()
            }
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, incomingMessage),
            }));
          })
        }).catch(error=>console.log(error));
      }
    }
    componentWillMount() {
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
    regresar=()=>{
      this.props.navigation.push('Home')
    }
    render(){
          return (
            <Container>
              <Header style={{backgroundColor:"#142851",height:70}}>
                <Left style={{ flex:1}}>
                    
                      <Button
                        transparent
                        onPress={()=>
                          this.regresar()
                        }
                          >
                        <Icon type="Ionicons" name="ios-arrow-back" />
                      </Button>
                    
                  </Left>
                  <Body style={{ flex:1}}>
                    <Text  style={{ alignSelf: 'center',color:'white'}}>{this.state.nomDestintario}</Text>
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