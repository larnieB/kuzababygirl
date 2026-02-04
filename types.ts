
export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  phone: string;
  isLoggedIn: boolean;
}

export interface MCQQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'Empowerment' | 'Professional' | 'Social';
  isUnlocked: boolean;
  unlockAmount?: number;
  status: 'active' | 'completed' | 'failed';
  questions: MCQQuestion[];
}

export interface Competitor {
  rank: number;
  name: string;
  phone: string;
  wins: number;
  payout: number;
  timestamp: Date;
}

export interface EducationalTopic {
  title: string;
  content: string;
  category: 'Economic & Professional Power' | 'Social & Political Rights' | 'Personal Development & Health';
}
