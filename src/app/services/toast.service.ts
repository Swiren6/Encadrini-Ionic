import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

/**
 * Toast Notification Service
 * Provides consistent toast notifications throughout the app
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastController = inject(ToastController);

  /**
   * Show success toast notification
   * @param message Message to display
   * @param duration Duration in milliseconds (default: 3000)
   */
  async showSuccess(message: string, duration: number = 3000): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  /**
   * Show error toast notification
   * @param message Message to display
   * @param duration Duration in milliseconds (default: 4000)
   */
  async showError(message: string, duration: number = 4000): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      color: 'danger',
      position: 'top',
      icon: 'alert-circle-outline',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  /**
   * Show info toast notification
   * @param message Message to display
   * @param duration Duration in milliseconds (default: 3000)
   */
  async showInfo(message: string, duration: number = 3000): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      color: 'primary',
      position: 'top',
      icon: 'information-circle-outline',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  /**
   * Show warning toast notification
   * @param message Message to display
   * @param duration Duration in milliseconds (default: 3500)
   */
  async showWarning(message: string, duration: number = 3500): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      color: 'warning',
      position: 'top',
      icon: 'warning-outline',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  /**
   * Show custom toast notification
   * @param config Custom toast configuration
   */
  async showCustom(config: {
    message: string;
    color?: string;
    duration?: number;
    position?: 'top' | 'bottom' | 'middle';
    icon?: string;
  }): Promise<void> {
    const toast = await this.toastController.create({
      message: config.message,
      duration: config.duration || 3000,
      color: config.color || 'primary',
      position: config.position || 'top',
      icon: config.icon,
      cssClass: 'custom-toast'
    });
    await toast.present();
  }
}