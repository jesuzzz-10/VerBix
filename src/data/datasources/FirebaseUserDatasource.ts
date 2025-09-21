// src/data/datasources/FirebaseUserDatasource.ts
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

export class FirebaseUserDatasource {
  private auth = getAuth(app);
  private db = getFirestore(app);

  // Registrar un usuario
  async register(email: string, password: string, name: string): Promise<{ success: boolean; user?: UserCredential; error?: string }> {
    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = userCredential.user.uid;

      // 2. Crear documento en Firestore en "users"
      const userDocRef = doc(this.db, 'users', uid);
      await setDoc(userDocRef, {
        uid,
        email,
        name,
        fecha_registro: new Date().toISOString().split('T')[0], // YYYY-MM-DD

        progreso_general: {
          porcentaje_aprendido: 0,
          cantidad_total_verbos: 0,
          verbos_aprendidos: 0,
          racha: {
            dias_consecutivos: 0,
            fecha_ultima_racha: '',
          },
          fecha_ultima_practica: '',
          estadisticas: {
            tiempo_practicado: {
              total: 0,
              ultima_sesion: 0,
            },
            mejor_racha: 0,
          },
        },
      });

      return { success: true, user: userCredential };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Login de usuario
  async login(email: string, password: string): Promise<{ success: boolean; user?: UserCredential; error?: string }> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return { success: true, user: userCredential };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Logout de usuario
  async logout(): Promise<{ success: boolean; error?: string }> {
    try {
      await signOut(this.auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
