import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async login() {
    if (!this.email || !this.password) {
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Veuillez remplir tous les champs',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Connexion...',
    });
    await loading.present();

    const result = await this.authService.login(this.email, this.password);
    
    await loading.dismiss();

    if (result.success) {
      if (this.authService.isStudent()) {
        this.router.navigate(['/student-home']);
      } else {
        this.router.navigate(['/professor-home']);
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: result.message || 'Email ou mot de passe incorrect',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}