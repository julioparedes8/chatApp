import React from 'react';
import { Container, Header, Content, Form, Item, Input, Button,Left,Icon,Body,Right,Title,Text, ListItem, Thumbnail, List } from 'native-base';
import {View,StyleSheet,FlatList, AsyncStorage, Platform} from 'react-native'
import api from '../api';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
interface state{
  search: string;
  dataSource:any
  //creacionTime?: string;
}
let API = new api();
let arrayHolder:any
let contactos=[
  {
    "nombre":"Julio paredes",
    "imagen":"../../assets/user.png"
  },
  {
    "nombre":"Kevin Vazquez",
    "imagen":"../../assets/user.png"
  },
  {
    "nombre":"Cristiano Ronaldo",
    "imagen":"../../assets/user.png"
  },
  {
    "nombre":"Cristiano Dos Santos",
    "imagen":"../../assets/user.png"
  },
  {
    "nombre":"Leo Messi",
    "imagen":"../../assets/user.png"
  }
  ,
  {
    "nombre":"Raul Jimenez",
    "imagen":"../../assets/user.png"
  }
  ,
  {
    "nombre":"Javier Hernandez",
    "imagen":"../../assets/user.png"
  }
  ,
  {
    "nombre":"Neymar Jr",
    "imagen":"../../assets/user.png"
  }
  ,
  {
    "nombre":"Memo ochoa",
    "imagen":"../../assets/user.png"
  }
  ,
  {
    "nombre":"Luis Suarez",
    "imagen":"../../assets/user.png"
  }
]
class EnviarMensajeScreen extends React.Component<Props,state> {
    constructor(props: Props){
      super(props);
      this.state = { search: '',dataSource:[]};
      arrayHolder = [];
    }
    handleClick=()=>{
      const {navigate}= this.props.navigation
      navigate('Chat')
      //this.props.navigation.navigate("Login")
      // Call method from parent
      //this.props.onPress();
    }
    componentDidMount(){
      this.setState({dataSource:contactos})
      arrayHolder = contactos;
    }
    search = (text: any) => {
      console.log(text);
    };
    clear = () => {
      this.setState({search:''});
    };
    SearchFilterFunction(text:any) {
      //passing the inserted text in textinput
      const newData = arrayHolder.filter(function(item:any) {
        //applying filter for the inserted text in search bar
        const itemData = item.nombre ? item.nombre.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
  
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        dataSource: newData,
        search: text,
      });
    }
    render(){
          return (
            <Container>
              <Header searchBar style={{backgroundColor:"#70CCF6",height:70}}>
                  <Left>
                    <Button
                        transparent
                        onPress={()=>this.props.navigation.navigate("Home")}
                          >
                        <Icon type="Ionicons" name="ios-arrow-back" />
                    </Button>
                  </Left>
                <Body>
                  <Item>
                      <Icon name="ios-search" />
                      <Input  
                        onChangeText={(text:any) => this.SearchFilterFunction(text)}
                        placeholder="Buscar"
                        value={this.state.search}/>
                      <Icon name="ios-people" />
                  </Item>
                </Body>
              </Header>
              <Content padder>
              <View style={styles.viewStyle}>
                <FlatList
                  data={this.state.dataSource}
                  //Item Separator View
                  renderItem={({ item }) => (
                    // Single Comes here which will be repeatative for the FlatListItems
                    <ListItem avatar button={true} onPress={this.handleClick}>
                      <Left>
                        <Thumbnail source={require('../../assets/user.png')} />
                      </Left>
                      <Body>
                        <Text>{item.nombre}</Text>
                        <Text note></Text>
                      </Body>
                  </ListItem>
                  )}
                  //enableEmptySections={true}
                  style={{ marginTop: 10 }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            
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
  },
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: Platform.OS == 'ios' ? 30 : 0,
  },
});
export default EnviarMensajeScreen;