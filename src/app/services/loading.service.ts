import { Injectable, inject } from '@angular/core';
import { LoadingController } from '@ionic/angular';

/**
 * Loading Service
 * Centralized service for managing loading states
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly loadingController = inject(LoadingController);
  private loadingElement: HTMLIonLoadingElement | null = null;
  private isLoading = false;

  /**
   * Show loading indicator
   * @param message Loading message to display (default: 'Chargement...')
   * @param spinner Loading spinner type
   */
  async show(
    message: string = 'Chargement...',
    spinner: 'bubbles' | 'circles' | 'circular' | 'crescent' | 'dots' | 'lines' | 'lines-sharp' | 'lines-sharp-small' | 'lines-small' = 'crescent'
  ): Promise<void> {
    // Prevent multiple loaders
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.loadingElement = await this.loadingController.create({
      message,
      spinner,
      cssClass: 'custom-loading',
      backdropDismiss: false
    });
    
    await this.loadingElement.present();
  }

  /**
   * Hide loading indicator
   */
  async hide(): Promise<void> {
    if (this.loadingElement && this.isLoading) {
      await this.loadingElement.dismiss();
      this.loadingElement = null;
      this.isLoading = false;
    }
  }

  /**
   * Show loading for a specific duration
   * @param message Loading message
   * @param duration Duration in milliseconds
   */
  async showForDuration(message: string, duration: number): Promise<void> {
    await this.show(message);
    setTimeout(async () => {
      await this.hide();
    }, duration);
  }

  /**
   * Execute an async operation with loading
   * @param operation Async operation to execute
   * @param message Loading message
   * @returns Result of the operation
   */
  async executeWithLoading<T>(
    operation: () => Promise<T>,
    message: string = 'Chargement...'
  ): Promise<T> {
    await this.show(message);
    
    try {
      const result = await operation();
      await this.hide();
      return result;
    } catch (error) {
      await this.hide();
      throw error;
    }
  }

  /**
   * Check if currently loading
   */
  get isLoadingActive(): boolean {
    return this.isLoading;
  }
}