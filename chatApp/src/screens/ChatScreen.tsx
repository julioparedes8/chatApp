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
interface User {
    _id: number;
    name: string;
    avatar: string; 
}
interface Messages {
    _id: number;
    text: string;
    createdAt: Date;
    user:User;
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
let config={}
let idDestinatario:string
let nomDestintario:string
const client = StompWS.client('ws://10.10.1.82:8008/connect');
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
    hacerConexion(){
      let config = {
        headers: { 'tenantId':'macropro','Content-Type': 'application/json','Authorization': 'Bearer '+this.state.token,'MacAddress':this.state.macADD }
      }
      console.log(config);
      client.connect(config.headers.tenantId,config.headers.MacAddress,config.headers.Authorization, this.connectCallback, this.errorCallback);
    }
    connectCallback () {
      // called back after the client is connected and authenticated to the STOMP server
      console.log('ya se conectó');
      var callback = function (message:any) {
        // called when the client receives a STOMP message from the server
        console.log('Se recibio un '+message);
        if (message.body) {
          Alert.alert("got message with body " + message.body)
        } else
        {
          Alert.alert("got empty message");
        }
      };
      client.subscribe('/topic/chat/1',callback)
    }
    errorCallback(error:any) {
      // display the error's message header:
      console.log('Error'+ error);
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
    componentWillMount() {
      this.setState({
        messages: [
          {
            _id: 1,
            text: "Como estas?",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any"
            }
          },
          {
            _id: 2,
            text: "Hello developer",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any"
            }
          },
        ]
      })
    }
    onSend=(messages = [])=> {
      this.setState(previousState => {
        return ({
          messages: GiftedChat.append(previousState.messages, messages)
        });
      });
    }
    enviarMensaje(messages:any){
      config = {
        headers: { 'tenantId':'macropro','Content-Type': 'application/json', 'idRemitente': idUsuario,'idDestinatario': idDestinatario,'MacAddress':this.state.macADD }
      }
      var data={
        "idRemitente": idUsuario,
        "idDestinatario": idDestinatario,
        "contenido": messages
      }
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
        .catch(error => 'this.mensajeShow(error.message,error.status,1')
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
                    user={{
                      _id: 1
                    }}
                />
                
            </Container>
            
          )
    }
}
  export default ChatScreen;