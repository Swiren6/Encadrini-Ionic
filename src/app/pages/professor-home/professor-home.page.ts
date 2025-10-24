import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Request } from '../../models/models';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-professor-home',
  standalone: true,
  templateUrl: './professor-home.page.html',
  styleUrls: ['./professor-home.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DatePipe,
    RouterLink 
  ]
})

export class ProfessorHomePage implements OnInit {
  requests: Request[] = [];
  userName: string = '';
  statistics = {
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0
  };

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (user) {
      this.userName = user.Fullname;
      this.loadRequests();
    }
  }

  loadRequests() {
    const user = this.authService.getUser();
    if (user) {
      this.apiService.getProfessorRequests(user.id).subscribe(
        requests => {
          this.requests = requests;
          this.calculateStatistics();
        }
      );
    }
  }

  calculateStatistics() {
    this.statistics.total = this.requests.length;
    this.statistics.pending = this.requests.filter(r => r.status === 'pending').length;
    this.statistics.accepted = this.requests.filter(r => r.status === 'accepted').length;
    this.statistics.rejected = this.requests.filter(r => r.status === 'rejected').length;
    this.updateStatCards();
  }

  updateStatCards() {
  this.statCards = [
    { label: 'Total', value: this.statistics.total, icon: 'documents-outline', class: 'primary' },
    { label: 'En attente', value: this.statistics.pending, icon: 'time-outline', class: 'warning' },
    { label: 'Acceptées', value: this.statistics.accepted, icon: 'checkmark-circle-outline', class: 'success' },
    { label: 'Rejetées', value: this.statistics.rejected, icon: 'close-circle-outline', class: 'danger' },
  ];
}
  statCards = [
  { label: 'Total', value: this.statistics.total, icon: 'documents-outline', class: 'primary' },
  { label: 'En attente', value: this.statistics.pending, icon: 'time-outline', class: 'warning' },
  { label: 'Acceptées', value: this.statistics.accepted, icon: 'checkmark-circle-outline', class: 'success' },
  { label: 'Rejetées', value: this.statistics.rejected, icon: 'close-circle-outline', class: 'danger' },
];

  async accept(request: Request) {
    const alert = await this.alertController.create({
      header: 'Accepter la demande',
      message: `Êtes-vous sûr de vouloir accepter la demande de ${request.studentName} ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Accepter',
          handler: () => {
            this.apiService.acceptRequest(request.id).subscribe(async () => {
              const successAlert = await this.alertController.create({
                header: 'Succès',
                message: 'Demande acceptée avec succès !',
                buttons: ['OK']
              });
              await successAlert.present();
              this.loadRequests();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async reject(request: Request) {
    const alert = await this.alertController.create({
      header: 'Rejeter la demande',
      message: `Êtes-vous sûr de vouloir rejeter la demande de ${request.studentName} ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Rejeter',
          cssClass: 'danger',
          handler: () => {
            this.apiService.rejectRequest(request.id).subscribe(async () => {
              const successAlert = await this.alertController.create({
                header: 'Demande rejetée',
                message: 'La demande a été rejetée.',
                buttons: ['OK']
              });
              await successAlert.present();
              this.loadRequests();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  logout() {
    this.authService.logout();
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'pending': return 'warning';
      case 'accepted': return 'success';
      case 'rejected': return 'danger';
      default: return 'medium';
    }
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Acceptée';
      case 'rejected': return 'Rejetée';
      default: return status;
    }
  }

  getStatusIcon(status: string): string {
    switch(status) {
      case 'pending': return 'time-outline';
      case 'accepted': return 'checkmark-circle-outline';
      case 'rejected': return 'close-circle-outline';
      default: return 'help-outline';
    }
  }
  
}