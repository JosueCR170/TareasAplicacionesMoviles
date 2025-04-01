import { useState } from "react";
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
} from "@ionic/react";
import { mail, lockClosed, closeCircle } from "ionicons/icons";
import { useLogin } from "./useLogin";
import "./login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { HandleLogin, showToast,setShowToast } = useLogin();

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonRow>
          <IonCol sizeMd="3" sizeXs="0" sizeSm="1"></IonCol>

          <IonCol sizeMd="6" sizeXs="12" sizeSm="12">
          <IonToast
          className="custom-toast"
              isOpen={showToast}
              icon={closeCircle}
              position="top"
              onDidDismiss={() => setShowToast(false)}
              message="Datos incorrectos"
              duration={2000}
            />

            <div className="card">
              <div className="card-header">
                <h1>Inicio de Sesión</h1>
                <p>Ingresa tus datos de usuario para continuar</p>
              </div>

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

                <button
                id="button-activate-login"
                    onClick={() => {HandleLogin(email, password);}}
                  className="login-button"
                >
                  Iniciar Sesión
                </button>
              </div>
            </div>
           
          </IonCol>

          <IonCol sizeMd="3" sizeXs="0" sizeSm="1"></IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
