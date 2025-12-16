import { useState } from 'react';
import { Login } from './components/Login';
import { OwnerDashboard } from './components/OwnerDashboard';
import { HotelDashboard } from './components/HotelDashboard';

export type UserType = 'owner' | 'hotel' | null;

export interface User {
  id: string;
  type: UserType;
  name: string;
  email: string;
  isNewUser?: boolean; // Flag para indicar se é conta nova
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  specialNeeds?: string;
  photo?: string;
}

export interface Hotel {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  description: string;
  rating: number;
  capacity?: number; // Capacidade total de animais
  currentOccupancy?: number; // Número atual de animais hospedados
  capacity?: number; // Capacidade total de animais
  currentOccupancy?: number; // Número atual de animais hospedados
}

export interface Booking {
  id: string;
  petId: string;
  hotelId: string;
  ownerId: string;
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  specialRequests?: string;
  paymentMethod?: 'mbway' | 'reference' | 'multibanco' | 'visa' | 'mastercard';
  paymentDetails?: string;
  caretakerId?: string; // ID do cuidador responsável
  ownerName?: string; // Nome do dono
  petName?: string; // Nome do pet
  caretakerId?: string; // ID do cuidador responsável
  ownerName?: string; // Nome do dono
  petName?: string; // Nome do pet
}

export interface ActivityReport {
  id: string;
  bookingId: string;
  date: string;
  activities: Activity[];
  meals: Meal[];
  notes: string;
}

export interface Activity {
  time: string;
  description: string;
  type: 'walk' | 'play' | 'rest' | 'training' | 'other';
}

export interface Meal {
  time: string;
  description: string;
  eaten: boolean;
}

export interface Review {
  id: string;
  bookingId: string;
  ownerId: string;
  hotelId: string;
  rating: number;
  comment: string;
  date: string;
  ownerName: string;
}

export interface Caretaker {
  id: string;
  hotelId: string;
  name: string;
  phone: string;
  email: string;
  specialization?: string;
}

// Mock data para usuários existentes (login)
export const MOCK_EXISTING_USER_DATA = {
  pets: [
    {
      id: 'pet1',
      ownerId: 'existing-user',
      name: 'Max',
      species: 'Cão',
      breed: 'Golden Retriever',
      age: 3,
      weight: 30,
      specialNeeds: 'Precisa de medicação às 18h',
      photo: 'https://images.unsplash.com/photo-1719292606971-0916fc62f5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBoYXBweXxlbnwxfHx8fDE3NjM0MzY2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'pet2',
      ownerId: 'existing-user',
      name: 'Luna',
      species: 'Gato',
      breed: 'Siamês',
      age: 2,
      weight: 4,
      photo: 'https://images.unsplash.com/photo-1719305406153-b0d36aa305ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJieSUyMGNhdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzQyMjcxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ] as Pet[],
  bookings: [
    {
      id: 'booking1',
      petId: 'pet1',
      hotelId: 'h1',
      ownerId: 'existing-user',
      checkIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 dias no futuro
      checkOut: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 dias no futuro
      status: 'pending' as const,
      specialRequests: 'Favor dar medicação às 18h todos os dias',
      paymentMethod: 'mbway' as const,
      paymentDetails: '912345678',
    },
    {
      id: 'booking2',
      petId: 'pet2',
      hotelId: 'h2',
      ownerId: 'existing-user',
      checkIn: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 21 dias no futuro
      checkOut: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 28 dias no futuro
      status: 'pending' as const,
      paymentMethod: 'visa' as const,
    },
    {
      id: 'booking3',
      petId: 'pet1',
      hotelId: 'h1',
      ownerId: 'existing-user',
      checkIn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 dias atrás
      checkOut: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 dias no futuro
      status: 'active' as const,
      specialRequests: 'Gostaria de receber fotos diárias',
      paymentMethod: 'multibanco' as const,
    },
    {
      id: 'booking4',
      petId: 'pet2',
      hotelId: 'h1',
      ownerId: 'existing-user',
      checkIn: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 dias atrás
      checkOut: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 dias atrás
      status: 'completed' as const,
      paymentMethod: 'mbway' as const,
    },
  ] as Booking[],
};

// Mock reviews de outros donos
export const MOCK_REVIEWS: Review[] = [
  {
    id: 'review1',
    bookingId: 'other-booking-1',
    ownerId: 'other-owner-1',
    hotelId: 'h1',
    rating: 5,
    comment: 'Excelente hotel! Meu cão adorou a estadia. A equipe é muito atenciosa e enviam fotos todos os dias. Recomendo!',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    ownerName: 'Maria Silva',
  },
  {
    id: 'review2',
    bookingId: 'other-booking-2',
    ownerId: 'other-owner-2',
    hotelId: 'h1',
    rating: 4,
    comment: 'Muito bom! Instalações limpas e espaçosas. Minha gata voltou bem cuidada.',
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    ownerName: 'João Santos',
  },
  {
    id: 'review3',
    bookingId: 'other-booking-3',
    ownerId: 'other-owner-3',
    hotelId: 'h1',
    rating: 5,
    comment: 'Melhor hotel de animais que já conheci! Profissionais dedicados e o meu cão sempre volta feliz.',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    ownerName: 'Ana Costa',
  },
  {
    id: 'review4',
    bookingId: 'other-booking-4',
    ownerId: 'other-owner-4',
    hotelId: 'h2',
    rating: 5,
    comment: 'Ambiente familiar e acolhedor. A área verde é fantástica para os cães brincarem!',
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    ownerName: 'Pedro Almeida',
  },
  {
    id: 'review5',
    bookingId: 'other-booking-5',
    ownerId: 'other-owner-5',
    hotelId: 'h2',
    rating: 4,
    comment: 'Ótimo atendimento e cuidado com os animais. Voltarei com certeza!',
    date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    ownerName: 'Carla Oliveira',
  },
  {
    id: 'review6',
    bookingId: 'other-booking-6',
    ownerId: 'other-owner-6',
    hotelId: 'h3',
    rating: 5,
    comment: 'Especialistas em cães grandes! Meu pastor alemão foi muito bem tratado.',
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    ownerName: 'Ricardo Fernandes',
  },
  {
    id: 'review7',
    bookingId: 'other-booking-7',
    ownerId: 'other-owner-7',
    hotelId: 'h4',
    rating: 5,
    comment: 'Serviço personalizado e de excelência. Vale cada euro!',
    date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    ownerName: 'Sofia Martins',
  },
];

// Mock caretakers para hotéis
export const MOCK_CARETAKERS: Caretaker[] = [
  {
    id: 'c1',
    hotelId: 'hotel1',
    name: 'Carlos Mendes',
    phone: '+351 912 345 678',
    email: 'carlos@hotel.com',
    specialization: 'Cães de grande porte',
  },
  {
    id: 'c2',
    hotelId: 'hotel1',
    name: 'Teresa Santos',
    phone: '+351 913 456 789',
    email: 'teresa@hotel.com',
    specialization: 'Gatos',
  },
  {
    id: 'c3',
    hotelId: 'hotel1',
    name: 'Miguel Oliveira',
    phone: '+351 914 567 890',
    email: 'miguel@hotel.com',
    specialization: 'Animais com necessidades especiais',
  },
];

// Mock activity reports
export const MOCK_ACTIVITY_REPORTS: ActivityReport[] = [
  {
    id: 'r1',
    bookingId: 'booking3',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    activities: [
      { time: '09:00', description: 'Passeio matinal no parque', type: 'walk' },
      { time: '11:30', description: 'Brincadeira com bola de ténis', type: 'play' },
      { time: '14:00', description: 'Descanso na área coberta', type: 'rest' },
      { time: '17:00', description: 'Passeio vespertino', type: 'walk' },
      { time: '19:30', description: 'Socialização com outros cães', type: 'play' },
    ],
    meals: [
      { time: '08:00', description: 'Ração premium 250g', eaten: true },
      { time: '18:00', description: 'Ração premium 250g + medicação', eaten: true },
    ],
    notes: 'Max está muito animado e socializa bem com outros cães. Medicação administrada às 18h conforme solicitado.',
  },
  {
    id: 'r2',
    bookingId: 'booking3',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    activities: [
      { time: '09:30', description: 'Passeio matinal', type: 'walk' },
      { time: '12:00', description: 'Brincadeira no jardim', type: 'play' },
      { time: '15:00', description: 'Descanso', type: 'rest' },
      { time: '17:30', description: 'Passeio vespertino', type: 'walk' },
    ],
    meals: [
      { time: '08:00', description: 'Ração premium 250g', eaten: true },
      { time: '18:00', description: 'Ração premium 250g + medicação', eaten: true },
    ],
    notes: 'Primeiro dia de Max correu muito bem. Adaptou-se rapidamente ao ambiente.',
  },
];

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAddReview = (review: Review) => {
    setReviews([review, ...reviews]);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  if (currentUser.type === 'owner') {
    return <OwnerDashboard user={currentUser} onLogout={handleLogout} reviews={reviews} onAddReview={handleAddReview} />;
  }

  if (currentUser.type === 'hotel') {
    return <HotelDashboard user={currentUser} onLogout={handleLogout} />;
  }

  return null;
}

export default App;