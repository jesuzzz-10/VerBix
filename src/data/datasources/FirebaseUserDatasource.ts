// src/data/datasources/FirebaseUserDatasource.ts
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { app } from '../../firebaseConfig';

export class FirebaseUserDatasource {
  private auth = getAuth(app);

  // Registrar un usuario
  async register(email: string, password: string): Promise<{ success: boolean; user?: UserCredential; error?: string }> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
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
