export interface SysGrupo{
   id:Number;
   nombre:String;
   tipo:String;
   listGrupoUsuario:[]; 
   empresa:{
       id:Number;
       nombreEmpresa:String;
       nombreBD:String;
       conexionBD:String
   }
}