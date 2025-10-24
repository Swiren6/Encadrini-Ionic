import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { EmailService } from '../../services/email.service';
import { Professor } from '../../models/models';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.page.html',
  styleUrls: ['./request-form.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RequestFormPage implements OnInit {
  private emailService = inject(EmailService);
  private loadingController = inject(LoadingController);
  
  professor: Professor | undefined;
  projectTitle: string = '';
  description: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const professorId = this.route.snapshot.paramMap.get('id');
    if (professorId) {
      this.apiService.getProfessor(professorId).subscribe(
        prof => this.professor = prof
      );
    }
  }

  async submit() {
    if (!this.projectTitle || !this.description) {
      const alert = await this.alertController.create({
        header: 'Champs manquants',
        message: 'Veuillez remplir tous les champs obligatoires',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const user = this.authService.getUser();
    if (!user || !this.professor) return;

    // Afficher un loader
    const loading = await this.loadingController.create({
      message: 'Envoi en cours...',
    });
    await loading.present();

    try {
      // 1. Créer la demande dans Firebase
      await this.apiService.createRequest({
        studentId: user.id,
        studentName: user.Fullname,
        professorId: this.professor.id,
        professorName: this.professor.Fullname,
        projectTitle: this.projectTitle,
        description: this.description
      });

      // 2. Envoyer l'email au professeur
      const emailSent = await this.emailService.sendRequestEmail({
        to_email: this.professor.email,
        to_name: this.professor.Fullname,
        student_name: user.Fullname,
        project_title: this.projectTitle,
        project_description: this.description
      });

      await loading.dismiss();

      // 3. Afficher confirmation
      const alert = await this.alertController.create({
        header: 'Succès',
        message: emailSent 
          ? 'Votre demande a été envoyée avec succès et un email a été envoyé au professeur !'
          : 'Votre demande a été envoyée avec succès !',
        buttons: ['OK']
      });
      await alert.present();
      
      this.router.navigate(['/student-home']);
    } catch (error) {
      await loading.dismiss();
      
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Une erreur est survenue. Veuillez réessayer.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  cancel() {
    this.router.navigate(['/professor-list']);
  }
}
