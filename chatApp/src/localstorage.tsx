import AsyncStorage from '@react-native-community/async-storage';
class LocalStorage{
    setToken=async (token:any)=>{
        try {
          await AsyncStorage.setItem('Token', JSON.stringify(token))
          const tkn = await AsyncStorage.getItem('Token')
          console.log(tkn)
        } catch (e) {
          // saving error
        }
    }
    setRefresh=async (refresh:any)=>{
        try {
          await AsyncStorage.setItem('Refresh', JSON.stringify(refresh))
          const rfh = await AsyncStorage.getItem('Refresh')
          console.log(rfh)
        } catch (e) {
          // saving error
        }
    }
    getToken=async ()=>{
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
    getRefresh=async ()=>{
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
}
export default LocalStorage;