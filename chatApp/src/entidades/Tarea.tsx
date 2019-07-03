import Usuario from "./Usuario";
//interfaz para la consulta base
export interface Tarea{
    id:Number;
    asunto: String ;
    contenido: String;
    fechaCreacion: String;
    fechaExpiracion: String;
    fechaRecordatorio: String;
    creador: Usuario;
    destinatario:Usuario;
    leido: Boolean;
    descartada: Boolean;
    tipo: String
}