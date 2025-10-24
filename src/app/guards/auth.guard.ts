import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Authentication guard to protect routes
 * Redirects to login if user is not authenticated
 */
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

/**
 * Student-specific guard
 * Ensures only students can access student routes
 */
export const studentGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isStudent()) {
    return true;
  }

  // If logged in but not a student, redirect to appropriate home
  if (authService.isProfessor()) {
    router.navigate(['/professor-home']);
    return false;
  }

  router.navigate(['/login']);
  return false;
};

/**
 * Professor-specific guard
 * Ensures only professors can access professor routes
 */
export const professorGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isProfessor()) {
    return true;
  }

  // If logged in but not a professor, redirect to appropriate home
  if (authService.isStudent()) {
    router.navigate(['/student-home']);
    return false;
  }

  router.navigate(['/login']);
  return false;
};