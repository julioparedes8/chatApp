import React from 'react';
import { Container, Header, Content, Form, Item, Input, Button,Left,Icon,Body,Right,Title,Text, ListItem, Thumbnail, List, Spinner } from 'native-base';
import {View,StyleSheet,FlatList, AsyncStorage, Platform, Alert} from 'react-native'
import api from '../api';
import localstorage from '../localstorage';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import { Login } from '../entidades/login';
import { BaseResponse } from '../entidades/BaseResponse';
import Usuario from '../entidades/Usuario';
import SysGrupoUsuario from '../entidades/SysGrupoUsuario';
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
interface state{
  search: string;
  dataSource:any
  refresh?: String;
  token?:String;
  macADD?:String;
  id?:String;
  usuario?:String;
  isAdmin?:String;
  contacts?:any;
  cargando:Boolean;
  //creacionTime?: string;
}
let API = new api();
let LOCALSTORAGE = new localstorage();
let arrayHolder:any
let config={}
let config2={}
let config3={}
let token=""
let refresh=""
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
      this.state = { search: '',dataSource:[],contacts:[],cargando:false};
      arrayHolder = [];
      DeviceInfo.getMACAddress().then(mac => {
        // "E5:12:D8:E5:69:97"
        this.setState({macADD:mac})
      });
    }
    handleClick=()=>{
      const {navigate}= this.props.navigation
      navigate('Chat')
      //this.props.navigation.navigate("Login")
      // Call method from parent
      //this.props.onPress();
    }
    componentDidMount(){
      //arrayHolder = contactos
      this.setState({cargando:false})
        this.upDateToken().then(res => this.hacerValidacion())
      //this.upDateToken().then(res => this.getUsuarios());
      //this.setState({dataSource:contactos})
    }
    hacerValidacion(){
      if(this.state.isAdmin=='0'){
       this.getUsuarios()
      }else {
        this.getUsuariosXGrupo()
      }
    }
    getUsuarios(){
      console.log('token: '+this.state.token +" mac: "+ this.state.macADD+" id: "+this.state.id)
      API.getAll('UsuarioRest',config)
      .then(response => {
        const parsedJSON = response;
        var baseResponse: BaseResponse<Usuario>[] = parsedJSON as BaseResponse<Usuario>[];
        console.log(baseResponse.message);
        console.log(baseResponse.status);
        console.log(baseResponse.usoEnTimbrado);
        console.log(baseResponse.resp.length);
        let users: any[]=[]
        for(var i=0;i<baseResponse.resp.length;i++){
          //let nombre:String=baseResponse.resp[i].nombre
          //let fechaRec:String=baseResponse.resp[i].fechaRecordatorio
          if(this.state.id==baseResponse.resp[i].id){

          }else {
            users.push({"nombre":baseResponse.resp[i].nombre,"imagen":"../../assets/user.png"})
          }
        }
        console.log(users)
        arrayHolder = users;
        this.setState({dataSource:users})
        this.setState({cargando:true})
      })
      .catch(error =>this.mensajeShow(error.message,error.status,1))
    }
    getUsuariosXGrupo(){
      console.log('token: '+this.state.token +" mac: "+ this.state.macADD+" id: "+this.state.id)
      API.post('SysGrupoUsuarioRest/getByUsuarioId',this.state.id,config)
      .then(response => {
        const parsedJSON = response;
        var baseResponse: BaseResponse<SysGrupoUsuario>[] = parsedJSON as BaseResponse<SysGrupoUsuario>[];
        console.log(baseResponse.message);
        console.log(baseResponse.status);
        console.log(baseResponse.usoEnTimbrado);
        console.log(baseResponse.resp.length);
        let users: any[]=[]
        for(var i=0;i<baseResponse.resp.length;i++){
          if(baseResponse.resp[i].sysGrupo.tipo=='MENSAJES'){
            console.log('si es mensajes');
            //let nombre:String=baseResponse.resp[i].nombre
            //let fechaRec:String=baseResponse.resp[i].fechaRecordatorio
            console.log(baseResponse.resp[i].sysGrupo.listGrupoUsuario.length);
            for(var j=0;j<baseResponse.resp[i].sysGrupo.listGrupoUsuario.length;j++){
              if(this.state.id==baseResponse.resp[i].sysGrupo.listGrupoUsuario[j].usuario.id){

              }else {
                if(users.length==0){
                  console.log('vale 0');
                  users.push({"id":baseResponse.resp[i].sysGrupo.listGrupoUsuario[j].usuario.id,"nombre":baseResponse.resp[i].sysGrupo.listGrupoUsuario[j].usuario.nombre,"imagen":"../../assets/user.png"})
                }else{
                  let existe=false
                  console.log('length'+users.length);
                  for(var k=0;k<users.length;k++){
                    console.log('users'+users[k].id+' '+baseResponse.resp[i].sysGrupo.listGrupoUsuario[j].usuario.id);
                    if(users[k].id==baseResponse.resp[i].sysGrupo.listGrupoUsuario[j].usuario.id){
                    existe=false
                    k=5
                    }else{
                      existe=true
                    }
                  }
                  if(existe==true){
                    users.push({"id":baseResponse.resp[i].sysGrupo.listGrupoUsuario[j].usuario.id,"nombre":baseResponse.resp[i].sysGrupo.listGrupoUsuario[j].usuario.nombre,"imagen":"../../assets/user.png"})
                    console.log('aqui');
                  }
                  existe=false
                }
              }
            }
            //if(this.state.id==baseResponse.resp[i].id){

            //}else {
            // users.push({"nombre":baseResponse.resp[i].nombre,"imagen":"../../assets/user.png"})
            //}
          }else{

          }
        }
        console.log(users)
        arrayHolder = users;
        this.setState({dataSource:users})
        this.setState({cargando:true})
      })
      .catch(error =>this.mensajeShow(error.message,error.status,2))
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
    renderItem=({item}) => (
      // Single Comes here which will be repeatative for the FlatListItems
      <ListItem avatar button={true} onPress={this.handleClick}>
        <Left>
          <Thumbnail source={require('../../assets/user.png')} />
        </Left>
        <Body>
          <Text style={{position: 'absolute',bottom:25,left:0}}>{item.nombre}</Text>
          <Text  style={{marginTop:30}}  note></Text>
        </Body>
    </ListItem>
    )
    render(){
      if (this.state.cargando==false) {
        return (
          <Container>
              <Header searchBar style={{backgroundColor:"#4377C6",height:70}}>
                  <Left style={{flexDirection:'row',flex:1}}>
                    <Button
                        transparent
                        onPress={()=>this.props.navigation.navigate("Home")}
                          >
                        <Icon type="Ionicons" name="ios-arrow-back" />
                    </Button>
                    <Item>
                      <Icon name="ios-search" />
                      <Input  
                        onChangeText={(text:any) => this.SearchFilterFunction(text)}
                        placeholder="Buscar"
                        value={this.state.search}/>
                     
                  </Item>
                  </Left>
              </Header>
              <Content  contentContainerStyle={styles.spinnerStyle}>
                    <Spinner color='blue' />
                    <Text>Cargando...</Text>
                </Content>
            </Container>

        );
      }else{
          return (
            <Container>
              <Header searchBar style={{backgroundColor:"#4377C6",height:70}}>
                  <Left style={{flexDirection:'row',flex:1}}>
                    <Button
                        transparent
                        onPress={()=>this.props.navigation.navigate("Home")}
                          >
                        <Icon type="Ionicons" name="ios-arrow-back" />
                    </Button>
                    <Item>
                      <Icon name="ios-search" />
                      <Input  
                        onChangeText={(text:any) => this.SearchFilterFunction(text)}
                        placeholder="Buscar"
                        value={this.state.search}/>
                     
                  </Item>
                  </Left>
              </Header>
              <Content padder>
              <View style={styles.viewStyle}>
                <FlatList
                  data={this.state.dataSource}
                  //Item Separator View
                  renderItem={this.renderItem}
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
    upDateToken(){
      return new Promise((resolve, reject) => {
        LOCALSTORAGE.getToken().then(response=>{
          this.setState({token:response})
          console.log(this.state.token)
          config = {
            headers: { 'tenantId':'macropro','Content-Type': 'application/json','Authorization': 'Bearer '+this.state.token,'MacAddress':this.state.macADD }
          }
        })
        LOCALSTORAGE.getRefresh().then(response=>{
          this.setState({refresh:response})
          console.log(this.state.refresh)
          config2 = {
            headers: { 'tenantId':'macropro','refreshToken': this.state.refresh,'Content-Type': 'application/json','MacAddress':this.state.macADD }
          }
        })
        LOCALSTORAGE.getIdUsuario().then(response=>{
          console.log(response)
          this.setState({id:response})
          console.log(this.state.id)
        })
        LOCALSTORAGE.getIsAdmin().then(response=>{
          console.log(response)
          this.setState({isAdmin:response})
          console.log(this.state.isAdmin)
        })
        LOCALSTORAGE.getUsuario().then(response=>{
          console.log(response)
          this.setState({usuario:response})
          console.log(this.state.usuario)
          resolve();
        })
      });
    }
     //peticion para hacer el refresh por que se vencio el token
    //si el status es 200 entonces llama otra funcion  para actualizar los tokens
    //si es 400 significa que ya se venció el refresh tambien y procede a mostrar el porque y cierra sesión automaticamente
    refresh(peticion:any){
      API.sesion('refresh',config2)
    .then(response => {
      const parsedJSON = response;
      var login: Login[] = parsedJSON as Login[];
      //console.log('MESSAGE: ' +login.message);
      //console.log('STATUS: ' +login.status);
      //console.log('TOKEN: ' +login.resp);
      if (String(login.status)=='200'){
        token=login.resp.token
        refresh=login.resp.refresh
        console.log('en el refresh')
        this.refreshCorrecto(peticion)
      }else if (String(login.status)=='400'){
        this.mensajeShow(login.message,login.status)
      }
    })
    .catch(error => this.mensajeShow(error.response.message,error.response.status))
    }
    //actualiza los tokens en el local storage y despues en el mismo componente
    refreshCorrecto(peticion:any){
          LOCALSTORAGE.setToken(token)
          LOCALSTORAGE.setRefresh(refresh)
          console.log(peticion+'refreshCorrecto')
          if(peticion==1){
            //carga el estado para despues hacer la peticion del insert
            this.upDateToken().then(res => this.getUsuarios());
          } else if(peticion==2){
            this.upDateToken().then(res => this.getUsuariosXGrupo());
          }
    }
    //muestra mensajes/alertas dependiendo de status ya sea de peticion o de validacion
    mensajeShow = (mensaje:any,status:any,peticion?:any)=>{
      if (status==1){
        Alert.alert(
          "Error de validación",
          mensaje,
          [
            {text: 'OK', 
            onPress: () => ""},
          ],
          {cancelable: false},
        );
      } else if (status==200){
        Alert.alert(
          "Se sacaron los usuarios correctamente",
          mensaje,
          [
            {text: 'OK', 
            onPress: () => 'this.limpiar()'},
          ],
          {cancelable: false},
        );
      }else if(status==300){
        Alert.alert(
          'Inicio de Sesión',
          mensaje,
          [
            {text: 'OK', onPress: () => 'cerrar'},
          ],
          {cancelable: false},
        );
      }else if (status==400){
        Alert.alert(
          "Error",
          mensaje,
          [
            {text: 'OK', 
            onPress: () =>this.salir()},
          ],
          {cancelable: false},
        );
      }else if (status==401){
        //Alert.alert(
          //"Error",
          //mensaje,
          //[
            //{text: 'OK', 
            //onPress: () =>  this.refresh()},
          //],
          //{cancelable: false},
        //);
        console.log('entro en 401')
        if (peticion==1){
          this.refresh(1)
        }else if (peticion==2){
          this.refresh(2)
        }else if(peticion==3){
          this.refresh(3)
        }
      }else if(status==500){
        Alert.alert(
          'Inicio de Sesión',
          mensaje,
          [
            {text: 'OK', onPress: () => 'cerrar'},
          ],
          {cancelable: false},
        );
      }
    }
    //se vencio la sesión por lo tanto se redirigera a iniciar sesión
    salir=()=>{
      LOCALSTORAGE.borrarSesion()
      this.props.navigation.navigate("Login")
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
  header:{
    
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    // backgroundColor: '#4286f4',
  },
});
export default EnviarMensajeScreen;