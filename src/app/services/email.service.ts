import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() {
    // Initialiser EmailJS
    emailjs.init(environment.emailjs.publicKey);
  }

  // Envoyer un email de demande d'encadrement
  async sendRequestEmail(data: {
    to_email: string;
    to_name: string;
    student_name: string;
    project_title: string;
    project_description: string;
  }): Promise<boolean> {
    try {
      const response = await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        {
          to_email: data.to_email,
          to_name: data.to_name,
          student_name: data.student_name,
          project_title: data.project_title,
          project_description: data.project_description
        }
      );
      
      console.log('Email envoyé avec succès:', response);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return false;
    }
  }

  // Envoyer un email de confirmation d'acceptation
  async sendAcceptanceEmail(data: {
    to_email: string;
    student_name: string;
    professor_name: string;
    project_title: string;
  }): Promise<boolean> {
    try {
      const response = await emailjs.send(
        environment.emailjs.serviceId,
        'template_acceptance', // Template différent pour l'acceptation
        data
      );
      
      console.log('Email d\'acceptation envoyé:', response);
      return true;
    } catch (error) {
      console.error('Erreur:', error);
      return false;
    }
  }

  // Envoyer un email de rejet
  async sendRejectionEmail(data: {
    to_email: string;
    student_name: string;
    professor_name: string;
    project_title: string;
    reason?: string;
  }): Promise<boolean> {
    try {
      const response = await emailjs.send(
        environment.emailjs.serviceId,
        'template_rejection',
        data
      );
      
      console.log('Email de rejet envoyé:', response);
      return true;
    } catch (error) {
      console.error('Erreur:', error);
      return false;
    }
  }
}