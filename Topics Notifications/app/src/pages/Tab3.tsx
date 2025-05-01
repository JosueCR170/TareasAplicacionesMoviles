import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import NotificationSender from './sendNotification/sendNotification';
import SendTopicNotification from './sendNotification/sendTopicsNotification';
import React, { useState } from 'react';

const Tab3: React.FC = () => {
  const [view, setView] = useState<'single' | 'topic'>('single');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ paddingTop: '16px' }}>
          <IonTitle>Enviar Notificaciones</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setView('single')}>Individual</IonButton>
            <IonButton onClick={() => setView('topic')}>Por tema</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {view === 'single' ? <NotificationSender /> : <SendTopicNotification />}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;


