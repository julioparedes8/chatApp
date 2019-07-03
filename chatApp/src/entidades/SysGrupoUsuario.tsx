import SysGrupo from './Sysgrupo'
import Usuario from './Usuario'
export default interface SysGrupoUsuario{
   id:Number;
   usuario:Usuario;
   isAdmin:Boolean;
   sysGrupo:SysGrupo; 
}