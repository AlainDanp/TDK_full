import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

export interface AuthUser {
  id?: number | string;
  email: string;
  username: string;
  phoneNumber?: string;
  roles?: string[];
  [k: string]: any;
}

export interface AuthResponse {
  token: string;
  roles: string[];
}

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;           // adapte la clé si ton backend attend phoneNumber
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:9090/api/auth';

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          if (res?.token) localStorage.setItem('token', res.token);
          if (res?.roles?.length) localStorage.setItem('roles', JSON.stringify(res.roles));
        })
      );
  }

  register(payload: RegisterPayload): Observable<any> {
    const body = {
      email: payload.email.trim(),
      password: payload.password.trim(),
      username: payload.username.trim(),
      phoneNumber: payload.phoneNumber.trim(),
    };

    return this.http.post(`${this.apiUrl}/register`, body, { responseType: 'text' })
      .pipe(
        tap(() => console.log('SUCCESS'))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRoles(): string[] {
    const raw = localStorage.getItem('roles');
    return raw ? (JSON.parse(raw) as string[]) : [];
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    try {
      const payload = JSON.parse(atob(parts[1]));
      if (payload?.exp && Date.now() >= payload.exp * 1000) return false;
      return true;
    } catch {
      return true;
    }
  }
}
