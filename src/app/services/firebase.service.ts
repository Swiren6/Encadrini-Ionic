import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  getDoc,
  setDoc
} from '@angular/fire/firestore';
import { 
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';
import { Professor, Request, User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  private professorsCollection = collection(this.firestore, 'professors');
  private requestsCollection = collection(this.firestore, 'requests');
  private usersCollection = collection(this.firestore, 'users');

  // ========== AUTHENTICATION ==========

  async registerUser(email: string, password: string, userData: Omit<User, 'id'>): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user: User = { id: userCredential.user.uid, ...userData };
      await setDoc(doc(this.firestore, 'users', user.id), user);
      return user;
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription:', error);
      throw new Error(error.message);
    }
  }

  async loginUser(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const userId = userCredential.user.uid;
      const userDoc = await getDoc(doc(this.firestore, 'users', userId));
      if (!userDoc.exists()) throw new Error('Utilisateur introuvable');
      return { id: userDoc.id, ...userDoc.data() } as User;
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error);
      throw new Error(error.message);
    }
  }

  async logoutUser(): Promise<void> {
    await signOut(this.auth);
  }

  getCurrentFirebaseUser(): FirebaseUser | null {
    return this.auth.currentUser;
  }

  // ========== PROFESSORS ==========

  getProfessors(): Observable<Professor[]> {
    return from(getDocs(this.professorsCollection)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Professor)))
    );
  }

  getAvailableProfessors(): Observable<Professor[]> {
    const q = query(this.professorsCollection, where('available', '==', true));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Professor)))
    );
  }

  async getProfessorById(id: string): Promise<Professor | null> {
    const professorDoc = await getDoc(doc(this.firestore, 'professors', id));
    if (!professorDoc.exists()) return null;
    return { id: professorDoc.id, ...professorDoc.data() } as Professor;
  }

  async addProfessor(professor: Omit<Professor, 'id'>): Promise<string> {
    const docRef = await addDoc(this.professorsCollection, professor);
    return docRef.id;
  }

  async updateProfessor(id: string, data: Partial<Professor>): Promise<void> {
    const professorDoc = doc(this.firestore, 'professors', id);
    await updateDoc(professorDoc, data);
  }

  async deleteProfessor(id: string): Promise<void> {
    const professorDoc = doc(this.firestore, 'professors', id);
    await deleteDoc(professorDoc);
  }

  // ========== REQUESTS ==========

  getRequests(): Observable<Request[]> {
    const q = query(this.requestsCollection, orderBy('date', 'desc'));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Request)))
    );
  }

  getStudentRequests(studentId: string): Observable<Request[]> {
    const q = query(this.requestsCollection, where('studentId', '==', studentId), orderBy('date', 'desc'));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Request)))
    );
  }

  getProfessorRequests(professorId: string): Observable<Request[]> {
    const q = query(this.requestsCollection, where('professorId', '==', professorId), orderBy('date', 'desc'));
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Request)))
    );
  }

  async createRequest(request: Omit<Request, 'id'>): Promise<string> {
    const docRef = await addDoc(this.requestsCollection, { ...request, date: new Date().toISOString() });
    return docRef.id;
  }

  async updateRequest(id: string, data: Partial<Request>): Promise<void> {
    const requestDoc = doc(this.firestore, 'requests', id);
    await updateDoc(requestDoc, data);
  }

  async deleteRequest(id: string): Promise<void> {
    const requestDoc = doc(this.firestore, 'requests', id);
    await deleteDoc(requestDoc);
  }

  // ========== USERS ==========

  async getUserById(id: string): Promise<User | null> {
    const userDoc = await getDoc(doc(this.firestore, 'users', id));
    if (!userDoc.exists()) return null;
    return { id: userDoc.id, ...userDoc.data() } as User;
  }

  async updateUser(id: string, data: Partial<User>): Promise<void> {
    const userDoc = doc(this.firestore, 'users', id);
    await updateDoc(userDoc, data);
  }
}