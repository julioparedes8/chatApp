import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage, Alert} from 'react-native'
import api from '../api';
import localstorage from '../localstorage';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header,List,ListItem,Thumbnail, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
import MessagesScreen from './MessagesScreen';
import AlertaScreen from './AlertaScreen';
import AvisoScreen from './AvisoScreen';
import AgendaScreen from './AgendaScreen';
import { NavigationActions,StackActions } from 'react-navigation'
import SessionWebSocket from '../SessionWebSocket';
export interface Props {
  navigation: NavigationScreenProp<any,any>,
};
interface State{
  index?: number,
  idUsuario?:String
}
//variables globales
let API = new api();
let webSocket = SessionWebSocket.getInstance()
let LOCALSTORAGE = new localstorage();
class HomeScreen extends React.Component<Props,State> {
  
  constructor(props: Props){
    super(props);
    //console.log('entro')
    const indice = this.props.navigation.getParam('index');
      // el indice para la pantalla de inicio
    if(indice==undefined){
      this.state = {index: 3}
    }else{
      this.state = {index: indice}
    }
    let socketStatus:Boolean=webSocket.isConnected()
    console.log(socketStatus)
    if(socketStatus==true){
      this.hacerSubcripciones()
    }else {
      webSocket.connect().then( res =>  {
        this.hacerSubcripciones()
      }).catch(error=>console.log(error));
    }
  }
  componentDidMount(){
    
  }
  upDateToken(){
    return new Promise((resolve, reject) => {
      LOCALSTORAGE.getIdUsuario().then(response=>{
       // console.log(response)
        this.setState({idUsuario:response})
        console.log(this.state.idUsuario)
        resolve()
      })
    })
  }
  hacerSubcripciones(){
    webSocket.unSubscribe('sub-chat')
    this.upDateToken().then(res => 
     {
       webSocket.subscribe('/topic/chat/'+this.state.idUsuario,'sub-inicio').then(res=>{
        console.log(res)
      }) 
      webSocket.subscribe('/topic/alertas/'+this.state.idUsuario,'sub-alertas').then(res=>{
        console.log(res)
      }) 
    }
    );
  }
  //aqui se actualiza el indice basandose en la pantalla que se selecciono para navegar  
  switchScreen(index:number) {
    this.setState({index: index})
  }
  componentWillReceiveProps(){
    this.setState({index: 3})
  }
  //abre una alerta para asegurar que se desea cerrar sesón
  cerrarSesion=()=>{
    Alert.alert(
      'Cerrar Sesión',
      '¿Seguro que deseas cerrar sesión?',
      [
        //si se desea cerrar sesión invoca a la siguiente función
        {text: 'Si', onPress: () => this.salir()},
        {text: 'No', onPress: () =>'cancelar'},
      ],
      {cancelable: false},
    );
  }
  //se ejecuta al presionar el botton del header de la pantalla de CHATS y te navega a otra pantalla
  enviarMensaje=()=>{
    this.props.navigation.navigate('EnviarMensaje')
  }
  //se ejecuta al presionar el botton del header de la pantalla de AGENDA y te navega a otra pantalla
  crearTarea=()=>{
    this.props.navigation.push('CrearTarea')
  }
  //cierra sesión, elimina los tokens del LS y te navega a la pantalla del login
  salir=()=>{
    webSocket.unSubscribe('sub-inicio')
    //webSocket.disconnect()
    LOCALSTORAGE.borrarSesion()
    //this.props.navigation.push("Login")
    this.setState({index:3})
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });
    this.props.navigation.dispatch(resetAction);
  }
  //Aqui se muestra el footer y basandose en el indice que definimos para cada pantalla
  // te muestra la que corrsponda
  render(){
    let AppComponent = null;
    let nombre= '';
    if (this.state.index == 1) {
      nombre= 'Alertas'
      AppComponent = AlertaScreen
    } else if (this.state.index == 2){
      AppComponent = AvisoScreen
      nombre= 'Avisos'
    } else if (this.state.index == 3){
      AppComponent = MessagesScreen
      nombre= 'Mensaje'
    } else {
      AppComponent = AgendaScreen
      nombre= 'Agenda'
    }           
    return (
      <Container>
        <Header style={{backgroundColor:"#142851",height:70}}>
        <Left style={{ flex:1}}>
            {this.state.index==3 && 
              <Button
                transparent
                onPress={()=>this.enviarMensaje()}
                >
                <Icon type="Entypo" name="new-message" />
              </Button>
            }
            {this.state.index==4 && 
              <Button
                transparent
                onPress={()=>this.crearTarea()}
                >
                <Icon type="MaterialCommunityIcons" name="calendar-plus" />
              </Button>
            }  
          </Left>
          <Body style={{ flex:1}}>
            <Title  style={{ alignSelf: 'center'}}>{nombre}</Title>
          </Body>
          <Right style={{ flex:1}}>
             <Button
                transparent
                onPress={()=>this.cerrarSesion()}>
                <Icon type="SimpleLineIcons" name="logout" />
              </Button>
          </Right>
        </Header>
        <Content padder>
          <AppComponent navigation={this.props.navigation}/>
        </Content>
        <Footer style={{height:70}}>
          <FooterTab style={{backgroundColor:"#142851",height:70}}>
            <Button style={{height:70}} vertical onPress={() => this.switchScreen(1) } active={this.state.index === 1}>
              <Icon type='Feather' name="alert-triangle" style={{color:"white"}}/>
              <Text style={{color:"white"}}>Alertas</Text>
            </Button>
            <Button style={{height:70}} vertical  onPress={() => this.switchScreen(2) } active={this.state.index === 2}>
              <Icon name="md-notifications" style={{color:"white"}}/>
              <Text style={{color:"white"}}>Avisos</Text>
            </Button>
            <Button  style={{height:70}} vertical onPress={() => this.switchScreen(3) } active={this.state.index === 3}>
              <Icon name="ios-chatbubbles" style={{color:"white"}}/>
              <Text style={{color:"white"}}>Chats</Text>
            </Button>
            <Button style={{height:70}} vertical onPress={() => this.switchScreen(4) } active={this.state.index === 4}>
              <Icon type='FontAwesome' name="calendar-o" style={{color:"white"}}/>
              <Text style={{color:"white"}}>Agenda</Text>
            </Button>
          </FooterTab>
          </Footer>
        </Container>
      )
  }
}
const styles = StyleSheet.create({
  header: {
      flex:1
  }
})
  export default HomeScreen;