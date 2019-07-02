import SysGrupo from './Sysgrupo'
export default interface SysGrupoUsuario{
   id:Number;
   usuario:[];
   isAdmin:Boolean;
   sysGrupo:SysGrupo; 
}