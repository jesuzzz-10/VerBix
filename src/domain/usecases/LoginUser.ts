// src/domain/usecases/LoginUser.ts
import { FirebaseUserRepository } from '../../data/repositories/FirebaseUserRepository';
import { User } from '../entities/User';

export class LoginUser {
  constructor(private repository: FirebaseUserRepository) {}

  async execute(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    const result = await this.repository.login(email, password);

    if (!result.success || !result.user) {
      return { success: false, error: result.error };
    }

    // Convertimos la información de Firebase a nuestra entidad de dominio
    const user = new User(result.user.uid, result.user.email || '');
    return { success: true, user };
  }
}
