import axios from 'axios';
//url del servidor
let url='http://10.10.1.81:8008/'
//json de la configuracion para pasar parametros a la api axios

class Api{
    //consulta por id, recibe el nombre de la api y el id
    async getById(tablaRest : string,id:number,headers:any){
        return new Promise(function(resolve, reject) {
            axios.get(url.concat( tablaRest ) ,headers)
            .then(function (response) {
                resolve(response.data.resp)
            })
            .catch(function (error) {
                console.log(error);
                reject('error')
            });
        })
    }
    //consulta toda una tabla, recibe la api y los headers
    async getAll(tablaRest : string,headers:any){
        return new Promise(function(resolve, reject) {
            axios.get(url.concat( tablaRest ) ,headers)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                console.log(error.message);
                reject('401')
                //return error;
            });
        })
    }
    //inserta en una tabla, recibe el nombre de la api,body y los headers
    async insert(tablaRest : string,data:any,headers:any){
        return new Promise(function(resolve, reject) {
            axios.post(url.concat( tablaRest ),data ,headers)
            .then(function (response) {
                resolve(response.data.resp)
            })
            .catch(function (error) {
                console.log(error);
                reject('error')
                //return error;
            });
        })
    }
    //actualiza una tabla, recibe como paramteros el noombre de la api, body y los headers
    async update(tablaRest : string,data:any,headers:any){
        return new Promise(function(resolve, reject) {
            axios.post(url.concat( tablaRest ),data ,headers)
            .then(function (response) {
                resolve(response.data.resp)
            })
            .catch(function (error) {
                console.log(error);
                reject('error')
                //return error;
            });
        })
    }
    //elimina
    async delete(tablaRest : string,headers:any){
        return new Promise(function(resolve, reject) {
            axios.delete(url.concat( tablaRest ) ,headers)
            .then(function (response) {
                resolve(response.data.resp)
            })
            .catch(function (error) {
                console.log(error);
                reject('error')
                //return error;
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
                console.log(error);
                reject('error')
                //return error;
            });
        })
    }
}
export default Api;
