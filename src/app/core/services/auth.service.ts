import { Injectable } from '@angular/core';

const TOKEN_KEY = 'flastore_token';
const MOCK_TOKEN = 'mock-jwt-token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly MOCK_USER = 'admin';
  private readonly MOCK_PASS = 'admin';

  login(usuario: string, senha: string): boolean {
    if (usuario === this.MOCK_USER && senha === this.MOCK_PASS) {
      localStorage.setItem(TOKEN_KEY, MOCK_TOKEN);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return this.getToken() === MOCK_TOKEN;
  }
}
