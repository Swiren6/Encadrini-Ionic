/**
 * Application-wide constants
 * Centralized location for magic strings and configuration values
 */

export const REQUEST_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
} as const;

export type RequestStatus = typeof REQUEST_STATUS[keyof typeof REQUEST_STATUS];

export const USER_ROLES = {
  STUDENT: 'student',
  PROFESSOR: 'professor'
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export const STORAGE_KEYS = {
  CURRENT_USER: 'currentUser'
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  // Authentication errors
  EMAIL_ALREADY_IN_USE: 'Cet email est déjà utilisé',
  WEAK_PASSWORD: 'Le mot de passe est trop faible (minimum 6 caractères)',
  INVALID_EMAIL: 'Email invalide',
  USER_NOT_FOUND: 'Aucun compte avec cet email',
  WRONG_PASSWORD: 'Mot de passe incorrect',
  
  // Validation errors
  FILL_ALL_FIELDS: 'Veuillez remplir tous les champs',
  PASSWORD_MISMATCH: 'Les mots de passe ne correspondent pas',
  INVALID_EMAIL_FORMAT: 'Veuillez entrer un email valide',
  PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 6 caractères',
  
  // Network errors
  NETWORK_ERROR: 'Erreur de connexion. Vérifiez votre connexion internet',
  GENERIC_ERROR: 'Une erreur est survenue',
  
  // Firebase errors
  PERMISSION_DENIED: 'Vous n\'avez pas les permissions nécessaires',
  NOT_FOUND: 'Ressource introuvable',
  
  // Request errors
  REQUEST_SEND_FAILED: 'Impossible d\'envoyer la demande',
  REQUEST_UPDATE_FAILED: 'Impossible de mettre à jour la demande',
  
  // Professor errors
  PROFESSOR_NOT_AVAILABLE: 'Ce professeur n\'est plus disponible',
  PROFESSOR_UPDATE_FAILED: 'Impossible de mettre à jour les informations'
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: 'Votre compte a été créé avec succès !',
  LOGIN_SUCCESS: 'Connexion réussie !',
  LOGOUT_SUCCESS: 'Déconnexion réussie',
  
  REQUEST_SENT: 'Votre demande a été envoyée avec succès !',
  REQUEST_SENT_WITH_EMAIL: 'Votre demande a été envoyée avec succès et un email a été envoyé au professeur !',
  REQUEST_ACCEPTED: 'Demande acceptée avec succès !',
  REQUEST_REJECTED: 'La demande a été rejetée',
  
  INFO_UPDATED: 'Vos informations ont été mises à jour avec succès !',
  PROFILE_UPDATED: 'Profil mis à jour avec succès !'
} as const;

// Validation Patterns
export const VALIDATION = {
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 100
} as const;

// UI Configuration
export const UI_CONFIG = {
  TOAST_DURATION: {
    SHORT: 2000,
    MEDIUM: 3000,
    LONG: 4000
  },
  LOADING_MESSAGES: {
    DEFAULT: 'Chargement...',
    SAVING: 'Sauvegarde...',
    SENDING: 'Envoi en cours...',
    CONNECTING: 'Connexion...',
    CREATING_ACCOUNT: 'Création du compte...'
  }
} as const;

// Professor Configuration
export const PROFESSOR_CONFIG = {
  DEFAULT_MAX_STUDENTS: 5,
  DEFAULT_AVAILABLE: true
} as const;

// Firebase Collection Names
export const COLLECTIONS = {
  USERS: 'users',
  PROFESSORS: 'professors',
  REQUESTS: 'requests'
} as const;

// Status Colors for UI
export const STATUS_COLORS = {
  [REQUEST_STATUS.PENDING]: 'warning',
  [REQUEST_STATUS.ACCEPTED]: 'success',
  [REQUEST_STATUS.REJECTED]: 'danger'
} as const;

// Status Icons
export const STATUS_ICONS = {
  [REQUEST_STATUS.PENDING]: 'time-outline',
  [REQUEST_STATUS.ACCEPTED]: 'checkmark-circle-outline',
  [REQUEST_STATUS.REJECTED]: 'close-circle-outline'
} as const;

// Status Text (French)
export const STATUS_TEXT_FR = {
  [REQUEST_STATUS.PENDING]: 'En attente',
  [REQUEST_STATUS.ACCEPTED]: 'Acceptée',
  [REQUEST_STATUS.REJECTED]: 'Rejetée'
} as const;

// Date Format
export const DATE_FORMAT = {
  DISPLAY: 'dd/MM/yyyy HH:mm',
  DISPLAY_SHORT: 'dd/MM/yyyy',
  ISO: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx'
} as const;