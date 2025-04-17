import { signOut } from "firebase/auth";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

import { useHistory } from "react-router-dom";
import { auth } from "../../services/firebase/config/firebaseConfig";
import { IonIcon, IonLabel, IonTabButton, IonButton} from "@ionic/react";
import { exit } from "ionicons/icons";


const Logout = () => {
  // const history = useHistory();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      await FirebaseAuthentication.signOut();

      // history.push("/login");
    } catch (error: any) {
      console.error("Error al cerrar sesión: ", error);
    }
  };
  return (

    <IonTabButton tab="logout" onClick={handleLogout} href="/login">
        <IonIcon aria-hidden="true" icon={exit} />
        <IonLabel>Logout</IonLabel>
    </IonTabButton>

    // <IonButton onClick={handleLogout} expand='block'>
    //   <IonIcon slot='start' name='logo-google'></IonIcon>
    //   Cerrar sesión
    // </IonButton>
  );
};

export default Logout;