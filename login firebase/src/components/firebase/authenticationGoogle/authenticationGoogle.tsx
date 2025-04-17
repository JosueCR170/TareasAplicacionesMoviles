import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { useHistory } from "react-router-dom";
import { useCallback, useState } from "react";
import { IonButton, IonIcon, IonLoading } from "@ionic/react";
import { auth, authReady } from "../../../services/firebase/config/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { createUserProfile } from "../../../services/firebase/createUser";
import "./authenticationGoogleStyles.css";

const HandleGoogleSignIn = () => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      const result = await FirebaseAuthentication.signInWithGoogle();
  
      if (result?.user) {
        await authReady;
        const credential = await GoogleAuthProvider.credential(result.credential?.idToken);
  
        const userCredential = await signInWithCredential(auth, credential);
        const firebaseUser = userCredential.user;
  
        // Crear perfil en Firestore si no existe
        await createUserProfile({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          userName: firebaseUser.displayName || 'Usuario',
        });
  
        // Redirigir después de asegurarse que el perfil existe
        setLoading(false);
        history.push("/home");
      } else {
        setLoading(false);
        alert("El inicio de sesión con Google falló o fue cancelado.");
      }
    } catch (error: any) {
      setLoading(false);
      alert("Error durante el inicio de sesión con Google: " + error.message);
    }
  }, [history]);
  
  

  if (loading) {
    return <IonLoading isOpen message='Cargando sesión...' />;
  }

  return (
   
    <button className="btn-login google-btn" onClick={signInWithGoogle}>
      <img src="/img/google-logo.png" alt="google" className="img-logo"/>
      <p>Continuar con Google</p>
     
    </button>

    // <IonButton onClick={signInWithGoogle} expand='block'>
    //   <IonIcon slot='start' name='logo-google'></IonIcon>
    //   Iniciar sesión con Google
    // </IonButton>
  );
};

export default HandleGoogleSignIn;
