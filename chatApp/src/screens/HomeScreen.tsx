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
        <Header style={{backgroundColor:"#5197F9"}}>
          <Body>
            <Title>{nombre}</Title>
          </Body>
          <Right>
             <Button
                transparent
                onPress={()=>this.props.navigation.navigate("Login")}>
                <Icon type="SimpleLineIcons" name="logout" />
              </Button>
          </Right>
        </Header>
        <Content padder>
          <AppComponent/>
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor:"#5197F9"}}>
            <Button vertical onPress={() => this.switchScreen(1) } active={this.state.index === 1}>
              <Icon name="ios-alarm" />
              <Text>Alertas</Text>
            </Button>
            <Button vertical  onPress={() => this.switchScreen(2) } active={this.state.index === 2}>
              <Icon name="md-notifications"/>
              <Text>Avisos</Text>
            </Button>
            <Button vertical onPress={() => this.switchScreen(3) } active={this.state.index === 3}>
              <Icon name="ios-chatbubbles" />
              <Text>Chats</Text>
            </Button>
            <Button vertical onPress={() => this.switchScreen(4) } active={this.state.index === 4}>
              <Icon name="ios-calendar" />
              <Text>Agenda</Text>
            </Button>
          </FooterTab>
          </Footer>
        </Container>
      )
    }
}
  export default HomeScreen;