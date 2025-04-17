import {
  IonPage,
  IonContent,
  IonRow,
  IonCol,
  IonInput,
  IonIcon,
  IonButton,
  IonToast,
  IonLabel,
  IonRouterLink,
} from "@ionic/react";
import { mail, person, lockClosed } from "ionicons/icons";
import { useState, useEffect } from "react";
import { registerUser } from "../../services/firebase/createUser";
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    clearInputs();
  }, []);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUserName("");
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setShowToast(true);
    } else {
      const result = await registerUser({ email, password, userName });

      if (result.success) {
        console.log("Usuario registrado:", { email, password, userName });
        clearInputs();
        history.push("/login");
      } else {
        console.error("Error en el registro:", result.error);
        if (result.error instanceof Error) {
          if(result.error.message.includes("Password should be at least 6 characters"))
            setFirebaseError("La contraseña debe tener al menos 6 caracteres");
          else{setFirebaseError(result.error.message);}
          
        } else {
          setFirebaseError('Ocurrió un error desconocido al registrarse');
        }
        // Mostrar Toast con error
      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonRow>
          <IonCol sizeMd="3" sizeXs="0" sizeSm="1"></IonCol>
          <IonCol sizeMd="6" sizeXs="12" sizeSm="12">
            <div className="card">
              <div className="card-header">
                <h1>Crear Cuenta</h1>
                <p>Regístrate para continuar</p>
              </div>

              <form onSubmit={handleRegister}>
                <div className="card-body">
                  <div className="item">
                    <IonIcon
                      className="icon"
                      slot="start"
                      icon={person}
                    ></IonIcon>
                    <IonInput
                      className="input"
                      placeholder="Nombre de usuario"
                      type="text"
                      value={userName}
                      onIonInput={(e) => setUserName(e.detail.value!)}
                      label="Nombre de Usuario"
                      labelPlacement="floating"
                      fill="outline"
                      required
                    />
                  </div>

                  <div className="item">
                    <IonIcon
                      className="icon"
                      slot="start"
                      icon={mail}
                    ></IonIcon>
                    <IonInput
                      className="input"
                      placeholder="example@domain.com"
                      type="email"
                      value={email}
                      onIonInput={(e) => setEmail(e.detail.value!)}
                      label="Correo"
                      labelPlacement="floating"
                      fill="outline"
                      required
                    />
                  </div>

                  <div className="item">
                    <IonIcon
                      className="icon"
                      slot="start"
                      icon={lockClosed}
                    ></IonIcon>
                    <IonInput
                      className="input"
                      placeholder="********"
                      type="password"
                      value={password}
                      onIonInput={(e) => setPassword(e.detail.value!)}
                      label="Contraseña"
                      labelPlacement="floating"
                      fill="outline"
                      required
                    />
                  </div>

                  <div className="item">
                    <IonIcon
                      className="icon"
                      slot="start"
                      icon={lockClosed}
                    ></IonIcon>
                    <IonInput
                      className="input"
                      placeholder="Confirmar contraseña"
                      type="password"
                      value={confirmPassword}
                      onIonInput={(e) => setConfirmPassword(e.detail.value!)}
                      label="Confirmar Contraseña"
                      labelPlacement="floating"
                      fill="outline"
                      required
                    />
                  </div>

                  <IonButton type="submit" className="login-button">
                    Registrarse
                  </IonButton>

                  {/* Mensaje de error si las contraseñas no coinciden */}
                  <IonToast
                    isOpen={showToast}
                    message="Las contraseñas no coinciden"
                    duration={2000}
                    color="danger"
                    onDidDismiss={() => setShowToast(false)}
                  />
                  <IonToast
                    isOpen={!!firebaseError}
                    message={firebaseError ?? ""}
                    duration={3000}
                    color="danger"
                    onDidDismiss={() => setFirebaseError(null)}
                  />
                </div>
              </form>
            </div>

            <div className="login-link">
              <p>
                ¿Ya tienes cuenta?{" "}
                <IonRouterLink routerLink="/login" className="link-login">
                  Inicia sesión aquí
                </IonRouterLink>
              </p>
            </div>
          </IonCol>
          <IonCol sizeMd="3" sizeXs="0" sizeSm="1"></IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
