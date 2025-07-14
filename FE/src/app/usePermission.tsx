import { ROLES } from "@/contants/Role"




const usePermission =(role:string)=>{
     return role === ROLES.Admin
}


export default usePermission