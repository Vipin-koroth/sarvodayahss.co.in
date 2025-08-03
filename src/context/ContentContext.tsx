import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContentContextType {
  content: {
    welcomeMessage: string;
    missionStatement: string;
    visionStatement: string;
    schoolStats: {
      yearsOfExcellence: number;
      totalStudents: number;
      qualifiedTeachers: number;
      annualEvents: number;
    };
  };
  updateContent: (newContent: Partial<ContentContextType['content']>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [content, setContent] = useState({
    welcomeMessage: `At Sarvodaya Higher Secondary School, we believe in the transformative power of education. 
      Under the guidance of the Kerala Jesuit Fathers, we have been nurturing young minds for 
      over five decades, providing not just academic excellence but also character formation 
      and spiritual growth. Our commitment to the Jesuit tradition of "men and women for others" 
      shapes every aspect of our educational approach.`,
    missionStatement: `To provide quality education rooted in Jesuit values, fostering intellectual, 
      moral, and spiritual development of students while preparing them to be 
      responsible citizens and leaders of tomorrow.`,
    visionStatement: `To be a center of educational excellence that nurtures holistic development, 
      promotes social justice, and empowers students to transform society through 
      knowledge, compassion, and service.`,
    schoolStats: {
      yearsOfExcellence: 50,
      totalStudents: 1200,
      qualifiedTeachers: 45,
      annualEvents: 100
    }
  });

  const updateContent = (newContent: Partial<ContentContextType['content']>) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};