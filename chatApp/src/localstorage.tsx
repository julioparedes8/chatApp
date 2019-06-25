import AsyncStorage from '@react-native-community/async-storage';
class LocalStorage{
    //guarda el token en el local storage
    setToken=async (token:any)=>{
        try {
          await AsyncStorage.setItem('Token', (token))
          const tkn = await AsyncStorage.getItem('Token')
          console.log(tkn)
        } catch (e) {
          // saving error
        }
    }
    //guarda el token refresh en el local storage
    setRefresh=async (refresh:any)=>{
        try {
          await AsyncStorage.setItem('Refresh', (refresh))
          const rfh = await AsyncStorage.getItem('Refresh')
          console.log(rfh)
        } catch (e) {
          // saving error
        }
    }
    //guarda el token en el local storage
    setIdUsuario=async (id:any)=>{
          try {
            await AsyncStorage.setItem('IdUsuario', (id))
            const unico = await AsyncStorage.getItem('IdUsuario')
            console.log("localStorage id: "+unico)
          } catch (e) {
            // saving error
          }
    }
    //guarda el token en el local storage
    setUsuario=async (user:any)=>{
      try {
        await AsyncStorage.setItem('Usuario', (user))
        const usuario = await AsyncStorage.getItem('Usuario')
        console.log("usuario: "+usuario)
      } catch (e) {
        // saving error
      }
    }
    //valida si existe el token en el LS para saber si existe su sesión
    existToken=async ()=>{
        try {
            //await AsyncStorage.setItem('Token', JSON.stringify('logueado'))
            const tkn = await AsyncStorage.getItem('Token')
            console.log(tkn)
            if (tkn==null){
                //this.setState({sesion:false})
                return false
            }
            //this.setState({sesion:true})
            return true
        } catch (e) {
        // saving error
        }
    }
    existRefresh=async ()=>{
      try {
          //await AsyncStorage.setItem('Token', JSON.stringify('logueado'))
          const rfs = await AsyncStorage.getItem('Refresh')
          console.log(rfs)
          if (rfs==null){
              //this.setState({sesion:false})
              return false
          }
          //this.setState({sesion:true})
          return true
      } catch (e) {
      // saving error
      }
    }
    //elimina los token al cerrar sesión
    borrarSesion=async ()=>{
        try {
          await AsyncStorage.removeItem('Token')
          await AsyncStorage.removeItem('Refresh')
          await AsyncStorage.removeItem('IdUsuario')
          await AsyncStorage.removeItem('Usuario')
          console.log('ya se removio')
          const tkn = await AsyncStorage.getItem('Token')
          console.log(tkn)
          const rhs = await AsyncStorage.getItem('Refresh')
          console.log(rhs)
          const unico = await AsyncStorage.getItem('IdUsuario')
          console.log(unico)
          const user = await AsyncStorage.getItem('Usuario')
          console.log(user)
        } catch (e) {
          // saving error
        }
    }
    //elimina el id del usuario 
    borrarIdUsuario=async ()=>{
          try {
            await AsyncStorage.removeItem('IdUsuario')
            const unico = await AsyncStorage.getItem('IdUsuario')
            console.log(unico)
          } catch (e) {
            // saving error
          }
    }
    //elimina el usuario 
    borrarUsuario=async ()=>{
        try {
            await AsyncStorage.removeItem('Usuario')
            const user = await AsyncStorage.getItem('Usuario')
            console.log(user)
        } catch (e) {
            // saving error
          }
    }
    //Regresa el token almacenado en el local storage para hacer peticiones 
    getToken=async ()=>{
      try {
          //await AsyncStorage.setItem('Token', JSON.stringify('logueado'))
          const tkn = await AsyncStorage.getItem('Token')
          //console.log(tkn)
          if (tkn==null){
              //this.setState({sesion:false})
              return ""
          }
          //this.setState({sesion:true})
          return tkn
      } catch (e) {
      // saving error
      }
    }
    //Regresa el token almacenado en el local storage para renovar el toekn
    getRefresh=async ()=>{
      try {
          //await AsyncStorage.setItem('Token', JSON.stringify('logueado'))
          const rfs = await AsyncStorage.getItem('Refresh')
          //console.log(rfs)
          if (rfs==null){
              //this.setState({sesion:false})
              return ""
          }
          //this.setState({sesion:true})
          return rfs
      } catch (e) {
      // saving error
      }
    }
    //Regresa el id almacenado en el local storage
    getIdUsuario=async ()=>{
      try {
          //await AsyncStorage.setItem('Token', JSON.stringify('logueado'))
          const id = await AsyncStorage.getItem('IdUsuario')
          //console.log(rfs)
          if (id==null){
              //this.setState({sesion:false})
              return ""
          }
          //this.setState({sesion:true})
          return id
      } catch (e) {
      // saving error
      }
    }
    //Regresa el usuario almacenado en el local storage
    getUsuario=async ()=>{
          try {
              //await AsyncStorage.setItem('Token', JSON.stringify('logueado'))
              const user = await AsyncStorage.getItem('Usuario')
              //console.log(rfs)
              if (user==null){
                  //this.setState({sesion:false})
                  return ""
              }
              //this.setState({sesion:true})
              return user
          } catch (e) {
          // saving error
          }
    }
}
export default LocalStorage;