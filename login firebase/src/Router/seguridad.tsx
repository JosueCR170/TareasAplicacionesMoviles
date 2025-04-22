import React, { useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


 interface seguridadPagina extends RouteProps {
    rolPermitido: Array<"ADMIN" | "USER">;
}
 const Seguridad : React.FC<seguridadPagina> = ({rolPermitido, ...props}) => {

    const {user, userData} =useAuth();
    
    
    if(!user){
        return <Redirect to="/login" />
    }

    if (user && userData && !rolPermitido.includes(userData.rol)) {
        return <Redirect to="/accesoRestringido" />
    }

     return <Route {...props} />
}

export default Seguridad;