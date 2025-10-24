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
        this.filteredProfessors = professors;
      }
    );
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value || '';
    this.search();
  }

  search() {
    if (!this.searchTerm) {
      this.filteredProfessors = this.professors;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredProfessors = this.professors.filter(p =>
      p.Fullname.toLowerCase().includes(term) ||
      (p.specialization?.toLowerCase() ?? '').includes(term)
    );
  }

  selectProfessor(professor: Professor) {
    if (professor.available) {
      this.router.navigate(['/request-form', professor.id]);
    }
  }

  goBack() {
    this.router.navigate(['/student-home']);
  }

  getAvailabilityText(professor: Professor): string {
    return professor.available ? 'Disponible' : 'Non disponible';
  }
  selectedFilter = 'all'; // Valeur par défaut

applyFilter() {
  if (this.selectedFilter === 'all') {
    this.filteredProfessors = this.professors;
  } else if (this.selectedFilter === 'available') {
    this.filteredProfessors = this.professors.filter(
      prof => !!prof.available
    );
  } else if (this.selectedFilter === 'specialization') {
    this.filteredProfessors = this.professors.filter(
      prof => (prof.specialization?.toLowerCase() ?? '').includes('informatique')
    );
  }
}
}