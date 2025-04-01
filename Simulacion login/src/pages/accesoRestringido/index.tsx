import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import "./accesoRestringido.css"

const AccesoRestringido: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Acceso Restringido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid className="ion-text-center">
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6">
              <IonImg
                src="/img/accesoDenegado2.png"
                alt="Acceso denegado"
                className="denied-image"
              />
              <h1 className="ion-text-danger">¡Acceso Denegado!</h1>
              <p>No tienes los permisos necesarios para ver este contenido.</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AccesoRestringido;
