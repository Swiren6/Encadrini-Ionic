import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({

  selector: 'app-form-prof',
  templateUrl: './form-prof.page.html',
  styleUrls: ['./form-prof.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class FormProfPage {
  specialization = '';
  remarks = '';
  professorId!: string;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly authService: AuthService,
    private readonly alertCtrl: AlertController,
    private readonly loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const user = this.authService.getUser();
    if (user) {
      this.professorId = user.id!;
      await this.loadProfessorInfo();
    }
  }

  async loadProfessorInfo() {
    const prof = await this.firebaseService.getProfessorById(this.professorId);
    if (prof) {
      this.specialization = prof.specialization || '';
      this.remarks = prof.remarks || '';
    }
  }

  async saveProfessorInfo() {
    const loading = await this.loadingCtrl.create({ message: 'Sauvegarde...' });
    await loading.present();

    try {
      await this.firebaseService.updateProfessor(this.professorId, {
        specialization: this.specialization,
        remarks: this.remarks,
      });

      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Succès ✅',
        message: 'Vos informations ont été mises à jour avec succès !',
        buttons: ['OK'],
      });
      await alert.present();
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Erreur ❌',
        message: 'Impossible de sauvegarder les informations',
        buttons: ['OK'],
      });
      await alert.present();
      console.error(error);
    }
  }
}