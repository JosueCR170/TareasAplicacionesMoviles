import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, authReady } from "../../../services/firebase/config/firebaseConfig";

import {
  IonCard,
  IonCol,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonCheckbox,
  IonLabel,
  IonToast,
  IonLoading,
  IonRouterLink 
} from "@ionic/react";
import { mail, lockClosed, closeCircle } from "ionicons/icons";
import "./loginEmailAndPasswordStyles.css";
import HandleGoogleSignIn from "../authenticationGoogle/authenticationGoogle";


const LoginEmailAndPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authReady;
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        setLoading(false);
        history.replace("/home");
      });
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  if (loading) {
    return <IonLoading isOpen message='Cargando sesión...' />;
  }

  return (
     <IonPage>
          <IonContent fullscreen>
            <IonRow>
              <IonCol sizeMd="3" sizeXs="0" sizeSm="1"></IonCol>
              <IonCol sizeMd="6" sizeXs="12" sizeSm="12">    

                <div className="card">
                  <div className="card-header">
                    <h1>Inicio de Sesión</h1>
                    <p>Ingresa tus datos de usuario para continuar</p>
                  </div>

              <form onSubmit={handleLogin}>

                  <div className="card-body">
                    <div className="item">
                      <IonIcon className="icon" slot="start" icon={mail}></IonIcon>
                      <IonInput
                        className="input"
                        placeholder="example@domain.com"
                        type="email"
                        value={email}
                        label="Correo"
                        labelPlacement="floating"
                        fill="outline"
                        onIonInput={(e) => setEmail(e.detail.value!)}
                      ></IonInput>
                    </div>
    
                    <div className="item">
                      <IonIcon className="icon" slot="start" icon={lockClosed}></IonIcon>
                      <IonInput
                        className="input"
                        placeholder="********"
                        type="password"
                        value={password}
                        label="Contraseña"
                        labelPlacement="floating"
                        fill="outline"
                        onIonInput={(e) => setPassword(e.detail.value!)}
                      ></IonInput>
                    </div>
    
                    <button type="submit"
                    id="button-activate-login"
                        // onClick={() => {HandleLogin(email, password);}}
                      className="login-button"
                    >
                      Iniciar Sesión
                    </button>
                   <HandleGoogleSignIn/>

                   <div className="register-link">
                    <p>
                      ¿No tienes cuenta?{' '}
                      <IonRouterLink routerLink="/register" className="link-register">
                        Regístrate aquí
                      </IonRouterLink>
                    </p>
                  </div>
                   
                  </div>
                  

                  </form>
                </div>
               
              </IonCol>
    
              <IonCol sizeMd="3" sizeXs="0" sizeSm="1"></IonCol>
            </IonRow>
          </IonContent>
        </IonPage>


  );
};

export default LoginEmailAndPassword;
