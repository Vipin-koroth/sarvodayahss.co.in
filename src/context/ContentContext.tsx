import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Teacher {
  id: string;
  name: string;
  designation: string;
  subjects: string[];
  experience: string;
  education: string;
  image: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: string;
  isUpcoming: boolean;
}

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  title: string;
  category: string;
}

interface ContentContextType {
  content: {
    // Homepage Content
    welcomeMessage: string;
    missionStatement: string;
    visionStatement: string;
    logoImage: string;
    heroImage: string;
    featuredImages: string[];
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    quickStatsTitle: string;
    exploreSectionTitle: string;
    welcomeSectionTitle: string;
    transitionSettings: {
      heroTransition: string;
      cardTransitions: boolean;
      fadeInDuration: number;
    };
    schoolStats: {
      yearsOfExcellence: number;
      totalStudents: number;
      qualifiedTeachers: number;
      annualEvents: number;
    };
    
    // About Page Content
    aboutPage: {
      pageTitle: string;
      pageSubtitle: string;
      heroImage: string;
      historyTitle: string;
      historyContent: string[];
      historyImage: string;
      establishedYear: number;
      currentStudents: number;
      jesuitTitle: string;
      jesuitContent: string[];
      jesuitImage: string;
      vision: string;
      mission: string;
      coreValues: Array<{
        title: string;
        description: string;
        icon: string;
      }>;
      coreValuesTitle: string;
      coreValuesSubtitle: string;
    };
    
    // Academics Page Content
    academicsPage: {
      pageTitle: string;
      pageSubtitle: string;
      heroImage: string;
      primarySectionTitle: string;
      higherSecondaryTitle: string;
      facilitiesTitle: string;
      excellenceTitle: string;
      excellenceDescription: string;
      primaryClasses: Array<{
        range: string;
        description: string;
      }>;
      higherSecondaryStreams: Array<{
        name: string;
        subjects: string[];
        description: string;
        color: string;
      }>;
      facilities: Array<{
        name: string;
        description: string;
        icon: string;
      }>;
      academicStats: {
        passRate: number;
        higherEducationRate: number;
        annualAwards: number;
      };
    };
    
    // Teachers Page Content
    teachersPage: {
      pageTitle: string;
      pageSubtitle: string;
      heroImage: string;
      departmentsTitle: string;
    };
    
    // Events Page Content
    eventsPage: {
      pageTitle: string;
      pageSubtitle: string;
      heroImage: string;
      callToActionTitle: string;
      callToActionDescription: string;
    };
    
    // Gallery Page Content
    galleryPage: {
      pageTitle: string;
      pageSubtitle: string;
      heroImage: string;
      statsTitle: string;
    };
    
    // Teachers and Events Data
    teachers: Teacher[];
    events: Event[];
    galleryItems: GalleryItem[];
    
    // Contact Page Content
    contactPage: {
      pageTitle: string;
      pageSubtitle: string;
      heroImage: string;
      contactInfoTitle: string;
      contactFormTitle: string;
      locationTitle: string;
      address: {
        line1: string;
        line2: string;
        line3: string;
        pincode: string;
      };
      phones: string[];
      emails: string[];
      officeHours: {
        weekdays: string;
        saturday: string;
        sunday: string;
      };
    };
  };
  updateContent: (newContent: Partial<ContentContextType['content']>) => void;
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
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
    // Homepage Content
    welcomeMessage: `At Sarvodaya Higher Secondary School, we believe in the transformative power of education. 
      Under the guidance of the Kerala Jesuit Fathers, we have been nurturing young minds for 
      over five decades, providing not just academic excellence but also character formation 
      and spiritual growth. Our commitment to the Jesuit tradition of "men and women for others" 
      shapes every aspect of our educational approach.`,
    logoImage: '/Sravodaya_Small.png',
    missionStatement: `To provide quality education rooted in Jesuit values, fostering intellectual, 
      moral, and spiritual development of students while preparing them to be 
      responsible citizens and leaders of tomorrow.`,
    visionStatement: `To be a center of educational excellence that nurtures holistic development, 
      promotes social justice, and empowers students to transform society through 
      knowledge, compassion, and service.`,
    heroImage: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200',
    heroTitle: 'Sarvodaya Higher Secondary School',
    heroSubtitle: 'Eachome, Wayanad District, Kerala',
    heroDescription: 'A Kerala Government Aided Institution managed by the Kerala Jesuit Fathers, dedicated to providing excellence in education and nurturing young minds since 1975.',
    quickStatsTitle: 'Our Achievements',
    exploreSectionTitle: 'Explore Our School',
    welcomeSectionTitle: 'Welcome to Sarvodaya Family',
    featuredImages: [
      'https://images.pexels.com/photos/8926991/pexels-photo-8926991.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    transitionSettings: {
      heroTransition: 'fade',
      cardTransitions: true,
      fadeInDuration: 800
    },
    schoolStats: {
      yearsOfExcellence: 50,
      totalStudents: 1200,
      qualifiedTeachers: 45,
      annualEvents: 100
    },
    
    // About Page Content
    aboutPage: {
      pageTitle: 'About Us',
      pageSubtitle: 'Discover the rich history and values that make Sarvodaya Higher Secondary School a beacon of educational excellence in Wayanad.',
      heroImage: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200',
      historyTitle: 'Our History',
      historyContent: [
        'Established in 1975, Sarvodaya Higher Secondary School has been a cornerstone of quality education in the scenic district of Wayanad. The school was founded with the vision of providing accessible, high-quality education to the rural communities of Kerala.',
        'From humble beginnings with just 50 students, we have grown to become one of the most respected educational institutions in the region, serving over 1200 students from diverse backgrounds.',
        'Our journey has been marked by consistent academic excellence, innovative teaching methodologies, and a commitment to holistic development that extends beyond textbooks to character formation and spiritual growth.'
      ],
      historyImage: 'https://images.pexels.com/photos/8926991/pexels-photo-8926991.jpeg?auto=compress&cs=tinysrgb&w=800',
      establishedYear: 1975,
      currentStudents: 1200,
      jesuitTitle: 'Jesuit Management',
      jesuitContent: [
        'The school is proudly managed by the Kerala Jesuit Fathers, who bring centuries of educational excellence and spiritual guidance to our institution. The Society of Jesus has been at the forefront of education worldwide, known for their commitment to academic rigor and character formation.',
        'Under Jesuit guidance, our school follows the motto "Ad Majorem Dei Gloriam" (For the Greater Glory of God), ensuring that every student receives not just academic knowledge but also moral and spiritual development.'
      ],
      jesuitImage: 'https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=800',
      vision: 'To be a premier educational institution that transforms lives through excellence in academics, character formation, and spiritual development, creating compassionate leaders who serve society with integrity and wisdom.',
      mission: 'To provide holistic education that integrates academic excellence with moral values, preparing students to be responsible citizens who contribute meaningfully to society while staying rooted in their cultural heritage.',
      coreValuesTitle: 'Our Core Values',
      coreValuesSubtitle: 'The values that guide everything we do at Sarvodaya',
      coreValues: [
        {
          title: 'Academic Excellence',
          description: 'Commitment to highest standards of teaching and learning',
          icon: 'BookOpen'
        },
        {
          title: 'Compassion',
          description: 'Caring for each student\'s individual needs and growth',
          icon: 'Heart'
        },
        {
          title: 'Service',
          description: 'Developing leaders who serve others and transform society',
          icon: 'Users'
        }
      ]
    },
    
    // Academics Page Content
    academicsPage: {
      pageTitle: 'Academic Programs',
      pageSubtitle: 'Comprehensive education from foundation to higher secondary levels, preparing students for success in academics and life.',
      heroImage: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200',
      primarySectionTitle: 'Primary & Secondary Education',
      higherSecondaryTitle: 'Higher Secondary Education (Classes 11 & 12)',
      facilitiesTitle: 'Academic Facilities',
      excellenceTitle: 'Academic Excellence',
      excellenceDescription: 'Our students consistently achieve outstanding results in board examinations, with many securing admissions to prestigious universities and professional courses.',
      primaryClasses: [
        { range: "Class 1-5", description: "Foundation years focusing on basic literacy, numeracy, and life skills" },
        { range: "Class 6-8", description: "Middle school curriculum with introduction to specialized subjects" },
        { range: "Class 9-10", description: "Secondary education preparing for board examinations" }
      ],
      higherSecondaryStreams: [
        {
          name: "Science Stream",
          subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Malayalam"],
          description: "Comprehensive science education preparing students for medical and engineering careers",
          color: "blue"
        },
        {
          name: "Humanities Stream",
          subjects: ["History", "Political Science", "Economics", "Geography", "English", "Malayalam"],
          description: "Liberal arts education fostering critical thinking and social awareness",
          color: "emerald"
        }
      ],
      facilities: [
        { name: "Science Laboratory", description: "Well-equipped labs for Physics, Chemistry, and Biology", icon: "Microscope" },
        { name: "Computer Lab", description: "Modern computer facilities with internet connectivity", icon: "Calculator" },
        { name: "Library", description: "Extensive collection of books and digital resources", icon: "BookOpen" },
        { name: "Art Studio", description: "Creative space for artistic expression and learning", icon: "Palette" },
        { name: "Music Room", description: "Dedicated space for music lessons and cultural activities", icon: "Music" },
        { name: "Sports Ground", description: "Athletic facilities for physical education and sports", icon: "Globe" }
      ],
      academicStats: {
        passRate: 95,
        higherEducationRate: 80,
        annualAwards: 50
      }
    },
    
    // Teachers Page Content
    teachersPage: {
      pageTitle: 'Our Faculty',
      pageSubtitle: 'Meet our dedicated team of qualified educators who are committed to nurturing young minds and fostering academic excellence.',
      heroImage: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200',
      departmentsTitle: 'Our Departments',
    },
    
    // Events Page Content
    eventsPage: {
      pageTitle: 'Events & Activities',
      pageSubtitle: 'Stay updated with our school events, cultural programs, and academic activities throughout the year.',
      heroImage: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200',
      callToActionTitle: 'Stay Connected',
      callToActionDescription: 'Don\'t miss out on important school events and announcements.',
    },
    
    // Gallery Page Content
    galleryPage: {
      pageTitle: 'Photo & Video Gallery',
      pageSubtitle: 'Explore moments from our school life, events, and academic activities through our comprehensive gallery.',
      heroImage: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200',
      statsTitle: 'Gallery Statistics',
    },
    
    // Teachers Data
    teachers: [
      {
        id: '1',
        name: "Rev. Fr. Thomas Abraham",
        designation: "Principal",
        subjects: ["Administration", "Moral Science"],
        experience: "25 years",
        education: "M.A. Education, B.Ed.",
        image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: '2',
        name: "Mrs. Priya Nair",
        designation: "Vice Principal",
        subjects: ["Mathematics", "Statistics"],
        experience: "20 years",
        education: "M.Sc. Mathematics, B.Ed.",
        image: "https://images.pexels.com/photos/3823495/pexels-photo-3823495.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: '3',
        name: "Mr. Rajesh Kumar",
        designation: "Head of Science Department",
        subjects: ["Physics", "Computer Science"],
        experience: "18 years",
        education: "M.Sc. Physics, B.Ed.",
        image: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    ],
    
    // Events Data
    events: [
      {
        id: '1',
        title: "Annual Science Exhibition",
        date: "March 15, 2025",
        time: "10:00 AM - 4:00 PM",
        location: "School Auditorium",
        description: "Students showcase their innovative science projects and experiments.",
        image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Academic",
        isUpcoming: true
      },
      {
        id: '2',
        title: "Sports Day Celebrations",
        date: "March 28, 2025",
        time: "8:00 AM - 5:00 PM",
        location: "School Sports Ground",
        description: "Annual athletic meet with various sports competitions and cultural programs.",
        image: "https://images.pexels.com/photos/159581/rugby-sports-game-ball-159581.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "Sports",
        isUpcoming: true
      }
    ],
    
    // Gallery Data
    galleryItems: [
      {
        id: '1',
        type: 'image' as const,
        src: 'https://images.pexels.com/photos/8926991/pexels-photo-8926991.jpeg?auto=compress&cs=tinysrgb&w=800',
        thumbnail: 'https://images.pexels.com/photos/8926991/pexels-photo-8926991.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Independence Day Celebration',
        category: 'events'
      },
      {
        id: '2',
        type: 'image' as const,
        src: 'https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=800',
        thumbnail: 'https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=400',
        title: 'Science Exhibition',
        category: 'academic'
      }
    ],
    
    // Contact Page Content
    contactPage: {
      pageTitle: 'Contact Us',
      pageSubtitle: 'We\'d love to hear from you. Get in touch with us for admissions, inquiries, or any questions about our school.',
      heroImage: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200',
      contactInfoTitle: 'Get in Touch',
      contactFormTitle: 'Send us a Message',
      locationTitle: 'Location',
      address: {
        line1: 'Sarvodaya Higher Secondary School',
        line2: 'Eachome, Wayanad District',
        line3: 'Kerala, India',
        pincode: '673592'
      },
      phones: ['+91 493 622 3456', '+91 493 622 3457'],
      emails: ['info@sarvodayahss.edu.in', 'principal@sarvodayahss.edu.in'],
      officeHours: {
        weekdays: 'Monday - Friday: 8:00 AM - 4:00 PM',
        saturday: 'Saturday: 8:00 AM - 12:00 PM',
        sunday: 'Sunday: Closed'
      }
    }
  });

  const updateContent = (newContent: Partial<ContentContextType['content']>) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newTeacher = { ...teacher, id: Date.now().toString() };
    setContent(prev => ({
      ...prev,
      teachers: [...prev.teachers, newTeacher]
    }));
  };

  const updateTeacher = (id: string, updatedTeacher: Partial<Teacher>) => {
    setContent(prev => ({
      ...prev,
      teachers: prev.teachers.map(teacher => 
        teacher.id === id ? { ...teacher, ...updatedTeacher } : teacher
      )
    }));
  };

  const deleteTeacher = (id: string) => {
    setContent(prev => ({
      ...prev,
      teachers: prev.teachers.filter(teacher => teacher.id !== id)
    }));
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setContent(prev => ({
      ...prev,
      events: [...prev.events, newEvent]
    }));
  };

  const updateEvent = (id: string, updatedEvent: Partial<Event>) => {
    setContent(prev => ({
      ...prev,
      events: prev.events.map(event => 
        event.id === id ? { ...event, ...updatedEvent } : event
      )
    }));
  };

  const deleteEvent = (id: string) => {
    setContent(prev => ({
      ...prev,
      events: prev.events.filter(event => event.id !== id)
    }));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setContent(prev => ({
      ...prev,
      galleryItems: [...prev.galleryItems, newItem]
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setContent(prev => ({
      ...prev,
      galleryItems: prev.galleryItems.filter(item => item.id !== id)
    }));
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      addTeacher, 
      updateTeacher, 
      deleteTeacher,
      addEvent,
      updateEvent,
      deleteEvent,
      addGalleryItem,
      deleteGalleryItem
    }}>
      {children}
    </ContentContext.Provider>
  );
};