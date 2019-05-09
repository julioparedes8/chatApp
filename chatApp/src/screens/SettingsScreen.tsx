import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native'
import api from '../api';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
export interface SettingsScreenProps {
    navigation: NavigationScreenProp<any,any>
  };
  interface state {
    loading?: boolean;
}
let API = new api();
class SettingsScreen extends React.Component<SettingsScreenProps, state> {
  constructor(props: Readonly<SettingsScreenProps>){
    super(props);
    this.state = {
      loading:false,
    }
  }
    componentDidMount() {
      this.setState({loading:true})
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
                  <Title>SettingsScreen</Title>
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
                <Title>SettingsScreen</Title>
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
                onPress={() => this.props.navigation.navigate("Home")}>
                <Text>Ir a pantalla Home</Text>
              </Button>
              <Button full rounded primary
                style={{ marginTop: 10 }}
                onPress={() => this.props.navigation.navigate("Links")}>
                <Text>Ir a pantalla Links</Text>
              </Button>
            </Content>
          </Container>
            )
    }
}
  export default SettingsScreen;