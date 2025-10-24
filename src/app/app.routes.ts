import { Routes } from '@angular/router';
import { authGuard, studentGuard, professorGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',  
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'student-home',
    loadComponent: () => import('./pages/student-home/student-home.page').then(m => m.StudentHomePage),
    canActivate: [authGuard, studentGuard]
  },
  {
    path: 'professor-list',
    loadComponent: () => import('./pages/professor-list/professor-list.page').then(m => m.ProfessorListPage),
    canActivate: [authGuard, studentGuard]
  },
  {
    path: 'request-form/:id',
    loadComponent: () => import('./pages/request-form/request-form.page').then(m => m.RequestFormPage),
    canActivate: [authGuard, studentGuard]
  },
  {
    path: 'professor-home',
    loadComponent: () => import('./pages/professor-home/professor-home.page').then(m => m.ProfessorHomePage),
    canActivate: [authGuard, professorGuard]
  },
  {
    path: 'form-prof',
    loadComponent: () => import('./pages/form-prof/form-prof.page').then(m => m.FormProfPage),
    canActivate: [authGuard, professorGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];