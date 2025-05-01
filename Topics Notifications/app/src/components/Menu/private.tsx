import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { atCircle, ellipseOutline, homeOutline, square, triangle } from "ionicons/icons";

export const MenuLoggedIn = () => {
  return (
    <IonTabBar slot='bottom'>
      <IonTabButton tab='home' href='/'>
        <IonIcon aria-hidden='true' icon={homeOutline} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab='tab2' href='/tab2'>
        <IonIcon aria-hidden='true' icon={ellipseOutline} />
        <IonLabel>Perfil</IonLabel>
      </IonTabButton>
      <IonTabButton tab='tab3' href='/tab3'>
        <IonIcon aria-hidden='true' icon={triangle} />
        <IonLabel>Enviar Notificacion</IonLabel>
      </IonTabButton>
      <IonTabButton tab='tab4' href='/tab4'>
        <IonIcon aria-hidden='true' icon={square} />
        <IonLabel>Suscribirse</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};
