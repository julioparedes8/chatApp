import { Empresa } from "./Empresa";
import SysGrupoUsuario from './SysGrupoUsuario'
export default interface SysGrupo{
    id: Number;
    nombre: String;
    tipo: String;
    listGrupoUsuario:SysGrupoUsuario[]
    empresa:Empresa
 }