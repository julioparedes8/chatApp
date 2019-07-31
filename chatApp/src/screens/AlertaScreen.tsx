import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage, Alert, Platform} from 'react-native'
import api from '../api';
import { BaseResponse } from '../entidades/BaseResponse';
import { Login } from '../entidades/Login';
import localstorage from '../localstorage';
import DeviceInfo from 'react-native-device-info';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input, List, ListItem, Thumbnail, Toast, Spinner } from "native-base";
import SysAlerta from '../entidades/SysAlerta';
import SysGrupoUsuario from '../entidades/SysGrupoUsuario';
var SQLite = require('react-native-sqlite-storage')
let db:any
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
interface State {
  refresh?: String;
  token?:String;
  macADD?:String;
  id?:String;
  usuario?:String;
  isAdmin?:String;
  alertas?:any;
  grupos?:any;
  alertasIgnoradas:any;
  key:any;
  titulo:any;
  idUsuario:any;
  cargando:Boolean
}
let API = new api();
let LOCALSTORAGE = new localstorage();
let config={}
let config2={}
let config3={}
let token=""
let refresh=""
let alertas: any[]=[]
class AlertaScreen extends React.Component<Props,State> {
    constructor(props: Props){
      super(props);
      this.state = {
        token: '',
        refresh:'',
        macADD:'',
        alertas:[],
        grupos:[],
        alertasIgnoradas:[],
        key:'',
        titulo:'',
        idUsuario:'',
        cargando: false
      }
      DeviceInfo.getMACAddress().then(mac => {
        // "E5:12:D8:E5:69:97"
        this.setState({macADD:mac})
      });
       db = SQLite.openDatabase(
        {
          name: 'chatApp.db',
          location: 'default',
        },
        () => {console.log('si abrio')},
        (error:any) => {
          console.log(error);
        }
      );
      this.upDateToken()
    }
    async componentWillMount() {
      db.transaction((tx: { executeSql: (arg0: string) => void; }) => {
          tx.executeSql(
              'create table if not exists alertas (key integer, titulo text,idUsuario integer);'
          );
      });
     // this.setState({ loading: false });
    }
    async componentDidMount(){
      //arrayHolder = contactos
      this.setState({cargando:false})
        this.upDateToken().then(res => this.hacerValidacion())
      //this.upDateToken().then(res => this.getUsuarios());
      //this.setState({dataSource:contactos})
    }
    selectAlertas(idUsuario:any) {
      return new Promise((resolve, reject) => {
        var query = "select * from alertas where idUsuario="+idUsuario;
        var query2 = "delete from alertas";
        var query3= "drop table alertas"
        db.transaction((tx:any) => {
          tx.executeSql(query,[], (tx:any, results:any) => {
            const rows = results.rows;
            let alertas = [];
            for (let i = 0; i < rows.length; i++) {
              alertas.push({
                ...rows.item(i),
              });
            }
            this.setState({ alertasIgnoradas:alertas });
            resolve()
            //console.log('AI:'+ this.state.alertasIgnoradas[0].key)
          });
        });
      });
    }
    delete(reason:any) {
      console.log('reason'+reason)
      if(reason=='user'){
        console.log(reason)
        var query = "Delete from alertas where key="+this.state.key+" AND titulo='"+this.state.titulo+"' AND idUsuario="+this.state.idUsuario;
        console.log(query);
        //var params = [key, titulo,idUsuario];
        db.transaction((tx:any) => {
            tx.executeSql(query, [], (tx:any, results:any) => {
                console.log('se elimino');
               // Alert.alert("Alerta","No se ignoro la alerta")
            }, function (tx:any, err:any) {
                Alert.alert("Error",err)
                return;
            });
        });
        this.setState({titulo:'',key:'',idUsuario:''})
      }else{
        this.borrar(this.state.key)
        this.setState({titulo:'',key:'',idUsuario:''})
      }
      
    }
    insert(key:any, titulo:any,idUsuario:any) {
      console.log('id'+idUsuario)
      var query = "INSERT INTO alertas(key,titulo,idUsuario) VALUES (?,?,?)";
      var params = [key, titulo,idUsuario];
      this.setState({titulo:titulo,key:key,idUsuario:idUsuario})
      console.log('datos'+this.state.titulo+this.state.idUsuario+this.state.key)
      db.transaction((tx:any) => {
          tx.executeSql(query, params, (tx:any, results:any) => {
              console.log(results);
              Toast.show({
                text: 'Se ignoro con éxito',
                buttonText: 'Deshacer',
                duration:3000,
                onClose:this.delete.bind(this),
                position:'bottom',
                type:'success',
                buttonStyle:{
                  height:50
                }
              })
          }, function (tx:any, err:any) {
              Alert.alert("Error", "Vefique que los campos esten llenos");
              return;
          });
      });
    }
    revisarTareasIgnoradas(){
      let updatedArray = [];
      console.log(this.state.alertas)
      console.log('longitud'+this.state.alertasIgnoradas.length)
      if(this.state.alertasIgnoradas.length>0){
        for (var _i = 0; _i < this.state.alertasIgnoradas.length; _i++) {
          for (let el of this.state.alertas) {
            //console.log('entro al for')
             
                //console.log('si entro')
                if(updatedArray.length==0){
                  console.log('fue 0')
                  updatedArray.push(el);
                }else{
                  let insertarUno:boolean=false
                  let insertarDos:boolean=false
                  for (var i = 0; i < updatedArray.length; i++) {
                    if(el.key==updatedArray[i].key){
                      insertarUno=true
                      i=100
                    }else{
                      insertarUno=false
                    }
                  }
                  for (var i = 0; i < this.state.alertasIgnoradas.length; i++) {
                    if(el.key==this.state.alertasIgnoradas[i].key){
                      insertarDos=true
                      i=100
                    }else{
                      insertarDos=false
                    }
                  }
                  if (insertarDos==false && insertarUno==false){
                    updatedArray.push(el);
                  }else{
                    console.log('se rompio')
                  }
                }

          }
        }
        this.setState({alertas:updatedArray})
        console.log(updatedArray)
      }
      this.setState({cargando:true})
    }
    hacerValidacion(){
      if(this.state.isAdmin=='0'){
        this.selectAlertas(this.state.id).then(res => this.getAlertas())
        //console.log('ignradas mount:'+this.state.alertasIgnoradas)
      }else {
        this.selectAlertas(this.state.id);
        //console.log('ignradas mount:'+this.state.alertasIgnoradas)
        this.getGrupoUsuario().then(res=>this.hacerGetXGrupo())
        //this.getAlertasXGrupo(1)
      }
    }
    hacerGetXGrupo(){
      alertas=[]
      console.log('numGrupos:'+this.state.grupos.length)
      for(var i=0;i<this.state.grupos.length;i++){
        this.getAlertasXGrupo(this.state.grupos[i].key,this.state.grupos.length)
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
            this.upDateToken().then(res => this.getAlertas());
          } else if(peticion==2){
            alertas=[]
            this.upDateToken().then(res => this.hacerGetXGrupo());
          }
          else if(peticion==3){
            this.getGrupoUsuario().then(res=>this.hacerGetXGrupo())
          }
    }
    //peticion para sacar los grupos que pertenece un usuario
    getGrupoUsuario(){
      return new Promise((resolve, reject) => {
        config3 = {
          headers: { 'tenantId':'macropro','Content-Type': 'application/json','Authorization': 'Bearer '+this.state.token,'MacAddress':this.state.macADD}
        }
        console.log('token: '+this.state.token +" mac: "+ this.state.macADD+" id: "+this.state.id)
        API.post('SysGrupoUsuarioRest/getByUsuarioId',this.state.id,config3)
        .then(response => {
          const parsedJSON = response;
          var baseResponse: BaseResponse<SysGrupoUsuario>[] = parsedJSON as BaseResponse<SysGrupoUsuario>[];
          //console.log(baseResponse.message);
          //console.log(baseResponse.status);
          //console.log(baseResponse.usoEnTimbrado);
          //console.log(baseResponse.resp[0].sysGrupo.nombre);
          let groups=[]
          for(var i=0;i<baseResponse.resp.length;i++){
            groups.push({"key":baseResponse.resp[i].sysGrupo.id,"value":baseResponse.resp[i].sysGrupo.nombre})
          }
          this.setState({grupos:groups})
          console.log(this.state.grupos);
          resolve();
        })
        .catch(error =>this.mensajeShow(error.message,error.status,3))
      });
    }
    //peticion de alertas cuando es administrador
    getAlertas(){
      console.log('token: '+this.state.token +" mac: "+ this.state.macADD+" id: "+this.state.id)
      API.getAll('SysAlertaRest',config)
      .then(response => {
        const parsedJSON = response;
        var baseResponse: BaseResponse<SysAlerta>[] = parsedJSON as BaseResponse<SysAlerta>[];
        console.log(baseResponse.message);
        console.log(baseResponse.status);
        console.log(baseResponse.usoEnTimbrado);
        console.log(baseResponse.resp.length);
        let alertas: any[]=[]
        for(var i=0;i<baseResponse.resp.length;i++){
          //let nombre:String=baseResponse.resp[i].nombre
          //let fechaRec:String=baseResponse.resp[i].fechaRecordatorio
          if(baseResponse.resp[i].prioridad=='ALTA'){
            alertas.push({"key":baseResponse.resp[i].id,"titulo":baseResponse.resp[i].titulo,"detalle":baseResponse.resp[i].detalles,"prioridad":baseResponse.resp[i].prioridad,"numPriori":1,"fecha":baseResponse.resp[i].fecha})
          }
          if(baseResponse.resp[i].prioridad=='MEDIA'){
            alertas.push({"key":baseResponse.resp[i].id,"titulo":baseResponse.resp[i].titulo,"detalle":baseResponse.resp[i].detalles,"prioridad":baseResponse.resp[i].prioridad,"numPriori":2,"fecha":baseResponse.resp[i].fecha})
          }
          if(baseResponse.resp[i].prioridad=='BAJA'){
            alertas.push({"key":baseResponse.resp[i].id,"titulo":baseResponse.resp[i].titulo,"detalle":baseResponse.resp[i].detalles,"prioridad":baseResponse.resp[i].prioridad,"numPriori":3,"fecha":baseResponse.resp[i].fecha})
          }
        }
        console.log(alertas)
        alertas.sort((a, b) => {
          if(a.numPriori > b.numPriori) {
            return 1;
          } else if(a.numPriori < b.numPriori) {
            return -1;
          } else {
            return 0;
          }
        });
        //arrayHolder = users;
        this.setState({alertas:alertas})
        this.revisarTareasIgnoradas()
      })
      .catch(error =>this.mensajeShow(error.message,error.status,1))
    }
    //peticion de alertas cuando no es administrador
    getAlertasXGrupo(grupo:any,numGrupos:any){
      API.getAll('SysAlertaRest/getByGrupoId?idGrupo='+grupo,config)
      .then(response => {
        const parsedJSON = response;
        var baseResponse: BaseResponse<SysAlerta>[] = parsedJSON as BaseResponse<SysAlerta>[];
        console.log(baseResponse.message);
        console.log(baseResponse.status);
        console.log(baseResponse.usoEnTimbrado);
        console.log(baseResponse.resp.length);
        //let alertas: any[]=[]
        for(var i=0;i<baseResponse.resp.length;i++){
          //let nombre:String=baseResponse.resp[i].nombre
          //let fechaRec:String=baseResponse.resp[i].fechaRecordatorio
          if(baseResponse.resp[i].prioridad=='ALTA'){
            alertas.push({"key":baseResponse.resp[i].id,"titulo":baseResponse.resp[i].titulo,"detalle":baseResponse.resp[i].detalles,"prioridad":baseResponse.resp[i].prioridad,"numPriori":1,"fecha":baseResponse.resp[i].fecha})
          }
          if(baseResponse.resp[i].prioridad=='MEDIA'){
            alertas.push({"key":baseResponse.resp[i].id,"titulo":baseResponse.resp[i].titulo,"detalle":baseResponse.resp[i].detalles,"prioridad":baseResponse.resp[i].prioridad,"numPriori":2,"fecha":baseResponse.resp[i].fecha})
          }
          if(baseResponse.resp[i].prioridad=='BAJA'){
            alertas.push({"key":baseResponse.resp[i].id,"titulo":baseResponse.resp[i].titulo,"detalle":baseResponse.resp[i].detalles,"prioridad":baseResponse.resp[i].prioridad,"numPriori":3,"fecha":baseResponse.resp[i].fecha})
          }
        }
        console.log(alertas)
        if(numGrupos==this.state.grupos.length){
          //ordenar arreglo por numPrioridad
          alertas.sort((a, b) => {
            if(a.numPriori > b.numPriori) {
              return 1;
            } else if(a.numPriori < b.numPriori) {
              return -1;
            } else {
              return 0;
            }
          });
          this.setState({alertas:alertas})
          this.revisarTareasIgnoradas()
        }
        //arrayHolder = users;
        //this.setState({alertas:alertas})
      })
      .catch(error =>this.mensajeShow(error.message,error.status,2))
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
    borrar=(key:number)=>{
      let updatedArray = [];
      for (let el of this.state.alertas) {
          if (el.key !== key) {
            updatedArray.push(el);
          }else{
            //this.insert(el.key,el.titulo,this.state.id)
          }
          
      }
      this.setState({alertas:updatedArray})

      console.log(updatedArray)
    }
    renderItem= ({item})=> (
      <ListItem thumbnail >
        <Left>
          {item.prioridad == 'BAJA' &&  <Thumbnail style={{}} square source={require('../../assets/priority_high.png')} />}
          {item.prioridad == 'MEDIA' && <Thumbnail style={{}} square source={require('../../assets/priority_medium.png')} />}
          {item.prioridad == 'ALTA' && <Thumbnail style={{}} square source={require('../../assets/priority_low.png')} />}
        </Left>
        <Body>
          <Text>{item.titulo}</Text>
          <Text note numberOfLines={1}>{item.detalle}</Text>
        </Body>
        <Right>
          {item.prioridad == 'BAJA' &&           
            <Button transparent onPress={()=>this.insert(item.key,item.titulo,this.state.id)}>
              <Text>Ignorar</Text>
            </Button>
          }
        </Right>
      </ListItem>
      )
    render() {
      if (this.state.cargando==false) {
        return (
          <Container style={styles.container}>
            <Content  contentContainerStyle={styles.spinnerStyle}>
              <Spinner color='blue' />
                    <Text>Cargando...</Text>
            </Content>
          </Container>
        );
      }else{
        return (
          <Container>
            <Content>
              <View style={styles.viewStyle}>
                  <FlatList
                    data={this.state.alertas}
                    //Item Separator View
                    //enableEmptySections={true}
                    renderItem={this.renderItem}
                    style={{ marginTop: 10 }}
                    keyExtractor={(item:any,index:any) => index.toString()}
                  />
                </View>
            </Content>
          </Container>
        );
      }
    }
  }
  const styles = StyleSheet.create({
    viewStyle: {
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'white',
      marginTop: Platform.OS == 'ios' ? 30 : 0,
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
  export default AlertaScreen;