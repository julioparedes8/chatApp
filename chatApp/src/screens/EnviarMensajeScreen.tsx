import React from 'react';
import { Container, Header, Content, Form, Item, Input, Button,Left,Icon,Body,Right,Title,Text, ListItem, Thumbnail, List } from 'native-base';
import {View,StyleSheet,FlatList, AsyncStorage} from 'react-native'
import api from '../api';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
let API = new api();
class EnviarMensajeScreen extends React.Component<Props> {
    constructor(props: Props){
      super(props);
    }
    handleClick=()=>{
      const {navigate}= this.props.navigation
      navigate('Chat')
      //this.props.navigation.navigate("Login")
      // Call method from parent
      //this.props.onPress();
    }
    render(){
          return (
            <Container>
              <Header searchBar style={{backgroundColor:"#70CCF6"}}>
              <Left>
                <Button
                      transparent
                      onPress={()=>this.props.navigation.navigate("Home")}
                        >
                      <Icon type="Ionicons" name="ios-arrow-back" />
                    </Button>  
              
                </Left>
                <Body >
                <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
                </Body>
              </Header>
              <Content padder>
                <List>
                  <ListItem avatar button={true} onPress={this.handleClick}>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Pito Perez</Text>
                    </Body>
                  </ListItem>
                </List>
              </Content>
            </Container>
          )
    }
}
const styles = StyleSheet.create({
  button:{
    margin: 60, 
    marginTop: 50,
    backgroundColor:'#70CCF6'
  }
});
export default EnviarMensajeScreen;