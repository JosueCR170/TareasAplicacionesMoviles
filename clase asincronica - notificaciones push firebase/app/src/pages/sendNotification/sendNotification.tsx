import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonRadioGroup, IonRadio, IonLabel, IonButton, IonInput
} from '@ionic/react';
import { getDeviceTokens } from '../../Services/firebase/notification';

interface DeviceToken {
  token: string;
}

const NotificationSender: React.FC = () => {
  const [tokens, setTokens] = useState<DeviceToken[]>([]);
  const [selectedToken, setSelectedToken] = useState<string>(''); // solo uno
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const deviceTokens = await getDeviceTokens();
        const uniqueTokens = Array.from(new Set(deviceTokens));
        setTokens(uniqueTokens.map(token => ({ token })));
      } catch (error) {
        console.error('Error al obtener los tokens desde Firestore:', error);
      }
    };

    fetchTokens();
  }, []);

  const sendNotification = async () => {
    if (!title || !body || !selectedToken) {
      setResponseMessage('Completa todos los campos y selecciona un token.');
      return;
    }

    const response = await fetch('http://192.168.100.2:3000/api/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: selectedToken, title, body })
    });

    const result = await response.json();
    setResponseMessage(result.message || 'Enviado');
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enviar Notificación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <IonInput
          placeholder="Título"
          value={title}
          onIonChange={e => setTitle(e.detail.value!)}
        />
        <IonInput
          placeholder="Mensaje"
          value={body}
          onIonChange={e => setBody(e.detail.value!)}
        />

        <IonList>
          <IonRadioGroup
            value={selectedToken}
            onIonChange={e => setSelectedToken(e.detail.value)}
          >
            {tokens.map(({ token }) => (
              <IonItem key={token}>
                <IonLabel>{token}</IonLabel>
                <IonRadio slot="end" value={token} />
              </IonItem>
            ))}
          </IonRadioGroup>
        </IonList>

        <IonButton expand="block" onClick={sendNotification}>
          Enviar Notificación
        </IonButton>

        {responseMessage && <p style={{ marginTop: 16 }}>{responseMessage}</p>}
      </IonContent>
    </>
  );
};

export default NotificationSender;
