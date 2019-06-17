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
    borrarToken=async ()=>{
        try {
          await AsyncStorage.removeItem('Token')
          await AsyncStorage.removeItem('Refresh')
          console.log('ya se removio')
          const tkn = await AsyncStorage.getItem('Token')
          console.log(tkn)
          const rhs = await AsyncStorage.getItem('Refresh')
          console.log(rhs)
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
}
export default LocalStorage;