import axios from 'axios';
let url='http://10.10.1.81:8008/'
let config = {
    headers: { 'tenantId':'macropro','Content-Type': 'application/json','Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoxLCJjb2RpZ28iOiJBRE1JTiIsIm5vbWJyZSI6IkFETUlOSVNUUkFET1IiLCJwYXNzd29yZCI6IjgyN0NDQjBFRUE4QTcwNkM0QzM0QTE2ODkxRjg0RTdCIiwiZW1haWwiOiJBRE1JTklTVFJBRE9SQFBSVUVCQS5DT00iLCJwdWVzdG8iOiJBRE1JTklTVFJBRE9SIiwibml2ZWxBY2Nlc29TaXN0ZW1hIjowLCJwZXJmaWxlcyI6eyJpZCI6MSwibm9tYnJlIjoiU2lzdGVtYSIsImNvbnRlbmVkb3JlcyI6W119LCJwZXJmaWxTZWd1cmlkYWQiOm51bGwsImZlY2hhRXhwaXJhY2lvbiI6bnVsbCwiYWN0aXZhRmVjaGFFeCI6ZmFsc2UsInJlc3RyaW5nZUlQIjpmYWxzZSwicmVzdHJpbmdlRG9taW5pbyI6ZmFsc2UsInJlc3RyaW5nZVN1YlJlZCI6ZmFsc2UsImlkaW9tYSI6bnVsbCwibGlzdEdydXBvVXN1YXJpbyI6W10sInRva2VucyI6W10sImxzdFVzdWFyaW9QYXJhbXMiOltdfX0.RKMuBbgeplLivvWEiwbxTNJQ24aeCHdAiH8tv-sr-LQ' }
}
let config2 = {
    headers: { 'tenantId':'macropro','Content-Type': 'application/json','id':'4','Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoxLCJjb2RpZ28iOiJBRE1JTiIsIm5vbWJyZSI6IkFETUlOSVNUUkFET1IiLCJwYXNzd29yZCI6IjgyN0NDQjBFRUE4QTcwNkM0QzM0QTE2ODkxRjg0RTdCIiwiZW1haWwiOiJBRE1JTklTVFJBRE9SQFBSVUVCQS5DT00iLCJwdWVzdG8iOiJBRE1JTklTVFJBRE9SIiwibml2ZWxBY2Nlc29TaXN0ZW1hIjowLCJwZXJmaWxlcyI6eyJpZCI6MSwibm9tYnJlIjoiU2lzdGVtYSIsImNvbnRlbmVkb3JlcyI6W119LCJwZXJmaWxTZWd1cmlkYWQiOm51bGwsImZlY2hhRXhwaXJhY2lvbiI6bnVsbCwiYWN0aXZhRmVjaGFFeCI6ZmFsc2UsInJlc3RyaW5nZUlQIjpmYWxzZSwicmVzdHJpbmdlRG9taW5pbyI6ZmFsc2UsInJlc3RyaW5nZVN1YlJlZCI6ZmFsc2UsImlkaW9tYSI6bnVsbCwibGlzdEdydXBvVXN1YXJpbyI6W10sInRva2VucyI6W10sImxzdFVzdWFyaW9QYXJhbXMiOltdfX0.RKMuBbgeplLivvWEiwbxTNJQ24aeCHdAiH8tv-sr-LQ' }
}

class Api{
    async getById(tablaRest : string,id:number){
        return new Promise(function(resolve, reject) {
            axios.get(url.concat( tablaRest ) ,config2)
            .then(function (response) {
                resolve(response.data.resp)
            })
            .catch(function (error) {
                console.log(error);
                reject('error')
            });
        })
    }
    async getAll(tablaRest : string){
        return new Promise(function(resolve, reject) {
            axios.get(url.concat( tablaRest ) ,config)
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
    async insert(tablaRest : string,data:any){
        return new Promise(function(resolve, reject) {
            axios.post(url.concat( tablaRest ),data ,config)
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
    async update(tablaRest : string,data:any){
        return new Promise(function(resolve, reject) {
            axios.post(url.concat( tablaRest ),data ,config2)
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
    async delete(tablaRest : string){
        return new Promise(function(resolve, reject) {
            axios.delete(url.concat( tablaRest ) ,config)
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
    async login(headers:any){
        return new Promise(function(resolve, reject) {
            axios.post(url.concat( 'login' ),"" ,headers)
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
