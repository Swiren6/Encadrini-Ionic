import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Professor } from '../../models/models';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-professor-list',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './professor-list.page.html',
  styleUrls: ['./professor-list.page.scss']
})
export class ProfessorListPage implements OnInit {
  professors: Professor[] = [];
  filteredProfessors: Professor[] = [];
  searchTerm: string = '';
  selectedFilter: string = 'all';

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loadProfessors();
  }

  loadProfessors() {
    this.apiService.getProfessors().subscribe(
      professors => {
        this.professors = professors;
        this.applyFilters(); // Apply initial filter
      }
    );
  }

  /**
   * Handle search input change
   */
  onSearchChange(event: any) {
    this.searchTerm = event.detail.value || '';
    this.applyFilters();
  }

  /**
   * Handle filter segment change
   */
  onFilterChange(event: any) {
    this.selectedFilter = event.detail.value;
    this.applyFilters();
  }

  /**
   * Apply both search and filter
   */
  applyFilters() {
    // First apply the filter
    let filtered = [...this.professors];

    // Apply selected filter
    switch (this.selectedFilter) {
      case 'all':
        // Show all professors
        break;
      case 'available':
        filtered = filtered.filter(prof => prof.available === true);
        break;
      case 'specialization':
        // You can make this dynamic based on actual specializations
        // For now, just show all (or filter by specific specialization)
        filtered = filtered.filter(prof => prof.specialization && prof.specialization.trim() !== '');
        break;
    }

    // Then apply search if there's a search term
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(prof =>
        prof.Fullname.toLowerCase().includes(term) ||
        (prof.specialization?.toLowerCase() ?? '').includes(term) ||
        (prof.email?.toLowerCase() ?? '').includes(term)
      );
    }

    this.filteredProfessors = filtered;
  }

  /**
   * Select a professor and navigate to request form
   */
  selectProfessor(professor: Professor) {
    if (professor.available && professor.id) {
      this.router.navigate(['/request-form', professor.id]);
    }
  }

  /**
   * Navigate back to student home
   */
  goBack() {
    this.router.navigate(['/student-home']);
  }

  /**
   * Get availability text for a professor
   */
  getAvailabilityText(professor: Professor): string {
    if (!professor.available) {
      return 'Non disponible';
    }
    
    const maxStudents = professor.maxStudents || 0;
    if (maxStudents > 0) {
      return `${maxStudents} places`;
    }
    
    return 'Disponible';
  }

  /**
   * Track by function for performance optimization
   */
  trackByProfessorId(index: number, professor: Professor): string {
    return professor.id || index.toString();
  }
}