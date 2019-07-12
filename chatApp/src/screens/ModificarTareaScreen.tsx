import React from 'react';
import { Container, Header, Content, Form, Item, Input, Button,Left,Icon,Body,Right,Title,Text,Label, Textarea, Picker } from 'native-base';
import {View,StyleSheet,FlatList, AsyncStorage, Alert, TextInput} from 'react-native'
import api from '../api';
import DatePicker from 'react-native-datepicker';
import localstorage from '../localstorage';
import { CheckBox } from 'react-native-elements'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import { BaseResponse } from '../entidades/BaseResponse';
import { Tarea } from '../entidades/Tarea';
import { Login } from '../entidades/login';
import { Time } from 'react-native-gifted-chat';
import SysGrupoUsuario from '../entidades/SysGrupoUsuario';
import SysGrupo from '../entidades/SysGrupo';
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
interface state{
    creacionDate?: string;
    creacionTime?: string;
    expiracionDate?: string;
    expiracionTime?:string;
    selectedAviso?:string;
    selectedGrupo?:string;
    selectedTipo?:string;
    checked:boolean;
    enabled:boolean;
    disableAll:boolean;
    asunto:string;
    contenido:string;
    refresh?: String;
    token?:String;
    macADD?:String;
    id?:String;
    usuario?:String;
    grupos:any;
    usuarios:any;
    modificar:boolean
}
let API = new api();
let LOCALSTORAGE = new localstorage();
let config={}
let config2={}
let config3={}
let idCreador:string
let idTarea:string
let nomCreador:string
let descartada:Number
let leido:Number
let token=""
let refresh=""
let fechaRecordatorio:any
let groups:any
class ModificarTareaScreen extends React.Component<Props,state> {
    constructor(props: Props){
      super(props);
      idTarea = this.props.navigation.getParam('idTarea');
      nomCreador = this.props.navigation.getParam('nomCreador');
      idCreador = this.props.navigation.getParam('idCreador');
      descartada = this.props.navigation.getParam('descartada');
      leido = this.props.navigation.getParam('leido');
      const expiracion = this.props.navigation.getParam('expiracion');
      const creacion = this.props.navigation.getParam('creacion');
      const tipo = this.props.navigation.getParam('tipo');
      const asunto = this.props.navigation.getParam('asunto');
      const contenido = this.props.navigation.getParam('contenido');
      console.log('Valores'+idTarea+' '+idCreador +' '+expiracion+' '+tipo+' '+asunto+' '+contenido)
      this.state = {usuarios:[],grupos:[{"key":"1","value":"seleccionar"}],usuario:nomCreador, id:'',asunto:asunto,contenido:contenido,expiracionDate:expiracion.substring(0,10),expiracionTime:expiracion.substring(11,16),creacionTime:creacion.substring(11,19),creacionDate: creacion.substring(0,10),selectedAviso:'Al Momento',selectedGrupo:'',selectedTipo:tipo,checked: false,disableAll: true,enabled: false,modificar:false,macADD:'',token: '',refresh:'' };
      this.setDateCreacion = this.setDateCreacion.bind(this);
      this.setDateExpiracion = this.setDateExpiracion.bind(this);
      DeviceInfo.getMACAddress().then(mac => {
        // "E5:12:D8:E5:69:97"
        this.setState({macADD:mac})
      });
      //this.upDateToken()
    }
    //obtiene mac
    //actualiza el token,refresh,id,usuario obteniendolo del local storage
    agregarZero(numero:any){
      if(numero<10){
        var horaBuena= "0"+numero
        return horaBuena
        //console.log(horaBuena)
      }else {
        var horaBuena:string=numero.toString()
        return horaBuena
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
          console.log(this.state.id+' '+idCreador)
        if(this.state.id==idCreador){
            this.setState({
                disableAll:false,
                modificar:true
            })
        }
        })
        LOCALSTORAGE.getUsuario().then(response=>{
          console.log(response)
          //this.setState({usuario:response})
          console.log(this.state.usuario)
          resolve();
        })
      });
    }
    //actualiza variables cuando se monta el componentev
    componentDidMount(){
      //carga el estado para despues hacer la peticion de los grupos
      this.upDateToken().then(res => this.getGrupoUsuario());
      //this.getGrupoUsuario()
    }
    //crea el diseño de la pantalla
    render(){
          return (
            <Container>
              <Header style={{backgroundColor:"#70CCF6",height:70}}>
                  <Left style={{ flex:1}}>
                    
                    <Button
                      transparent
                      onPress={()=>this.props.navigation.navigate("Home")}
                        >
                      <Icon type="Ionicons" name="ios-arrow-back" />
                    </Button>
                  
                </Left>
                  <Body style={{ flex:1}}>
                    <Title  style={{ alignSelf: 'center'}}>Ver Tarea</Title>
                  </Body>
                  <Right style={{ flex:1}}>
                    
                  </Right>
              </Header>
              <Content>
                <Form>
                    <View
                        style={{
                          flexDirection: 'column',
                          height: 190,
                          // Set border width.
                          borderWidth: 2,
                          // Set border Hex Color Code Here.
                          borderColor: '#F7F7F7',
                          // Setting up Text Font Color.
                          
                          // Setting Up Background Color of Text component.
                          backgroundColor : 'white',
                          // Adding padding on Text component.
                          padding : 2,
                         
                          margin: 10,
                          alignItems:'center'
                        }}>
                        <Text style={{fontWeight: 'bold',textAlign:'center',alignItems:'center'}}>Fecha</Text>
                        <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <Text style={{marginRight:5,marginTop:10,marginBottom:10}}>   Creación:</Text>
                          <DatePicker
                            style={{width: 140,marginLeft:2,marginRight:15,marginTop:5,marginBottom:5}}
                            date={this.state.creacionDate}
                            mode="date"
                            disabled={true}
                            format="YYYY-MM-DD"
                            confirmBtnText="Ok"
                            cancelBtnText="Cancelar"
                            customStyles={{
                                dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                                },
                                dateInput: {
                                marginLeft: 36
                                }
                            }}
                            minuteInterval={10}
                            onDateChange={(datetime:any) => {this.setState({creacionDate: datetime});console.log(datetime)}}
                            />
                            <DatePicker
                            style={{width: 80, marginLeft:2,marginRight:15,marginTop:5,marginBottom:5}}
                            date={this.state.creacionTime}
                            mode="time"
                            disabled={true}
                            format="HH:mm:ss"
                            is24Hour={true}
                            confirmBtnText="Ok"
                            cancelBtnText="Cancelar"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                marginLeft: 0
                                }
                            }}
                            minuteInterval={10}
                            onDateChange={(datetime:any) => {this.setState({creacionTime: datetime});console.log(datetime)}}
                            />
                        </View>
                        <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <Text style={{marginRight:5,marginTop:10,marginBottom:10}} >Expiración:</Text>
                          <DatePicker
                            style={{width: 140, marginLeft:2,marginRight:15}}
                            date={this.state.expiracionDate}
                            mode="date"
                            disabled={this.state.disableAll}
                            format="YYYY-MM-DD"
                            confirmBtnText="Ok"
                            cancelBtnText="Cancelar"
                            customStyles={{
                                dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                                },
                                dateInput: {
                                marginLeft: 36
                                }
                            }}
                            minuteInterval={10}
                            onDateChange={(date:any) => {this.setState({expiracionDate: date});console.log(date)}}
                            />
                             <DatePicker
                            style={{width: 80, marginLeft:2,marginRight:15}}
                            date={this.state.expiracionTime}
                            mode="time"
                            format="HH:mm"
                            disabled={this.state.disableAll}
                            is24Hour={true}
                            confirmBtnText="Ok"
                            cancelBtnText="Cancelar"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                marginLeft: 0
                                }
                            }}
                            minuteInterval={10}
                            onDateChange={(datetime:any) => {this.setState({expiracionTime: datetime});console.log(datetime)}}
                            />
                        </View>
                        <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <Text style={{ marginRight:5,marginTop:14,marginBottom:14}}>Aviso:</Text>
                          <View style={{width:200,marginLeft:2,marginRight:15,marginTop:0,marginBottom:0}}>
                            <Item picker>
                                <Picker
                                  mode="dropdown"
                                  iosIcon={<Icon name="arrow-down" />}
                                  style={{ width: undefined}}
                                  placeholder="Seleccionar"
                                  enabled={!this.state.disableAll}
                                  placeholderStyle={{ color: "#bfc6ea" }}
                                  placeholderIconColor="#007aff"
                                  selectedValue={this.state.selectedAviso}
                                  onValueChange={this.comboAviso.bind(this)}
                                >
                                  <Picker.Item label="Al Momento" value="Al Momento" />
                                  <Picker.Item label="Ninguno" value="Ninguno" />
                                  <Picker.Item label="1 minuto" value="1" />
                                  <Picker.Item label="5 minutos" value="5" />
                                  <Picker.Item label="15 minutos" value="15" />
                                  <Picker.Item label="30 minutos" value="30" />
                                  <Picker.Item label="1 hora" value="60" />
                                  <Picker.Item label="2 horas" value="120" />
                                </Picker>
                            </Item>
                          </View>
                        </View>
                      </View>
                    <View
                        style={{
                          flexDirection: 'column',
                          height: 100,
                          // Set border width.
                          borderWidth: 2,
                          // Set border Hex Color Code Here.
                          borderColor: '#F7F7F7',
                          // Setting up Text Font Color.
                         
                          // Setting Up Background Color of Text component.
                          backgroundColor : 'white',
                          // Adding padding on Text component.
                          padding : 2,
                         
                          margin: 10,
                          alignItems:'center'
                        }}>
                        <Text style={{fontWeight: 'bold',textAlign:'center',alignItems:'center'}}>Grupo</Text>
                        <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <CheckBox
                            containerStyle={{marginRight:5,marginTop:10,marginBottom:10}}
                            title='Publicar'
                            size={17}
                            textStyle={{fontSize:12,fontWeight:'normal'}}
                            checked={this.state.checked}
                            onPress={() => this.setState({checked: !this.state.checked,enabled: !this.state.enabled})}
                          />
                          <View style={{width:200}}>
                              <Item picker>
                                <Picker
                                  mode="dropdown"
                                  iosIcon={<Icon name="arrow-down" />}
                                  style={{ width: undefined}}
                                  placeholder="Seleccionar"
                                  placeholderStyle={{ color: "#bfc6ea" }}
                                  placeholderIconColor="#007aff"
                                  selectedValue={this.state.selectedGrupo}
                                  onValueChange={this.comboGrupo.bind(this)}
                                  enabled={this.state.enabled}>
                                  {
                                    this.state.grupos.map( (v:any)=>{
                                      return <Picker.Item label={v.value} value={v.key} />
                                    })
                                  }
                                </Picker>
                              </Item>
                          </View>
                        </View>
                      </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        height: 340,
                        // Set border width.
                        borderWidth: 2,
                        // Set border Hex Color Code Here.
                        borderColor: '#F7F7F7',                        // Setting Up Background Color of Text component.
                        backgroundColor : 'white',
                        // Adding padding on Text component.
                        padding : 2,
                        margin: 10,
                      }}>
                      <Text style={{fontWeight: 'bold',textAlign:'center',alignItems:'center'}}>Detalles</Text>
                      <View style={{ flexDirection: 'column',alignItems:'center'}}>
                        <View  style={{ flexDirection: 'row',alignItems: 'flex-start'}}>
                          <Text style={{marginLeft:5,marginTop:16,marginBottom:16}}>Creador :</Text>
                          <Text style={{fontWeight: 'bold',marginTop:16,marginBottom:16}} >{this.state.usuario}</Text>
                        </View >
                        <View style={{ flexDirection: 'row',width:200}}>
                        <Text style={{marginLeft:10,marginTop:16,marginBottom:16}}>Tipo:</Text>
                        <View style={{flex:1,marginRight:5,marginTop:1,marginBottom:1,alignItems:'flex-end'}}>
                          <Item picker>
                              <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined}}
                                placeholder="Seleccionar"
                                enabled={!this.state.disableAll}
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selectedTipo}
                                onValueChange={this.comboTipo.bind(this)}
                              >
                                <Picker.Item label="Llamada" value="LLAMADA" />
                                <Picker.Item label="Reunión" value="REUNION" />
                                <Picker.Item label="Correo" value="CORREO" />
                                <Picker.Item label="Otro" value="OTRO" />
                              </Picker>
                          </Item>
                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <Text  style={{marginLeft:22,marginRight:5,marginTop:14,marginBottom:14}}>Asunto :</Text>
                          <TextInput
                           style={{marginRight:5,marginTop:10,marginBottom:10,textAlignVertical:'top',color: '#616161',height:40,flex:1,borderWidth: 2,borderColor: '#F7F7F7',}}
                            editable = {!this.state.disableAll}
                            multiline = {true}
                            numberOfLines = {1}
                            onChangeText={(asunto) => this.setState({asunto})}
                            value={this.state.asunto}
                            />
                      </View>
                      <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <Text style={{marginRight:5,marginTop:14,marginBottom:14}}>Contenido :</Text>
                          <TextInput
                            style={{marginRight:5,marginTop:10,marginBottom:10,height:130,textAlignVertical:'top',color: '#616161',flex:1,borderWidth: 2,borderColor: '#F7F7F7',}}
                            editable = {!this.state.disableAll}
                            multiline = {true}
                            numberOfLines = {2}
                            onChangeText={(contenido) => this.setState({contenido})}
                            value={this.state.contenido}
                            />
                      </View>
                  </View>
                    { this.state.modificar && 
                        <Button rounded block info  style={styles.button} onPress={this.peticion} >
                        <Text>Guardar Tarea</Text>
                        </Button>
                    }
                </Form>
              </Content>
            </Container>
          )
    }
    //validaciones
    crearTarea=()=>{
          //validaciones
          if (this.state.asunto==""){
            this.mensajeShow("Ingrese asunto",1)
          } else{
            //hacer peticion
            console.log('aqui lo llamo es amadre')
            this.peticion()
          }
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
      } else if (peticion==2){
        //carga el estado para despues hacer la peticion de los grupos
        this.upDateToken().then(res => this.getGrupoUsuario());
      } else if (peticion==3){
        this.upDateToken().then(res=>this.getUsuarioXGrupo());
      }
    }
    //actualiza y refleja el valor de datetime fechaCreación
    setDateCreacion(newDate:any) {
        this.setState({ creacionDate: newDate });
    }
    //actualiza y refleja el valor de datetime fechaExpiración
    setDateExpiracion(newDate:any) {
      this.setState({ expiracionDate: newDate });
    }
    //actualiza y refleja el valor de combobox Aviso
    comboAviso(selected:string){
      this.setState({selectedAviso: selected})
    }
    //actualiza y refleja el valor de combobox grupo
    comboGrupo(selected:string){
      this.setState({selectedGrupo: selected})
    }
    //actualiza y refleja el valor de combobox tipo
    comboTipo(selected:string){
      this.setState({selectedTipo: selected})
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
          "Tarea modificada exitosamente",
          mensaje,
          [
            {text: 'OK', 
            onPress: () => this.limpiar()},
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
    //limpiar variable cuando ya se agrego correctamente
    limpiar=()=>{
      this.setState({
        asunto:'',
        contenido:'',
        checked:false,
        enabled:false
      })
       idCreador=''
       idTarea=''
       nomCreador=''
       descartada=0
       leido=0
      //this.props.navigation.dismiss()
      this.props.navigation.push("Home",{index:4})
      //this.props.navigation.pop()
    }
    //realiza la petición para hacer el insert de la tarea
    peticion=()=>{
      //sacar la fecha de recordatorio
      let fecha = new Date(this.state.expiracionDate+'T'+this.state.expiracionTime).getTime() / 1000
      console.log('timestamp'+fecha)
      //Alert.alert('fecha',fecha.toString())
      let fechaStamp:any
      //Si el aviso es al momento se agrega la misma fecha de expiracion
      //si no hay aviso no se agrega nada
      //si seleciona un dato, se le resta la cantidad a la fecha de expiracion
      if(this.state.selectedAviso=='Al Momento'){
        fechaRecordatorio=this.state.expiracionDate+'T'+this.state.expiracionTime
        console.log('entro en recordatorio')
      }else if(this.state.selectedAviso=='Ninguno'){
        console.log('entro en ninguno')
        fechaRecordatorio=''
      }else {
          //seleciona la cantidad para el aviso antes del tiempo de expiracion
          //se calcula el timestamp de la diferencia entre las fechas
          if (this.state.selectedAviso=='1'){
            let stamp= fecha- (1*60)
            //console.log(stamp)
            fechaStamp = new Date(stamp*1000);
          }
          else if (this.state.selectedAviso=='5'){
            let stamp= fecha- (5*60)
            fechaStamp = new Date(stamp*1000);
          }
          else if (this.state.selectedAviso=='15'){
            let stamp= fecha- (15*60)
            fechaStamp = new Date(stamp*1000);
          }
          else if (this.state.selectedAviso=='30'){
            let stamp= fecha- (30*60)
            fechaStamp = new Date(stamp*1000);
          }
          else if (this.state.selectedAviso=='60'){
            let stamp= fecha- (60*60)
            fechaStamp = new Date(stamp*1000);
          }
          else if (this.state.selectedAviso=='120'){
            let stamp= fecha- (120*60)
            fechaStamp = new Date(stamp*1000);
          }
          //saca por partes la fecha de recordatorio para que tenga el formato adecuado
          var dd = String(fechaStamp.getDate()).padStart(2, '0');
          var mm = String(fechaStamp.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = fechaStamp.getFullYear();
          var hora= fechaStamp.getHours()
          var min = fechaStamp.getMinutes()
          var seg=fechaStamp.getSeconds()
          //console.log(pedo+' '+'timestamp= '+this.toTimestamp('2019/06/28 12:00'))
          var horaBuena=this.agregarZero(hora)
          var minBuena=this.agregarZero(min)
          var segBuena=this.agregarZero(seg)
          fechaRecordatorio= yyyy+'-'+mm+'-'+ dd+'T'+horaBuena+':'+minBuena+':'+segBuena
          console.log(fechaRecordatorio)
          //console.log(fechaStamp.getHours())
      }
      if (this.state.checked==true){
        this.setState({usuarios:[]})
        this.getUsuarioXGrupo().then(res => this.insertTarea(this.state.usuarios.length));
      }else{
        this.setState({usuarios:[]})
        this.state.usuarios.push({"id":this.state.id})
        console.log(this.state.usuarios)
        console.log(this.state.usuarios.length)
        this.insertTarea(this.state.usuarios.length)
      }
    }
    getGrupoUsuario(){
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
      })
      .catch(error =>this.mensajeShow(error.message,error.status,2))
    }
    getUsuarioXGrupo(){
      return new Promise((resolve, reject) => {
        config3 = {
          headers: { 'tenantId':'macropro','Content-Type': 'application/json','Authorization': 'Bearer '+this.state.token,'MacAddress':this.state.macADD,'id':this.state.selectedGrupo}
        }
        console.log('token: '+this.state.token +" mac: "+ this.state.macADD+" id: "+this.state.selectedGrupo)
        API.getAll('SysGrupoRest/getById',config3)
        .then(response => {
          const parsedJSON=response
          var baseResponse: BaseResponse<SysGrupo>[] = parsedJSON as BaseResponse<SysGrupo>[];
          console.log(baseResponse.message);
          console.log(baseResponse.status);
          console.log(baseResponse.resp.nombre);
          console.log(baseResponse.resp.listGrupoUsuario.length);
          let users=[]
          for(var i=0;i<baseResponse.resp.listGrupoUsuario.length;i++){
            console.log(baseResponse.resp.listGrupoUsuario[i].usuario.id);
            users.push({"id":baseResponse.resp.listGrupoUsuario[i].usuario.id})
          }
          console.log(users);
          this.setState({usuarios:users})
          resolve()
          //this.upDateToken().then(res =>this.insertTarea(this.state.usuarios.length));
        })
        .catch(error =>this.mensajeShow(error.message,error.status,3))
      });
    }
    insertTarea(numero:any){
      for(var i=0;i<numero;i++){
        console.log('valor de numero: '+numero);
        let destinatario=this.state.usuarios[i].id
        var data:any={
            "id":idTarea,
          "asunto": this.state.asunto,
          "contenido": this.state.contenido,
          "descartada": descartada,
          "fechaCreacion": this.state.creacionDate+'T'+this.state.creacionTime,
          "fechaExpiracion": this.state.expiracionDate+'T'+this.state.expiracionTime,
          "fechaRecordatorio": fechaRecordatorio,
          "leido":leido,
          "tipo": this.state.selectedTipo,
          "creador":{
            "id": this.state.id
          },
          "destinatario":{
            "id":destinatario
          }
        }
        console.log('data'+data)
        console.log('config'+config)
        this.insertarBueno(data,config,i,numero)
      }
    }
    insertarBueno(data:any,config:any,valor:number,numUser:number){
      console.log(data)
      console.log(config)
      const myObjStr = JSON.stringify(data);
      const myObjStr2 = JSON.stringify(config);
      //Alert.alert('data',myObjStr)
      //Alert.alert('config',myObjStr2)
      API.update('SysTareaRest',data,config)
          .then(response => {
            const parsedJSON = response;
            var baseResponse: BaseResponse<Tarea>[] = parsedJSON as BaseResponse<Tarea>[];
            console.log(baseResponse.status);
            console.log('valor de i: '+valor);
            console.log('usuarios: '+this.state.usuarios.length);
            if((valor+1)==numUser){
              this.mensajeShow("Se actualizo correctamente",baseResponse.status)
            }
          })
        .catch(error => this.mensajeShow(error.message,error.status,1))
    }
}
const styles = StyleSheet.create({
  button:{
    margin: 120,
    marginBottom:10, 
    marginTop: 10,
    backgroundColor:'#70CCF6'
  }
});
export default ModificarTareaScreen;