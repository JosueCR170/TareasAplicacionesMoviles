import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import TopicSubscription from '../components/notification/TopicSubscription';
import './Tab3.css';

const Tab4: React.FC = () => {
  return (
    <IonPage>
     
      <IonContent fullscreen>
       <TopicSubscription/>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
