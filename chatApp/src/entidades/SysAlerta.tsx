import  SysGrupo  from "./SysGrupo";
export default interface SysAlerta{
    id: Number;
    titulo: String;
    detalles: String;
    fecha:String;
    genGrupo:SysGrupo;
    prioridad:String
 }