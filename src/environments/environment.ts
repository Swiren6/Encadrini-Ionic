// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
  apiKey: "AIzaSyDukgjfPkaGlDTbgeaeh0NCSgWwp_7QrLA",
  authDomain: "encadrini-42c37.firebaseapp.com",
  projectId: "encadrini-42c37",
  storageBucket: "encadrini-42c37.firebasestorage.app",
  messagingSenderId: "366974741617",
  appId: "1:366974741617:web:01114de0d611931e03bfd0",
  measurementId: "G-4SEMGF3YBM"
},
  
  // EmailJS Configuration
  emailjs: {
    serviceId: 'service_encadrini',
    templateId: 'template_encadrement',
    publicKey: 'GRr4qUBledIgMLYsc'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
