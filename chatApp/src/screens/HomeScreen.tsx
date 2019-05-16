import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage, Alert} from 'react-native'
import api from '../api';
import FooterComponent from '../components/Footer'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header,List,ListItem,Thumbnail, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
import ChatScreen from './ChatScreen';
import AlertaScreen from './AlertaScreen';
import AvisoScreen from './AvisoScreen';
import AgendaScreen from './AgendaScreen';
export interface Props {
  navigation: NavigationScreenProp<any,any>,
};
interface State{
  index?: number
}
let API = new api();
class HomeScreen extends React.Component<Props,State> {
  constructor(props: Props){
    super(props);
    this.state = {index: 3} // default screen index
  }
    
  switchScreen(index:number) {
    this.setState({index: index})
  }
  cerrarSesion=()=>{
    Alert.alert(
      'Cerrar Sesión',
      '¿Seguro que deseas cerrar sesión?',
      [
        {text: 'Si', onPress: () => this.props.navigation.navigate("Login")},
        {text: 'No', onPress: () =>'cancelar'},
      ],
      {cancelable: false},
    );
  }
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
      AppComponent = ChatScreen
      nombre= 'Chats'
    } else {
      AppComponent = AgendaScreen
      nombre= 'Agenda'
    }           
    return (
      <Container>
        <Header style={{backgroundColor:"#70CCF6"}}>
        <Left style={{ flex:1}}>
            {this.state.index==3 && 
              <Button
                transparent
                  >
                <Icon type="Entypo" name="new-message" />
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
          <AppComponent/>
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor:"#70CCF6", tabActiveBgColor: "#E8EAED"}}>
            <Button vertical onPress={() => this.switchScreen(1) } active={this.state.index === 1}>
              <Icon name="ios-alarm" style={{color:"white"}}/>
              <Text style={{color:"white"}}>Alertas</Text>
            </Button>
            <Button vertical  onPress={() => this.switchScreen(2) } active={this.state.index === 2}>
              <Icon name="md-notifications" style={{color:"white"}}/>
              <Text style={{color:"white"}}>Avisos</Text>
            </Button>
            <Button vertical onPress={() => this.switchScreen(3) } active={this.state.index === 3}>
              <Icon name="ios-chatbubbles" style={{color:"white"}}/>
              <Text style={{color:"white"}}>Chats</Text>
            </Button>
            <Button vertical onPress={() => this.switchScreen(4) } active={this.state.index === 4}>
              <Icon name="ios-calendar" style={{color:"white"}}/>
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