//interfaz para la consulta base
export interface BaseResponse<T>{
    message:String;
    status:Number;
    resp: T;
    usoEnTimbrado:Boolean;
}