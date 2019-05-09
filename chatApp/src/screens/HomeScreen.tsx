import React, {Component} from 'react';
import {View,StyleSheet,FlatList} from 'react-native'
import api from '../api';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header, Title, Left, Icon, Right, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
export interface HomeScreenProps {
    navigation: NavigationScreenProp<any,any>
  };
interface state {
    loading?: boolean;
}
let API = new api();
class HomeScreen extends React.Component<HomeScreenProps, state> {
    constructor(props: Readonly<HomeScreenProps>){
      super(props);
      this.state = {
        loading:false,
      }
    }
    componentDidMount() {
      this.setState({loading:true})
      //llamar la funcion de la api y dependiendo del objeto se le asigna la interface
    }
    render(){
        if(this.state.loading){
            return (
              <Container>
              <Header>
                <Left>
                  <Button
                    transparent
                    onPress={()=>this.props.navigation.openDrawer()}>
                    <Icon name="menu" />
                  </Button>
                </Left>
                <Body>
                  <Title>HomeScreen</Title>
                </Body>
                <Right />
              </Header>
              <Content padder>
                <Card>
                  <CardItem>
                    <Body>
                      <Text>DESCARGANDO</Text>
                    </Body>
                  </CardItem>
                </Card>
              </Content>
            </Container>
          )
        }
        return (
            <Container>
            <Header>
              <Left>
                <Button
                  transparent
                  onPress={()=>this.props.navigation.openDrawer()}>
                  <Icon name="menu" />
                </Button>
              </Left>
              <Body>
                <Title>HomeScreen</Title>
              </Body>
              <Right />
            </Header>
            <Content padder>
              <Card>
                <CardItem>
                  <Body>
                    <Text>Drawer con React-navigation y Native-base</Text>
                  </Body>
                </CardItem>
              </Card>
              <Button full rounded dark
                style={{ marginTop: 10 }}
                onPress={() => this.props.navigation.navigate("Links")}>
                <Text>Ir a pantalla Links</Text>
              </Button>
              <Button full rounded primary
                style={{ marginTop: 10 }}
                onPress={() => this.props.navigation.navigate("Settings")}>
                <Text>Ir a pantalla Settings</Text>
              </Button>
            </Content>
          </Container>
        )
    }
}
  export default HomeScreen;