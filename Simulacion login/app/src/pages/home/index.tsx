import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
 

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
       Hola clase este es el home
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
