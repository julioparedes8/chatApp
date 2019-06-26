import axios from 'axios';
//url del servidor
let url='http://10.10.1.81:8008/'
//json de la configuracion para pasar parametros a la api axios
interface Grupo {
    id: number,
    nombre: string
};
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
                //console.log(response.data)
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
    //consulta toda una tabla, recibe la api y los headers
    async getAllGrupo(tablaRest : string,headers:any){
        return new Promise(function(resolve, reject) {
            axios.get(url.concat( tablaRest ) ,headers)
            .then(function (response) {
                var res:string[][]=[['',''],['',''],['','']]
                let id:String[]=[];
                let nombre:String[]=[];
                let us: String[]
                us=response.data.resp.listGrupoUsuario
                let count=us.length
                //console.log(count)
                //console.log(response.data.resp.listGrupoUsuario[2].sysGrupo.nombre)
                for(var i=0;i<count;i++){
                    res[i][0]=response.data.resp.listGrupoUsuario[i].sysGrupo.id
                    res[i][1]=response.data.resp.listGrupoUsuario[i].sysGrupo.nombre
                    id.push(response.data.resp.listGrupoUsuario[i].sysGrupo.id)
                    nombre.push(response.data.resp.listGrupoUsuario[i].sysGrupo.nombre)
                    console.log(id[i])
                    console.log(nombre[i])
                    //console.log(x[0]+' '+x[1]);
                    //console.log(response.data.resp.listGrupoUsuario[i].sysGrupo.nombre)
                }
                console.log(res[0][0]+' '+res[0][1]);
                console.log(res[1][0]+' '+res[1][1]);
                //console.log(res[2][0]+' '+res[2][1]);
                //console.log(id[0])
                //resolve(id)
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
    async insert(tablaRest : string,data:any,headers:any){
        return new Promise(function(resolve, reject) {
            axios.post(url.concat( tablaRest ),data ,headers)
            .then(function (response) {
                console.log(response.data)
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
}
export default Api;
