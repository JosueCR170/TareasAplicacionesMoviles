// src/services/registerUser.ts
import { auth, db } from '../firebase/config/firebaseConfig';
import { createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UserModel } from '../../models/userModel';

interface RegisterData {
  email: string;
  password: string;
  userName: string;
}

export const registerUser = async ({ email, password, userName }: RegisterData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar el usuario en Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email,
      userName,
      createdAt: new Date(),
      role: 'USER', 
    });

    //await signOut(auth);

    return { success: true };
  } catch (error) {
    console.error('Error registrando usuario:', error);
    return { success: false, error };
  }
}

  export const createUserProfile = async ({ uid, email, userName, role = 'USER' }: UserModel) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
  
      // Solo crear si no existe
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid,
          email,
          userName,
          role,
          createdAt: new Date(),
        });
        console.log('Perfil de usuario creado en Firestore');
      } else {
        console.log('El perfil ya existe en Firestore');
      }
  
      return { success: true };
    } catch (error) {
      console.error('Error creando perfil en Firestore:', error);
      return { success: false, error };
    }
  }


