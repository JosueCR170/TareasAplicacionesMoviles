import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab4: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>();

  const handleSubscribe = () => {
    console.log(`Suscrito al tema: ${selectedTopic}`);
    // Aquí podrías agregar la lógica real para suscribirse
  };

  const handleUnsubscribe = () => {
    console.log(`Desuscrito del tema: ${selectedTopic}`);
    // Aquí podrías agregar la lógica real para desuscribirse
  };

  return (
    <IonPage>
     
      <IonContent fullscreen>
       

        <IonItem>
          <IonLabel>Selecciona un tema</IonLabel>
          <IonSelect
            value={selectedTopic}
            placeholder="Elige un tema"
            onIonChange={e => setSelectedTopic(e.detail.value)}
          >
            <IonSelectOption value="noticias">Noticias</IonSelectOption>
            <IonSelectOption value="eventos">Eventos</IonSelectOption>
            <IonSelectOption value="promociones">Promociones</IonSelectOption>
          </IonSelect>
        </IonItem>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
          <IonButton onClick={handleSubscribe} disabled={!selectedTopic}>
            Suscribirse
          </IonButton>
          <IonButton onClick={handleUnsubscribe} color="danger" disabled={!selectedTopic}>
            Desuscribirse
          </IonButton>
        </div>

        <ExploreContainer name="Tab 4 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
