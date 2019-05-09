import React, {Component} from 'react';
import {View,StyleSheet,FlatList,ImageBackground} from 'react-native'
import api from '../api';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container,Toast, Header, Title,Form, Left, Icon, Right, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
import { Login } from '../entidades/login';
export interface LoginScreenProps{
    navigation: NavigationScreenProp<any,any>
}
interface state{
    hidden?: boolean;
    loading?: boolean;
    usuario?: string;
    password?: string,
}
let API = new api();
class LoginScreen extends React.Component<LoginScreenProps,state> {
  constructor(props: Readonly<LoginScreenProps>){
    super(props);
    this.state = {
      hidden:false,
      usuario:'',
      password:'',
    }
  }
  ocultarPress = () =>{
    this.setState({ 
      hidden: !this.state.hidden 
    })
  }
  sesionPress = () =>{
    let config = {
      headers: { 'tenantId':'macropro','Content-Type': 'application/json','codigo':this.state.usuario,'password':this.state.password}
    }
    API.login(config)
    .then(response => {
    const parsedJSON = response;
    const login: Login[] = parsedJSON as Login[];
    console.log('MESSAGE: ' +login.message);
    console.log('STATUS: ' +login.status);
    console.log('TOKEN: ' +login.resp);
    this.mensajeShow(login.message,login.status)
    })
    .catch(error => console.log(error))
  }
  mensajeShow = (mensaje:string,status:number)=>{
    if (status==200){
      Toast.show({
        text: "Bienvenido",
        buttonText: 'Okay',
        type:'success',
        duration:3000
      })
      this.props.navigation.navigate("Home")
    }else if(status==400){
      Toast.show({
        text: mensaje,
        buttonText: 'Okay',
        type:'danger',
        duration:3000
      })
    }
  }
  render() {
    return (
      //<ImageBackground
      //source={require('../../assets/background.png')}
     // style={styles.container}>
          <Content padder>
            <Form>
              <View>
                <Text style={styles.txtLogin}>INICIO DE SESÍON</Text>
              </View>
              <Item rounded style={{ margin: 15, marginTop: 250,backgroundColor:'#EBF1F3' }}>
                <Icon name='person' style={styles.icon}/>
                <Input autoCorrect={false} value={this.state.usuario} placeholder="usuario" onChangeText={(value) => this.setState({usuario: value})}/>
              </Item>
              <Item rounded style={{ margin: 15, marginTop: 0,backgroundColor:'#EBF1F3' }}>
                <Icon name='lock' style={styles.icon}/>
                <Input autoCorrect={false} secureTextEntry={this.state.hidden} value={this.state.password} placeholder="contraseña" onChangeText={(value) => this.setState({password: value})} />
                <Icon name='eye' style={styles.icon} onPress={this.ocultarPress}/>
              </Item>
            </Form>
            <Button rounded block info  style={styles.button} onPress={this.sesionPress}>
              <Text>Iniciar Sesíon</Text>
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
    backgroundColor:'#5197F9'
  },
  txtLogin:{
    position: 'absolute',
    top:120,
    alignSelf: 'center',
    fontFamily:'Cochin',
    fontSize: 36,
    fontWeight: 'bold',
    color:'#5197F9'

  }
});

export default LoginScreen;