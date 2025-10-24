export interface User {
  id: string;
  email: string;
  Fullname: string;
  role: 'student' | 'professor';
}

export interface Professor {
  id?: string;
  Fullname: string;
  email: string;
  specialization?: string;
  available?: boolean;
  maxStudents?: number;

  remarks?: string;        
}

export interface Request {
  id: string;
  studentId: string;
  studentName: string;
  professorId?: string;
  professorName: string;
  projectTitle: string;
  description: string;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
}