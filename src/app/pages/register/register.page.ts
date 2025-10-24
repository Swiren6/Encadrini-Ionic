import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterPage {
  fullname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: 'student' | 'professor' = 'student';
  
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  showSuccess = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private firebaseService: FirebaseService
  ) {}
  
  onRoleChange(event: any) {
    this.role = event.detail.value;
    console.log('Rôle choisi :', this.role);
  }

  async register() {
    // Validation
    if (!this.fullname || !this.email || !this.password || !this.confirmPassword) {
      await this.showAlert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      await this.showAlert('Erreur', 'Veuillez entrer un email valide');
      return;
    }

    if (this.password.length < 6) {
      await this.showAlert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (this.password !== this.confirmPassword) {
      await this.showAlert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    // Loader
    const loading = await this.loadingController.create({
      message: 'Création du compte...',
    });
    await loading.present();

    try {
      const result = await this.authService.register({
        email: this.email,
        password: this.password,
        Fullname: this.fullname,
        role: this.role,
      });

      await loading.dismiss();

      if (result.success) {
        const user = this.authService.getUser();
        
        // Create professor profile if user is a professor
        if (user?.role === 'professor' && user.id) {
          try {
            await this.firebaseService.createProfessorProfile(user.id, {
              Fullname: user.Fullname,
              email: user.email,
              available: true,
              maxStudents: 5,
              specialization: '',
              remarks: ''
            });
          } catch (error) {
            console.error('Error creating professor profile:', error);
          }
        }

        await this.showAlert('Succès', 'Votre compte a été créé avec succès !');

        if (user?.role === 'student') {
          this.router.navigate(['/student-home']);
        } else if (user?.role === 'professor') {
          this.router.navigate(['/professor-home']);
        }
      } else {
        await this.showAlert('Erreur', result.message || 'Une erreur est survenue');
      }
    } catch (error) {
      await loading.dismiss();
      await this.showAlert('Erreur', 'Une erreur est survenue lors de la création du compte');
      console.error('Registration error:', error);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}