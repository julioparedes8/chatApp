import axios from 'axios';
import { JsogService } from 'jsog-typescript'
import { JsogObject } from 'jsog-typescript/dist/model/JsogObject';
//url del servidor
//let url='http://10.10.1.81:8008/'
let url='http://macropro.ddns.net:8080/'
const jsog = new JsogService();
//json de la configuracion para pasar parametros a la api axios
class Api{
    //consulta por id, recibe el nombre de la api y el id
    async getById(tablaRest : string,id:number,headers:any){
        return new Promise(function(resolve, reject) {
            axios.get(url.concat( tablaRest ) ,headers)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                //console.log(error.response)
                if(error.response.status==400){
                    console.log(error.response)
                    let err400={
                        response:{
                            data:{
                                status:"400",
                                message:"Petición Incorrecta"
                            }
                        }
                    }
                    reject(err400.response.data)
                }else if(error.response.status==500){
                    console.log(error.response)
                    let err500={
                        response:{
                            data:{
                                status:"500",
                                message:"Error interno del Servidor"
                            }
                        }
                    }
                    reject(err500.response.data)
                }else{
                    reject(error.response.data)
                }
                //return error;
            });
        })
    }
    //consulta toda una tabla, recibe la api y los headers
    async getAll(tablaRest : string,headers:any){
        return new Promise(function(resolve, reject) {
            axios.get(url.concat( tablaRest ) ,headers)
            .then(function (response) {
                let parsedJSON:JsogObject[]
                parsedJSON=response.data
                let data=jsog.deserializeArray(parsedJSON);
                console.log(data)
                console.log(response.data)
                resolve(data)
            })
            .catch(function (error) {
                //console.log(error.response
                //return error;
                if(error.response.status=='400'){
                    console.log(error.response)
                    let err={
                        message:'Petición Incorrecta',
                        status:'400'
                    }
                    reject(err)
                }else if(error.response.status=='500'){
                    let err={
                        message:'Error interno del servidor',
                        status:'500'
                    }
                    reject(err)
                }else if (error.response.status=='401'){
                    let err={
                        message:'Fallo autenticación',
                        status:'401'
                    }
                    reject(err)
                }
            });
        })
    }
    //consulta toda una tabla, recibe la api y los headers
    async getAllGrupo(tablaRest : string,headers:any){
        return new Promise(function(resolve, reject) {
            axios.get(url.concat( tablaRest ) ,headers)
            .then(function (response) {
                console.log(response.data.resp)
                resolve()
            })
            .catch(function (error) {
                //console.log(error.response
                //return error;
                if(error.response.status=='400'){
                    console.log(error.response)
                    let err={
                        message:'Petición Incorrecta',
                        status:'400'
                    }
                    reject(err)
                }else if(error.response.status=='500'){
                    let err={
                        message:'Error interno del servidor',
                        status:'500'
                    }
                    reject(err)
                }else if (error.response.status=='401'){
                    let err={
                        message:'Fallo autenticación',
                        status:'401'
                    }
                    reject(err)
                }
            });
        })
    }
    //inserta en una tabla, recibe el nombre de la api,body y los headers
    async post(tablaRest : string,data:any,headers:any){
        return new Promise(function(resolve, reject) {
            axios.post(url.concat( tablaRest ),data ,headers)
            .then(function (response) {
                let parsedJSON:JsogObject[]
                parsedJSON=response.data
                let data=jsog.deserializeArray(parsedJSON);
                console.log(data)
                console.log(response.data)
                resolve(data)
            })
            .catch(function (error) {
                //console.log(error.response
                //return error;
                if(error.response.status=='400'){
                    console.log(error.response)
                    let err={
                        message:'Petición Incorrecta',
                        status:'400'
                    }
                    reject(err)
                }else if(error.response.status=='500'){
                    let err={
                        message:'Error interno del servidor',
                        status:'500'
                    }
                    reject(err)
                }else if (error.response.status=='401'){
                    let err={
                        message:'Fallo autenticación',
                        status:'401'
                    }
                    reject(err)
                }
            });
        })
    }
    //actualiza una tabla, recibe como paramteros el noombre de la api, body y los headers
    async update(tablaRest : string,data:any,headers:any){
        return new Promise(function(resolve, reject) {
            axios.post(url.concat( tablaRest ),data ,headers)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                //console.log(error.response
                //return error;
                if(error.response.status=='400'){
                    console.log(error.response)
                    let err={
                        message:'Petición Incorrecta',
                        status:'400'
                    }
                    reject(err)
                }else if(error.response.status=='500'){
                    let err={
                        message:'Error interno del servidor',
                        status:'500'
                    }
                    reject(err)
                }else if (error.response.status=='401'){
                    let err={
                        message:'Fallo autenticación',
                        status:'401'
                    }
                    reject(err)
                }
            });
        })
    }
    //elimina
    async delete(tablaRest : string,headers:any){
        return new Promise(function(resolve, reject) {
            axios.delete(url.concat( tablaRest ) ,headers)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                //console.log(error.response
                //return error;
                if(error.response.status=='400'){
                    console.log(error.response)
                    let err={
                        message:'Petición Incorrecta',
                        status:'400'
                    }
                    reject(err)
                }else if(error.response.status=='500'){
                    let err={
                        message:'Error interno del servidor',
                        status:'500'
                    }
                    reject(err)
                }else if (error.response.status=='401'){
                    let err={
                        message:'Fallo autenticación',
                        status:'401'
                    }
                    reject(err)
                }
            });
        })
    }
    //valida el inicio de sesión, recibe el nombre de la tabla y los headers
    async sesion(tipo:string,headers:any){
        return new Promise(function(resolve, reject) {
            axios.post(url.concat( tipo ),"" ,headers)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                //console.log(error.response
                //return error;
                if(error.response.status=='400'){
                    console.log(error.response)
                    let err={
                        message:'Petición Incorrecta',
                        status:'400'
                    }
                    reject(err)
                }else if(error.response.status=='500'){
                    let err={
                        message:'Error interno del servidor',
                        status:'500'
                    }
                    reject(err)
                }else if (error.response.status=='401'){
                    let err={
                        message:'Fallo autenticación',
                        status:'401'
                    }
                    reject(err)
                }
            });
        })
    }
    //es un get con post en una tabla, recibe el nombre de la api,body y los headers
    async postGet(tablaRest : string,data:any,headers:any){
            return new Promise(function(resolve, reject) {
                axios.post(url.concat( tablaRest ),data ,headers)
                .then(function (response) {
                    //console.log(response.data.resp.length)
                    //console.log(response.data.resp[0].sysGrupo.nombre)
                    let groups=[]
                    //let us: String[]
                    //us=response.data.resp.listGrupoUsuario
                    let count=response.data.resp.length
                    //console.log(count)
                    //console.log(response.data.resp.listGrupoUsuario[2].sysGrupo.nombre)
                    for(var i=0;i<count;i++){
                        groups.push({"key":response.data.resp[i].sysGrupo.id,"value":response.data.resp[i].sysGrupo.nombre})
                    }
                    resolve(response)
                })
                .catch(function (error) {
                    //console.log(error.response
                    //return error;
                    if(error.response.status=='400'){
                        console.log(error.response)
                        let err={
                            message:'Petición Incorrecta',
                            status:'400'
                        }
                        reject(err)
                    }else if(error.response.status=='500'){
                        let err={
                            message:'Error interno del servidor',
                            status:'500'
                        }
                        reject(err)
                    }else if (error.response.status=='401'){
                        let err={
                            message:'Fallo autenticación',
                            status:'401'
                        }
                        reject(err)
                    }
                });
            })
    }
}
export default Api;
