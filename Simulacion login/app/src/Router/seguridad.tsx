import React, { useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


 interface seguridadPagina extends RouteProps {
    rolPermitido: Array<"admin" | "user">;
}
 const Seguridad : React.FC<seguridadPagina> = ({rolPermitido, ...props}) => {

    const {user, authenticated} =useAuth();

    if(!authenticated){
        return <Redirect to="/login" />
    }
    if(user && !rolPermitido.includes(user?.rol)){
        return <Redirect to="/accesoRestringido" />
    }

    return <Route {...props} />
}

export default Seguridad;