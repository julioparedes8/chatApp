import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage} from 'react-native'
import api from '../api';
import FooterComponent from '../components/Footer'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
export interface AvisoScreenProps {
    navigation: NavigationScreenProp<any,any>
  };
interface state {
    loading?: boolean;
}
let API = new api();
class AvisoScreen extends React.Component<AvisoScreenProps, state> {
    constructor(props: Readonly<AvisoScreenProps>){
      super(props);
      this.state = {
        loading:false,
      }
    }
    componentDidMount() {
      this.setState({loading:true})
      this.setFooterActive()
      //llamar la funcion de la api y dependiendo del objeto se le asigna la interface
    }
    setFooterActive=async ()=>{
      try {
        await AsyncStorage.mergeItem('activeButton', JSON.stringify('aviso'))
        console.log("cambio activo aviso")
      } catch (e) {
        // saving error
      }
    }
    render(){
        if(this.state.loading){
            return (
              <Container>
              <Header  style={{backgroundColor:"#5197F9"}}>
                <Body>
                  <Title>Avisos</Title>
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
                <Card>
                    <CardItem>
                      <Body>
                        <Text>DESCARGANDO</Text>
                      </Body>
                    </CardItem>
                  </Card>
              </Content>
              <FooterComponent {...this.props}></FooterComponent>
            </Container>
          )
        }
        return (
            <Container>
            <Header  style={{backgroundColor:"#5197F9"}}>
                <Body>
                  <Title>Avisos</Title>
                </Body>
                <Right>
                <Button
                    transparent
                    onPress={()=>this.props.navigation.navigate("Login")}>
                    <Icon name="md-log-out" />
                  </Button>
                </Right>
            </Header>
            <Content padder>
              
            </Content>
            <FooterComponent {...this.props}></FooterComponent>
          </Container>
        )
    }
}
  export default AvisoScreen;