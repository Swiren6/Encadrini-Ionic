import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Request } from '../../models/models';
import { IonicModule } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-home',
  standalone: true,
  templateUrl: './student-home.page.html',
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DatePipe
  ],
  styleUrls: ['./student-home.page.scss']
})
export class StudentHomePage implements OnInit {
  requests: Request[] = [];
  userName: string = '';
  
  statistics = {
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0
  };

  statCards = [
    { label: 'Total', value: 0, icon: 'documents-outline', class: 'primary' },
    { label: 'En attente', value: 0, icon: 'time-outline', class: 'warning' },
    { label: 'Acceptées', value: 0, icon: 'checkmark-circle-outline', class: 'success' },
    { label: 'Rejetées', value: 0, icon: 'close-circle-outline', class: 'danger' },
  ];

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (user) {
      this.userName = user.Fullname;
      this.loadRequests();
    }
  }

  /**
   * Load all requests for the current student
   */
  loadRequests() {
    const user = this.authService.getUser();
    if (user) {
      this.apiService.getStudentRequests(user.id).subscribe({
        next: (requests) => {
          this.requests = requests;
          this.calculateStatistics();
        },
        error: (error) => {
          console.error('Error loading requests:', error);
        }
      });
    }
  }

  /**
   * Calculate statistics from requests
   */
  calculateStatistics() {
    this.statistics.total = this.requests.length;
    this.statistics.pending = this.requests.filter(r => r.status === 'pending').length;
    this.statistics.accepted = this.requests.filter(r => r.status === 'accepted').length;
    this.statistics.rejected = this.requests.filter(r => r.status === 'rejected').length;
    
    // Update stat cards after calculating
    this.updateStatCards();
  }

  /**
   * Update the statCards array with new values
   * This ensures the UI updates correctly
   */
  updateStatCards() {
    this.statCards = [
      { 
        label: 'Total', 
        value: this.statistics.total, 
        icon: 'documents-outline', 
        class: 'primary' 
      },
      { 
        label: 'En attente', 
        value: this.statistics.pending, 
        icon: 'time-outline', 
        class: 'warning' 
      },
      { 
        label: 'Acceptées', 
        value: this.statistics.accepted, 
        icon: 'checkmark-circle-outline', 
        class: 'success' 
      },
      { 
        label: 'Rejetées', 
        value: this.statistics.rejected, 
        icon: 'close-circle-outline', 
        class: 'danger' 
      },
    ];
  }

  /**
   * Navigate to professor list page
   */
  goToProfessors() {
    this.router.navigate(['/professor-list']);
  }

  /**
   * Logout user and redirect to login
   */
  logout() {
    this.authService.logout();
  }

  /**
   * Handle pull-to-refresh
   */
  handleRefresh(event: any) {
    this.loadRequests();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  /**
   * Get color for status chip
   */
  getStatusColor(status: string): string {
    switch(status) {
      case 'pending': return 'warning';
      case 'accepted': return 'success';
      case 'rejected': return 'danger';
      default: return 'medium';
    }
  }

  /**
   * Get French text for status
   */
  getStatusText(status: string): string {
    switch(status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Acceptée';
      case 'rejected': return 'Rejetée';
      default: return status;
    }
  }

  /**
   * Get icon for status
   */
  getStatusIcon(status: string): string {
    switch(status) {
      case 'pending': return 'time-outline';
      case 'accepted': return 'checkmark-circle-outline';
      case 'rejected': return 'close-circle-outline';
      default: return 'help-outline';
    }
  }

  /**
   * Track by function for better performance in *ngFor
   */
  trackByRequestId(index: number, request: Request): string {
    return request.id;
  }

  /**
   * Track by function for stat cards
   */
  trackByStatLabel(index: number, stat: any): string {
    return stat.label;
  }
}