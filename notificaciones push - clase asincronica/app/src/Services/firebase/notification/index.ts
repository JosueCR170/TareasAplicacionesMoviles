import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const savePushToken = async (token: string,uid: string) => {
  try {
    await setDoc(doc(db, "deviceTokens", uid), {
      token: token,
      updatedAt: new Date(),
    });    
  } catch (error) {
    alert("❌ Error al guardar token: "+ error);
  }
};

export const getDeviceTokens = async () => {
  const tokens: string[] = [];
  const snapshot = await getDocs(collection(db, 'deviceTokens'));

  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.token) {
      tokens.push(data.token);
    }
  });

  return tokens;
};