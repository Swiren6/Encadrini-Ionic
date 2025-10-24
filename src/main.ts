import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';

// Firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

const firebaseConfig = {
  apiKey: "AIzaSyDukgjfPkaGlDTbgeaeh0NCSgWwp_7QrLA",
  authDomain: "encadrini-42c37.firebaseapp.com",
  projectId: "encadrini-42c37",
  storageBucket: "encadrini-42c37.firebasestorage.app",
  messagingSenderId: "366974741617",
  appId: "1:366974741617:web:01114de0d611931e03bfd0",
  measurementId: "G-4SEMGF3YBM"
};

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),

    // Firebase providers
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
});