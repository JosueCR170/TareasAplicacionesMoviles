import { Usuarios } from "../../DataBase/Usuarios";
import { useAuth } from "../../context/AuthContext";
import { IonToast } from '@ionic/react';
import { useState } from "react";

export const useLogin = () => {
  const { login } = useAuth();
  const [showToast, setShowToast] = useState(false);

  const HandleLogin = (email: string, password: string) => {
    const user = Usuarios.find(
      (user) => user.correo === email && user.password === password
    );

    if (user) {
      console.log("Usuario encontrado", user);
      login({
        correo: user.correo,
        password: user.password,
        rol: user.rol as "admin" | "user"
      });
    } else {
      console.log("Usuario no encontrado");
      setShowToast(true);
    }
  };

  return { HandleLogin,showToast, setShowToast };
};


