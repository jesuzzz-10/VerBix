// src/domain/usecases/RegisterUser.ts
import { FirebaseUserRepository } from '../../data/repositories/FirebaseUserRepository';
import { User } from '../entities/User';

export class RegisterUser {
  constructor(private repository: FirebaseUserRepository) {}

  async execute(email: string, password: string, name: string): Promise<{ success: boolean; user?: User; error?: string }> {
    const result = await this.repository.register(email, password, name);

    if (!result.success || !result.user) {
      return { success: false, error: result.error };
    }

    // Creamos un objeto User de dominio con los datos recibidos
    const user = new User(
      result.user.uid,
      result.user.email,
      name,
      new Date().toISOString().split('T')[0] // fecha_registro YYYY-MM-DD
    );

    return { success: true, user };
  }
}
