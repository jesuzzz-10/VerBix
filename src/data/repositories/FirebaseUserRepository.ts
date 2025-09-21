// src/data/repositories/FirebaseUserRepository.ts
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { User } from '../../domain/entities/User';
import { app } from '../../firebaseConfig';
import { FirebaseUserDatasource } from '../datasources/FirebaseUserDatasource';

const db = getFirestore(app);

export class FirebaseUserRepository {
  constructor(private datasource: FirebaseUserDatasource) {}

  // REGISTER actualizado
  async register(email: string, password: string, name?: string): Promise<{ success: boolean; user?: User; error?: string }> {
    const result = await this.datasource.register(email, password, name || '');


    if (!result.success || !result.user) {
      return { success: false, error: result.error };
    }

    const now = new Date();
    const fecha_registro = now.toISOString().split('T')[0]; // YYYY-MM-DD

    // Crear la entidad de dominio
    const user = new User(
      result.user.user.uid,
      result.user.user.email || '',
      name,
      fecha_registro
    );

    // Guardar también en Firestore
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.name || '',
        fecha_registro: user.fecha_registro,
        progreso_general: user.progreso_general
      });
    } catch (error: any) {
      return { success: false, error: error.message };
    }

    return { success: true, user };
  }

  // LOGIN y LOGOUT NO se tocan
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    const result = await this.datasource.login(email, password);

    if (!result.success || !result.user) {
      return { success: false, error: result.error };
    }

    const user = new User(.user.uid, result.user.email || '');
    return { success: true, user };
  }

  async logout(): Promise<{ success: boolean; error?: string }> {
    return await this.datasource.logout();
  }
}
