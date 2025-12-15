import { useState } from 'react';
import { User, Booking, Caretaker, ActivityReport, Activity, Meal } from '../App';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Building2, LogOut, Calendar, Users, TrendingUp } from 'lucide-react';
import { HotelBookingList } from './HotelBookingList';
import { CaretakersList } from './CaretakersList';

interface HotelDashboardProps {
  user: User;
  onLogout: () => void;
}

// Mock data para o hotel
const MOCK_HOTEL_DATA = {
  capacity: 20,
  currentOccupancy: 3,
  bookings: [
    {
      id: 'hb1',
      petId: 'pet1',
      hotelId: 'hotel1',
      ownerId: 'owner1',
      ownerName: 'João Silva',
      petName: 'Max',
      checkIn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active' as const,
      specialRequests: 'Gostaria de receber fotos diárias. Medicação às 18h.',
      caretakerId: 'c1',
    },
    {
      id: 'hb2',
      petId: 'pet2',
      hotelId: 'hotel1',
      ownerId: 'owner2',
      ownerName: 'Maria Santos',
      petName: 'Bella',
      checkIn: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active' as const,
      specialRequests: 'Dieta especial para problemas digestivos',
      caretakerId: 'c3',
    },
    {
      id: 'hb3',
      petId: 'pet3',
      hotelId: 'hotel1',
      ownerId: 'owner3',
      ownerName: 'Carlos Oliveira',
      petName: 'Mimi',
      checkIn: new Date(Date.now()).toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active' as const,
      caretakerId: 'c2',
    },
    {
      id: 'hb4',
      petId: 'pet4',
      hotelId: 'hotel1',
      ownerId: 'owner4',
      ownerName: 'Ana Costa',
      petName: 'Rex',
      checkIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pending' as const,
      specialRequests: 'Primeira vez em hotel, pode ser tímido inicialmente',
    },
    {
      id: 'hb5',
      petId: 'pet5',
      hotelId: 'hotel1',
      ownerId: 'owner5',
      ownerName: 'Pedro Almeida',
      petName: 'Luna',
      checkIn: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      checkOut: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'completed' as const,
      caretakerId: 'c2',
    },
  ] as Booking[],
  caretakers: [
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
  ] as Caretaker[],
  activityReports: [
    {
      id: 'r1',
      bookingId: 'hb1',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      activities: [
        { time: '09:00', description: 'Passeio matinal no parque', type: 'walk' as const },
        { time: '11:30', description: 'Brincadeira com bola de ténis', type: 'play' as const },
        { time: '14:00', description: 'Descanso na área coberta', type: 'rest' as const },
        { time: '17:00', description: 'Passeio vespertino', type: 'walk' as const },
        { time: '19:30', description: 'Socialização com outros cães', type: 'play' as const },
      ],
      meals: [
        { time: '08:00', description: 'Ração premium 250g', eaten: true },
        { time: '18:00', description: 'Ração premium 250g + medicação', eaten: true },
      ],
      notes: 'Max está muito animado e socializa bem com outros cães. Medicação administrada às 18h conforme solicitado.',
    },
    {
      id: 'r2',
      bookingId: 'hb1',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      activities: [
        { time: '09:30', description: 'Passeio matinal', type: 'walk' as const },
        { time: '12:00', description: 'Brincadeira no jardim', type: 'play' as const },
        { time: '15:00', description: 'Descanso', type: 'rest' as const },
        { time: '17:30', description: 'Passeio vespertino', type: 'walk' as const },
      ],
      meals: [
        { time: '08:00', description: 'Ração premium 250g', eaten: true },
        { time: '18:00', description: 'Ração premium 250g + medicação', eaten: true },
      ],
      notes: 'Primeiro dia de Max correu muito bem. Adaptou-se rapidamente ao ambiente.',
    },
    {
      id: 'r3',
      bookingId: 'hb2',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      activities: [
        { time: '10:00', description: 'Passeio calmo', type: 'walk' as const },
        { time: '14:30', description: 'Descanso prolongado', type: 'rest' as const },
        { time: '18:00', description: 'Passeio breve', type: 'walk' as const },
      ],
      meals: [
        { time: '08:00', description: 'Ração especial digestiva 200g', eaten: true },
        { time: '17:00', description: 'Ração especial digestiva 200g', eaten: true },
      ],
      notes: 'Bella está a adaptar-se bem à dieta especial. Sem sinais de desconforto digestivo.',
    },
  ] as ActivityReport[],
};

export function HotelDashboard({ user, onLogout }: HotelDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState(MOCK_HOTEL_DATA.bookings);
  const [caretakers, setCaretakers] = useState(MOCK_HOTEL_DATA.caretakers);
  const [reports, setReports] = useState(MOCK_HOTEL_DATA.activityReports);

  const activeBookings = bookings.filter((b) => b.status === 'active');
  const pendingBookings = bookings.filter((b) => b.status === 'pending');

  const occupancyPercentage = Math.round(
    (MOCK_HOTEL_DATA.currentOccupancy / MOCK_HOTEL_DATA.capacity) * 100
  );

  const handleAddCaretaker = (caretaker: Omit<Caretaker, 'id' | 'hotelId'>) => {
    const newCaretaker: Caretaker = {
      ...caretaker,
      id: Math.random().toString(36).substr(2, 9),
      hotelId: user.id,
    };
    setCaretakers([...caretakers, newCaretaker]);
  };

  const handleCreateReport = (
    bookingId: string,
    activities: Activity[],
    meals: Meal[],
    notes: string
  ) => {
    const newReport: ActivityReport = {
      id: Math.random().toString(36).substr(2, 9),
      bookingId,
      date: new Date().toISOString().split('T')[0],
      activities,
      meals,
      notes,
    };
    setReports([...reports, newReport]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">Fur & Friends Inn</h1>
                <p className="text-sm text-gray-500">{user.name} - Painel do Hotel</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">
              <TrendingUp className="w-4 h-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Calendar className="w-4 h-4 mr-2" />
              Reservas
            </TabsTrigger>
            <TabsTrigger value="caretakers">
              <Users className="w-4 h-4 mr-2" />
              Cuidadores
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Occupancy Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Lotação Atual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-end gap-2">
                      <span className="text-3xl text-gray-900">
                        {MOCK_HOTEL_DATA.currentOccupancy}
                      </span>
                      <span className="text-gray-500 pb-1">/ {MOCK_HOTEL_DATA.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${occupancyPercentage}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-500">{occupancyPercentage}% ocupado</p>
                  </div>
                </CardContent>
              </Card>

              {/* Active Bookings Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Reservas Ativas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-3xl text-gray-900">{activeBookings.length}</p>
                    <p className="text-sm text-gray-500">Animais atualmente hospedados</p>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Bookings Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Reservas Pendentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-3xl text-gray-900">{pendingBookings.length}</p>
                    <p className="text-sm text-gray-500">Aguardando check-in</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-gray-900 mb-4">Reservas Ativas Recentes</h2>
              <HotelBookingList
                bookings={activeBookings.slice(0, 3)}
                caretakers={caretakers}
                reports={reports}
                onCreateReport={handleCreateReport}
              />
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="mt-6">
            <div className="mb-6">
              <h2 className="text-gray-900">Todas as Reservas</h2>
              <p className="text-sm text-gray-500">Gerencie as reservas do hotel</p>
            </div>
            <HotelBookingList
              bookings={bookings}
              caretakers={caretakers}
              reports={reports}
              onCreateReport={handleCreateReport}
            />
          </TabsContent>

          {/* Caretakers Tab */}
          <TabsContent value="caretakers" className="mt-6">
            <div className="mb-6">
              <h2 className="text-gray-900">Cuidadores</h2>
              <p className="text-sm text-gray-500">Gerencie a equipe de cuidadores</p>
            </div>
            <CaretakersList
              caretakers={caretakers}
              onAddCaretaker={handleAddCaretaker}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
