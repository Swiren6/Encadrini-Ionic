import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import fs from "fs";

// === CONFIGURATION FIREBASE ===
// ⚠️ Mets ici la configuration exacte de ton projet (Firebase Console > Project Settings > General)
const firebaseConfig = {
  apiKey: "AIzaSyDukgjfPkaGlDTbgeaeh0NCSgWwp_7QrLA",
  authDomain: "encadrini-42c37.firebaseapp.com",
  projectId: "encadrini-42c37",
  storageBucket: "encadrini-42c37.firebasestorage.app",
  messagingSenderId: "366974741617",
  appId: "1:366974741617:web:01114de0d611931e03bfd0",
  measurementId: "G-4SEMGF3YBM"
};

// === INITIALISATION ===
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === IMPORT DU FICHIER JSON ===
const data = JSON.parse(fs.readFileSync("./encadrini_firestore_data.json", "utf8"));

// === Fonction d’importation ===
async function importCollection(collectionName, docs) {
  const collRef = collection(db, collectionName);
  console.log(`\n📥 Importation de la collection "${collectionName}" (${Object.keys(docs).length} documents)...`);
  for (const [key, docData] of Object.entries(docs)) {
    await addDoc(collRef, { ...docData, createdAt: serverTimestamp() });
    console.log(`✅ Document ajouté : ${key}`);
  }
}

async function runImport() {
  try {
    for (const [collectionName, docs] of Object.entries(data)) {
      await importCollection(collectionName, docs);
    }
    console.log("\n🎉 Importation terminée avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de l'importation :", error);
  }
}

runImport();