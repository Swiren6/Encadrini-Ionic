import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/models';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseService = inject(FirebaseService);
  private currentUser: User | null = null;

  constructor(private router: Router) {
    // Charger l'utilisateur depuis localStorage au démarrage
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      this.currentUser = JSON.parse(saved);
    }
  }

  // Inscription avec Firebase
  async register(userData: {
    email: string;
    password: string;
    Fullname: string;
    role: 'student' | 'professor';
  }): Promise<{ success: boolean; message?: string }> {
    try {
      const user = await this.firebaseService.registerUser(
        userData.email,
        userData.password,
        {
          email: userData.email,
          Fullname: userData.Fullname,
          role: userData.role
        }
      );

      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));

      return { success: true };
    } catch (error: any) {
      let message = 'Une erreur est survenue';
      
      if (error.message.includes('email-already-in-use')) {
        message = 'Cet email est déjà utilisé';
      } else if (error.message.includes('weak-password')) {
        message = 'Le mot de passe est trop faible';
      } else if (error.message.includes('invalid-email')) {
        message = 'Email invalide';
      }

      return { success: false, message };
    }
  }

  // Connexion avec Firebase
  async login(email: string, password: string): Promise<{ success: boolean; message?: string }> {
    try {
      const user = await this.firebaseService.loginUser(email, password);

      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));

      return { success: true };
    } catch (error: any) {
      let message = 'Email ou mot de passe incorrect';
      
      if (error.message.includes('user-not-found')) {
        message = 'Aucun compte avec cet email';
      } else if (error.message.includes('wrong-password')) {
        message = 'Mot de passe incorrect';
      } else if (error.message.includes('invalid-email')) {
        message = 'Email invalide';
      }

      return { success: false, message };
    }
  }

  // Déconnexion
  async logout() {
    await this.firebaseService.logoutUser();
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isStudent(): boolean {
    return this.currentUser?.role === 'student';
  }

  isProfessor(): boolean {
    return this.currentUser?.role === 'professor';
  }
}