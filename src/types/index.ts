export interface User {
  id: string;
  name: string;
  phone: string;
  language: 'hindi' | 'english' | 'regional';
  location: {
    state: string;
    district: string;
    pincode: string;
  };
}

export interface Baby {
  id: string;
  name: string;
  dateOfBirth: Date;
  gender: 'male' | 'female';
  currentStage: 'pre-pregnancy' | 'pregnancy' | 'newborn' | 'infant' | 'toddler';
  pregnancyWeek?: number;
}

export interface HealthRecord {
  id: string;
  date: Date;
  weight: number;
  height: number;
  headCircumference?: number;
  milestones: string[];
  notes: string;
}

export interface Vaccination {
  id: string;
  name: string;
  dueDate: Date;
  completed: boolean;
  completedDate?: Date;
  location?: string;
}

export interface HealthService {
  id: string;
  name: string;
  type: 'government' | 'private';
  services: string[];
  address: string;
  phone: string;
  distance: number;
  cost: 'free' | 'paid' | 'subsidized';
  availability: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  language: string;
}

export interface NutritionPlan {
  stage: string;
  meals: {
    breakfast: FoodItem[];
    lunch: FoodItem[];
    dinner: FoodItem[];
    snacks: FoodItem[];
  };
  guidelines: string[];
}

export interface FoodItem {
  name: string;
  quantity: string;
  benefits: string;
  localName?: string;
}