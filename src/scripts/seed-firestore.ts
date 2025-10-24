import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDukgjfPkaGlDTbgeaeh0NCSgWwp_7QrLA",
  authDomain: "encadrini-42c37.firebaseapp.com",
  projectId: "encadrini-42c37",
  storageBucket: "encadrini-42c37.firebasestorage.app",
  messagingSenderId: "366974741617",
  appId: "1:366974741617:web:01114de0d611931e03bfd0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Données des professeurs
const professors = [
  {
    id: 'prof001',
    Fullname: 'Dr. Mohamed Ali',
    email: 'mohamed.ali@iset.tn',
    specialization: 'Data Science et Machine Learning',
    available: true,
    maxStudents: 5,
    remarks: 'Expert en analyse de données avec 10 ans d\'expérience. Spécialisé en Python, TensorFlow et applications big data. Publications dans des revues internationales.'
  },
  {
    id: 'prof002',
    Fullname: 'Dr. Fatma Ben Ahmed',
    email: 'fatma.benahmed@iset.tn',
    specialization: 'Intelligence Artificielle',
    available: true,
    maxStudents: 4,
    remarks: 'Docteur en IA, spécialiste des réseaux de neurones profonds et du traitement du langage naturel. Ancienne chercheuse chez Google AI.'
  },
  {
    id: 'prof003',
    Fullname: 'Dr. Ahmed Trabelsi',
    email: 'ahmed.trabelsi@iset.tn',
    specialization: 'Génie Logiciel',
    available: true,
    maxStudents: 6,
    remarks: 'Architecte logiciel senior. Expert en architectures microservices, DevOps et méthodologies agiles. Certifié AWS et Azure.'
  },
  {
    id: 'prof004',
    Fullname: 'Dr. Samia Bouazizi',
    email: 'samia.bouazizi@iset.tn',
    specialization: 'Sécurité Informatique',
    available: false,
    maxStudents: 3,
    remarks: 'Expert en cybersécurité, cryptographie et sécurité des réseaux. Certifiée CISSP et CEH. Actuellement en congé de recherche.'
  },
  {
    id: 'prof005',
    Fullname: 'Dr. Karim Gharbi',
    email: 'karim.gharbi@iset.tn',
    specialization: 'Développement Mobile',
    available: true,
    maxStudents: 5,
    remarks: 'Spécialiste iOS et Android. Expert Flutter, React Native et Ionic. Développeur d\'applications avec plus de 50 apps publiées.'
  },
  {
    id: 'prof006',
    Fullname: 'Dr. Leila Mansouri',
    email: 'leila.mansouri@iset.tn',
    specialization: 'Blockchain et Cryptomonnaies',
    available: true,
    maxStudents: 3,
    remarks: 'Pionnière en technologie blockchain en Tunisie. Expert en smart contracts, Ethereum et applications DeFi.'
  },
  {
    id: 'prof007',
    Fullname: 'Dr. Hichem Zarrouk',
    email: 'hichem.zarrouk@iset.tn',
    specialization: 'Cloud Computing',
    available: true,
    maxStudents: 4,
    remarks: 'Expert en infrastructure cloud, Kubernetes et solutions serverless. Formateur certifié AWS et Google Cloud.'
  },
  {
    id: 'prof008',
    Fullname: 'Dr. Sonia Khelifi',
    email: 'sonia.khelifi@iset.tn',
    specialization: 'UX/UI Design',
    available: false,
    maxStudents: 4,
    remarks: 'Designer d\'expérience utilisateur avec 8 ans d\'expérience. Spécialisée en design thinking et prototypage.'
  },
  {
    id: 'prof009',
    Fullname: 'Dr. Sirine Abdelkhalek',
    email: 'abdelkhaleksirinette6@gmail.com',
    specialization: 'Cloud Computing',
    available: true,
    maxStudents: 3,
    remarks: 'Expert en infrastructure cloud, Kubernetes et solutions serverless. Formateur certifié AWS et Google Cloud.'
  }
];

// Données des demandes
const requests = [
  {
    studentId: 'student001',
    studentName: 'Ahmed Ben Salem',
    professorId: 'prof001',
    professorName: 'Dr. Mohamed Ali',
    projectTitle: 'Système de Recommandation E-commerce',
    description: 'Développement d\'un système de recommandation de produits utilisant le machine learning. Le projet vise à analyser le comportement des utilisateurs sur une plateforme e-commerce pour suggérer des produits pertinents. Technologies envisagées : Python, TensorFlow, algorithmes collaboratifs.',
    status: 'pending',
    date: new Date('2025-10-20T09:30:00').toISOString()
  },
  {
    studentId: 'student002',
    studentName: 'Fatima Gharbi',
    professorId: 'prof002',
    professorName: 'Dr. Fatma Ben Ahmed',
    projectTitle: 'Chatbot Intelligent pour Service Client',
    description: 'Création d\'un chatbot basé sur l\'IA pour automatiser les réponses du service client. Utilisation du traitement du langage naturel (NLP) pour comprendre les requêtes clients. Technologies : Python, NLTK, TensorFlow, API REST.',
    status: 'accepted',
    date: new Date('2025-10-18T14:15:00').toISOString()
  },
  {
    studentId: 'student003',
    studentName: 'Youssef Mansouri',
    professorId: 'prof003',
    professorName: 'Dr. Ahmed Trabelsi',
    projectTitle: 'Plateforme de Gestion de Projets Agile',
    description: 'Application web collaborative pour la gestion de projets avec méthodologie Scrum. Fonctionnalités : kanban board, sprint planning, burndown charts. Stack : Angular, Node.js, MongoDB, intégration CI/CD avec GitLab.',
    status: 'pending',
    date: new Date('2025-10-22T10:00:00').toISOString()
  },
  {
    studentId: 'student004',
    studentName: 'Salma Ben Ali',
    professorId: 'prof001',
    professorName: 'Dr. Mohamed Ali',
    projectTitle: 'Analyse Prédictive des Ventes',
    description: 'Système d\'analyse prédictive utilisant des algorithmes de machine learning pour prévoir les tendances de ventes. Analyse de séries temporelles, détection d\'anomalies. Technologies : Python, Pandas, Scikit-learn, visualisation avec Plotly.',
    status: 'rejected',
    date: new Date('2025-10-15T11:20:00').toISOString()
  },
  {
    studentId: 'student005',
    studentName: 'Mehdi Kraiem',
    professorId: 'prof005',
    professorName: 'Dr. Karim Gharbi',
    projectTitle: 'Application Mobile de Fitness',
    description: 'Application mobile cross-platform pour le suivi d\'activités sportives. Fonctionnalités : tracking GPS, plans d\'entraînement personnalisés, synchronisation cloud, gamification. Technologies : Flutter, Firebase, intégration Google Fit et Apple HealthKit.',
    status: 'accepted',
    date: new Date('2025-10-19T15:45:00').toISOString()
  },
  {
    studentId: 'student006',
    studentName: 'Ines Hamdi',
    professorId: 'prof006',
    professorName: 'Dr. Leila Mansouri',
    projectTitle: 'Plateforme de Vote Électronique Blockchain',
    description: 'Système de vote électronique sécurisé utilisant la technologie blockchain. Garantir la transparence, l\'anonymat et l\'immuabilité des votes. Technologies : Ethereum, Solidity, Web3.js, React.',
    status: 'pending',
    date: new Date('2025-10-21T08:30:00').toISOString()
  },
  {
    studentId: 'student007',
    studentName: 'Malek Sassi',
    professorId: 'prof007',
    professorName: 'Dr. Hichem Zarrouk',
    projectTitle: 'Infrastructure Cloud pour Startup',
    description: 'Conception et déploiement d\'une infrastructure cloud scalable pour une startup. Architecture microservices, conteneurisation Docker, orchestration Kubernetes, CI/CD automatisé. Cloud provider : AWS ou Google Cloud.',
    status: 'accepted',
    date: new Date('2025-10-17T13:00:00').toISOString()
  },
  {
    studentId: 'student008',
    studentName: 'Rim Abidi',
    professorId: 'prof003',
    professorName: 'Dr. Ahmed Trabelsi',
    projectTitle: 'API RESTful pour Application Mobile',
    description: 'Développement d\'une API RESTful robuste et sécurisée pour une application mobile. Authentification JWT, rate limiting, documentation Swagger. Technologies : Node.js, Express, PostgreSQL, Redis pour le caching.',
    status: 'pending',
    date: new Date('2025-10-23T09:15:00').toISOString()
  },
  {
    studentId: 'student009',
    studentName: 'Omar Bouzid',
    professorId: 'prof002',
    professorName: 'Dr. Fatma Ben Ahmed',
    projectTitle: 'Système de Détection de Fraude',
    description: 'Système intelligent de détection de transactions frauduleuses en temps réel. Utilisation d\'algorithmes de machine learning supervisés et non supervisés. Technologies : Python, Scikit-learn, Apache Kafka pour le streaming.',
    status: 'rejected',
    date: new Date('2025-10-16T14:30:00').toISOString()
  },
  {
    studentId: 'student010',
    studentName: 'Amira Jebali',
    professorId: 'prof005',
    professorName: 'Dr. Karim Gharbi',
    projectTitle: 'Application de Réalité Augmentée',
    description: 'Application mobile utilisant la réalité augmentée pour l\'éducation. Visualisation 3D d\'objets, interactions immersives. Technologies : Unity, ARCore/ARKit, C#, modélisation 3D avec Blender.',
    status: 'pending',
    date: new Date('2025-10-24T10:45:00').toISOString()
  }
];

/**
 * Fonction principale de seeding
 */
async function seedDatabase() {
  try {
    console.log('🌱 Début du seeding de la base de données Firestore...\n');

    // Ajouter les professeurs
    console.log('📚 Ajout des professeurs dans la collection "professors"...');
    let profCount = 0;
    for (const prof of professors) {
      await setDoc(doc(db, 'professors', prof.id), prof);
      profCount++;
      console.log(`   ✅ ${profCount}/${professors.length} - ${prof.Fullname} (${prof.specialization})`);
    }
    console.log(`\n✨ ${profCount} professeurs ajoutés avec succès !\n`);

    // Ajouter les demandes
    console.log('📝 Ajout des demandes dans la collection "requests"...');
    let reqCount = 0;
    for (const request of requests) {
      await addDoc(collection(db, 'requests'), request);
      reqCount++;
      console.log(`   ✅ ${reqCount}/${requests.length} - ${request.projectTitle} (${request.status})`);
    }
    console.log(`\n✨ ${reqCount} demandes ajoutées avec succès !\n`);

    // Résumé
    console.log('═══════════════════════════════════════════════════════');
    console.log('🎉 SEEDING TERMINÉ AVEC SUCCÈS !');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`📊 Résumé :`);
    console.log(`   • Professeurs : ${profCount}`);
    console.log(`   • Demandes : ${reqCount}`);
    console.log(`   • Statut des demandes :`);
    console.log(`     - En attente : ${requests.filter(r => r.status === 'pending').length}`);
    console.log(`     - Acceptées : ${requests.filter(r => r.status === 'accepted').length}`);
    console.log(`     - Rejetées : ${requests.filter(r => r.status === 'rejected').length}`);
    console.log('═══════════════════════════════════════════════════════\n');
    
    console.log('🚀 Vous pouvez maintenant utiliser votre application !');
    console.log('💡 Conseil : Créez des comptes utilisateurs via l\'application pour tester complètement.\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERREUR lors du seeding:', error);
    console.error('💡 Vérifiez votre configuration Firebase et vos règles Firestore.\n');
    process.exit(1);
  }
}

// Exécuter le seeding
console.log('\n╔═══════════════════════════════════════════════════════╗');
console.log('║         SEEDING FIRESTORE - ENCADRINI                 ║');
console.log('╚═══════════════════════════════════════════════════════╝\n');

seedDatabase();