import { createContext, useContext, ReactNode, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { User, Baby, HealthRecord, Vaccination, ChatMessage } from '../types';

interface UserProfile {
  name: string;
  dob: string; // YYYY-MM-DD
  email?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  baby: Baby | null;
  setBaby: (baby: Baby | null) => void;
  healthRecords: HealthRecord[];
  setHealthRecords: (records: HealthRecord[]) => void;
  vaccinations: Vaccination[];
  setVaccinations: (vaccinations: Vaccination[]) => void;
  chatMessages: ChatMessage[];
  setChatMessages: (messages: ChatMessage[]) => void;
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;

  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('babycare_user', null);
  const [baby, setBaby] = useLocalStorage<Baby | null>('babycare_baby', null);
  const [healthRecords, setHealthRecords] = useLocalStorage<HealthRecord[]>('babycare_health_records', []);
  const [vaccinations, setVaccinations] = useLocalStorage<Vaccination[]>('babycare_vaccinations', []);
  const [chatMessages, setChatMessages] = useLocalStorage<ChatMessage[]>('babycare_chat', []);
  const [currentLanguage, setCurrentLanguage] = useLocalStorage<string>('babycare_language', 'english');

  // userProfile state (not using localStorage, but you can add it if you want)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Baby',
    dob: '2024-02-15',
    email: 'mom@example.com',
  });

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        baby,
        setBaby,
        healthRecords,
        setHealthRecords,
        vaccinations,
        setVaccinations,
        chatMessages,
        setChatMessages,
        currentLanguage,
        setCurrentLanguage,
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
