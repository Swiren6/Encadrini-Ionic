import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // ⬅️ IMPORT MANQUANT
import { Professor, Request } from '../models/models';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly firebaseService = inject(FirebaseService);

  // Utiliser Firebase au lieu des données en mémoire
  getProfessors(): Observable<Professor[]> {
    return this.firebaseService.getProfessors();
  }

  getProfessor(id: string): Observable<Professor | undefined> {
    return this.firebaseService.getProfessors().pipe(
      map((professors: Professor[]) => professors.find((p: Professor) => p.id === id))
    );
  }

  createRequest(request: Omit<Request, 'id' | 'status' | 'date'>): Observable<string> {
    const newRequest = {
      ...request,
      status: 'pending' as const,
      date: new Date().toISOString()
    };
    
    return new Observable<string>(observer => {
      this.firebaseService.createRequest(newRequest)
        .then(id => {
          observer.next(id);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  getStudentRequests(studentId: string): Observable<Request[]> {
    return this.firebaseService.getStudentRequests(studentId);
  }

  getProfessorRequests(professorId: string): Observable<Request[]> {
    return this.firebaseService.getProfessorRequests(professorId);
  }

  acceptRequest(requestId: string): Observable<void> {
    return new Observable<void>(observer => {
      this.firebaseService.updateRequest(requestId, { status: 'accepted' })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  rejectRequest(requestId: string): Observable<void> {
    return new Observable<void>(observer => {
      this.firebaseService.updateRequest(requestId, { status: 'rejected' })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }
}