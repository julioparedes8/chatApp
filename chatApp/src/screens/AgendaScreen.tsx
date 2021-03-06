import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage, Dimensions, Alert} from 'react-native'
import api from '../api';
import { LocaleConfig } from 'react-native-calendars';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
import { Login } from '../entidades/login';
import localstorage from '../localstorage';
import { BaseResponse } from '../entidades/BaseResponse';
import { Tarea } from '../entidades/Tarea';
import DeviceInfo from 'react-native-device-info';
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
interface State{
  items?:any
  selectedDate?: any
  cargando?: boolean
  refresh?: String;
  token?:String;
  macADD?:String;
  id?:String;
  usuario?:String;
  agenda?:any;
}
let config={}
let config2={}
let config3={}
let token=""
let refresh=""
let este:any=[]
let {height, width} = Dimensions.get('window');
let API = new api();
let LOCALSTORAGE = new localstorage();
LocaleConfig.locales['mx'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viérnes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vié', 'Sáb'],
  
};
LocaleConfig.defaultLocale = 'mx';
class AgendaScreen extends React.Component<Props,State> {
    constructor(props:Props){
      super(props);
      this.state={
        items:{},
        selectedDate: null,
        cargando:true,
        token:'',
        refresh:'',
        usuario:'',
        id:'',
        macADD:'',
        agenda:[]
      }
      DeviceInfo.getMACAddress().then(mac => {
        // "E5:12:D8:E5:69:97"
        this.setState({macADD:mac})
      });
      this.upDateToken().then(res => this.peticion());
    }
    //actualiza variables cuando se monta el componentev
    componentDidMount(){
      //carga el estado para despues hacer la peticion de los grupos
      //this.upDateToken().then(res => this.peticion());
      //this.getGrupoUsuario()
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
            this.upDateToken().then(res => this.peticion());
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
              "Tarea agregada exitosamente",
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
    loadItems(day: { timestamp: number; }) {
      this.setState({selectedDate: day});
      //this.upDateToken().then(res => this.peticion());
      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = this.timeToString(time);
          //const hora = '2019-07-05';
          //console.log(time);
          if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
          }else {
            this.state.items[strTime] = [];
            console.log('agenda'+this.state.agenda.length)
            for (let j = 0; j < this.state.agenda.length; j++) {
              const hora = this.state.agenda[j].fecha;
              if(strTime==hora){
                  if(this.state.agenda[j].contenido==''){
                    this.state.items[strTime].push({
                      id: this.state.agenda[j].id,
                      idCreador: this.state.agenda[j].idCreador,
                      nomCreador: this.state.agenda[j].nomCreador,
                      descartada: this.state.agenda[j].descartada,
                      leido: this.state.agenda[j].leido,
                      asunto: this.state.agenda[j].asunto,
                      contenido: this.state.agenda[j].contenido,
                      fecha: this.state.agenda[j].fecha,
                      expiracion: this.state.agenda[j].fechaExpiracion,
                      creacion: this.state.agenda[j].fechaCreacion,
                      recordatorio: this.state.agenda[j].fechaRecordatorio,
                      tipo: this.state.agenda[j].tipo,
                      height: 60
                    });
                  }else {
                    this.state.items[strTime].push({
                      id: this.state.agenda[j].id,
                      idCreador: this.state.agenda[j].idCreador,
                      nomCreador: this.state.agenda[j].nomCreador,
                      descartada: this.state.agenda[j].descartada,
                      leido: this.state.agenda[j].leido,
                      asunto: this.state.agenda[j].asunto,
                      contenido: this.state.agenda[j].contenido,
                      fecha: this.state.agenda[j].fecha,
                      expiracion: this.state.agenda[j].fechaExpiracion,
                      creacion: this.state.agenda[j].fechaCreacion,
                      recordatorio: this.state.agenda[j].fechaRecordatorio,
                      tipo: this.state.agenda[j].tipo,
                      height: 110
                    });
                  }
                }
            }
          }
        }
        console.log(this.state.items);
        const newItems: any = {};
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        this.setState({
          items: newItems
        });
      }, 500);
      // console.log(`Load Items for ${day.year}-${day.month}`);
    }
  
    renderItem(item: { height: string | number | undefined;id:Number;idCreador:Number;nomCreador:String,descartada:Number;leido:Number; asunto: String;contenido: String;fecha:String;fechaExpiracion:String,fechaCreacion:String,fechaRecordatorio:String;tipo:String }) {
      return (
        <View style={[styles.item, {height: item.height}]}>
            <Text onPress={() => this.presionoTarea(item)}>{item.asunto}</Text>
            <Text onPress={() => this.presionoTarea(item)}>{item.contenido}</Text>
        </View>
      );
    }
    presionoTarea=(item:any)=>{
      if (item.contenido==''){
        //Alert.alert('Tarea','Asunto: '+ item.asunto+'\nFecha Expiración: '+item.expiracion+'\nFecha Recordatorio: '+item.recordatorio+'\nTipo: '+item.tipo)
        this.props.navigation.push("ModificarTarea",{idTarea:item.id,idCreador:item.idCreador,nomCreador:item.nomCreador,descartada:item.descartada,leido:item.leido,creacion:item.creacion,expiracion:item.expiracion,tipo:item.tipo,asunto:item.asunto,contenido:''})
      }else {
        //Alert.alert('Tarea','Asunto: '+ item.asunto+'\nContenido: '+item.contenido+'\nFecha Expiración: '+item.expiracion+'\nFecha Recordatorio: '+item.recordatorio+'\nTipo: '+item.tipo)
        this.props.navigation.push("ModificarTarea",{idTarea:item.id,idCreador:item.idCreador,nomCreador:item.nomCreador,descartada:item.descartada,leido:item.leido,creacion:item.creacion,expiracion:item.expiracion,tipo:item.tipo,asunto:item.asunto,contenido:item.contenido})
      }
    }
    renderEmptyDate() {
      return (
        <View style={styles.emptyDate}><Text></Text></View>
      );
    }
  
    rowHasChanged(r1: { asunto: any; }, r2: { asunto: any; }) {
      return r1.asunto !== r2.asunto;
    }
  
    timeToString(time: string | number | Date) {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    }
    selected(){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      const strTime = yyyy+'-'+mm+'-'+dd;
      return  strTime
    }
    render(){
      return(
            <View style={{height: height-200}}>
              <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                //selected={'2019-05-22'}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={1}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={12}
                // Enable or disable scrolling of calendar list
                // markingType={'period'}
                // markedDates={{
                //    '2017-05-08': {textColor: '#666'},
                //    '2017-05-09': {textColor: '#666'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                // monthFormat={'yyyy'}
                // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
              />
          </View>
        )
    }
    peticion(){
      config3 = {
        headers: { 'tenantId':'macropro','Content-Type': 'application/json','Authorization': 'Bearer '+this.state.token,'MacAddress':this.state.macADD}
      }
      let data={
        id:this.state.id
      }
      console.log('token: '+this.state.token +" mac: "+ this.state.macADD+" id: "+this.state.id)
      API.post('SysTareaRest/ByDestinatario',data,config3)
      .then(response => {
        const parsedJSON = response;
        var baseResponse: BaseResponse<Tarea>[] = parsedJSON as BaseResponse<Tarea>[];
        //console.log(baseResponse.message);
        //console.log(baseResponse.status);
        //console.log(baseResponse.usoEnTimbrado);
        //console.log(baseResponse.resp[0].sysGrupo.nombre);
        let tareas=[]
        for(var i=0;i<baseResponse.resp.length;i++){
          let fechaExp:String=baseResponse.resp[i].fechaExpiracion
          let fechaRec:String=baseResponse.resp[i].fechaRecordatorio
          let fechaCre:String=baseResponse.resp[i].fechaCreacion
          let leido:number
          let descartada:number
          if(baseResponse.resp[i].leido==true){
            leido=1
          }else {
            leido=0
          }
          if(baseResponse.resp[i].descartada==true){
            descartada=1
          }else { 
            descartada=0
          }
          tareas.push({"id":baseResponse.resp[i].id,"idCreador":baseResponse.resp[i].creador.id,"nomCreador":baseResponse.resp[i].creador.codigo,"descartada":descartada,"leido":leido,"asunto":baseResponse.resp[i].asunto,"contenido":baseResponse.resp[i].contenido,"fecha":fechaExp.substring(0,10),"fechaExpiracion":fechaExp.substring(0,10)+' '+fechaExp.substring(11,19),"fechaCreacion":fechaCre.substring(0,10)+' '+fechaCre.substring(11,19),"fechaRecordatorio":fechaRec.substring(0,10)+' '+fechaRec.substring(11,19),"tipo":baseResponse.resp[i].tipo})
        }
        console.log(tareas)
        this.setState({agenda:tareas})
      })
      .catch(error =>this.mensajeShow(error.message,error.status,1))
    }
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    alignItems:'center',
    flexDirection: 'column',
  },
  emptyDate: {
    height: 80,
    flex:1,
    paddingTop: 30
  }
});
  export default AgendaScreen;