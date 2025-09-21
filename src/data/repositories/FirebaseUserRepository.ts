// src/data/repositories/FirebaseUserRepository.ts
import { User } from '../../domain/entities/User';
import { FirebaseUserDatasource } from '../datasources/FirebaseUserDatasource';

export class FirebaseUserRepository {
  constructor(private datasource: FirebaseUserDatasource) {}

  async register(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    const result = await this.datasource.register(email, password);

    if (!result.success || !result.user) {
      return { success: false, error: result.error };
    }

    const user = new User(result.user.user.uid, result.user.user.email || '');
    return { success: true, user };
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    const result = await this.datasource.login(email, password);

    if (!result.success || !result.user) {
      return { success: false, error: result.error };
    }

    const user = new User(result.user.user.uid, result.user.user.email || '');
    return { success: true, user };
  }

  async logout(): Promise<{ success: boolean; error?: string }> {
    return await this.datasource.logout();
  }
}
