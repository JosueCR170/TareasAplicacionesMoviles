import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonSegment, IonSegmentButton, IonLabel,
  IonButton, IonToast
} from '@ionic/react';

const topics = [
  { id: 'sports', name: 'Deportes' },
  { id: 'challenges', name: 'Nuevos Retos' },
];

const SendTopicNotification: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const sendNotification = async () => {
    if (!title || !body || !selectedTopic) {
      setToastMessage('Completa todos los campos y selecciona un topic.');
      setShowToast(true);
      return;
    }

    try {
      const response = await fetch('http://192.168.100.2:3000/api/send-topic-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: selectedTopic, title, body }),
      });

      const result = await response.json();
      setToastMessage(result.message || 'Notificación enviada correctamente');
    } catch (err) {
      console.error('Error enviando notificación:', err);
      setToastMessage('Error al enviar la notificación');
    }
    setShowToast(true);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enviar a Tópico</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonInput
          placeholder="Título de la notificación"
          value={title}
          onIonChange={(e) => setTitle(e.detail.value!)}
        />
        <IonInput
          placeholder="Mensaje"
          value={body}
          onIonChange={(e) => setBody(e.detail.value!)}
        />

        <h5 style={{ marginTop: '1rem' }}>Selecciona un Tópico:</h5>
        <IonSegment
          value={selectedTopic}
          onIonChange={(e) => setSelectedTopic(e.detail.value as string)}
        >
          {topics.map(({ id, name }) => (
            <IonSegmentButton key={id} value={id}>
              <IonLabel>{name}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>

        <IonButton expand="block" onClick={sendNotification} style={{ marginTop: '1.5rem' }}>
          Enviar Notificación
        </IonButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2500}
        />
      </IonContent>
    </>
  );
};

export default SendTopicNotification;
