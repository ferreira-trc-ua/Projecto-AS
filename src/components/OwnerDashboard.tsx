import { useState } from 'react';
import { User, Pet, Booking, Hotel, Review, MOCK_EXISTING_USER_DATA } from '../App';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PawPrint, LogOut, Plus, Calendar } from 'lucide-react';
import { PetList } from './PetList';
import { AddPetForm } from './AddPetForm';
import { BookingList } from './BookingList';
import { HotelSearchPage } from './HotelSearchPage';
import { BookingDialog } from './BookingDialog';

interface OwnerDashboardProps {
  user: User;
  onLogout: () => void;
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

// Mock hotels data - in real app, this would come from database
const MOCK_HOTELS: Hotel[] = [
  {
    id: 'h1',
    name: 'Pet Paradise Resort',
    email: 'contato@petparadise.com',
    address: 'Rua das Flores, 123 - Lisboa',
    phone: '+351 21 123 4567',
    description: 'Hotel de luxo com piscina e spa para pets',
    rating: 4.8,
    capacity: 20,
    currentOccupancy: 12,
  },
  {
    id: 'h2',
    name: 'Happy Tails Hotel',
    email: 'info@happytails.pt',
    address: 'Avenida Central, 456 - Porto',
    phone: '+351 22 987 6543',
    description: 'Ambiente familiar com grande área verde',
    rating: 4.6,
    capacity: 15,
    currentOccupancy: 8,
  },
  {
    id: 'h3',
    name: 'Paws & Claws Inn',
    email: 'reservas@pawsclaws.pt',
    address: 'Praça do Comércio, 789 - Coimbra',
    phone: '+351 23 456 7890',
    description: 'Especializado em cães de grande porte',
    rating: 4.9,
    capacity: 25,
    currentOccupancy: 18,
  },
  {
    id: 'h4',
    name: 'Pet Comfort Stay',
    email: 'hello@petcomfort.pt',
    address: 'Rua da Alegria, 321 - Faro',
    phone: '+351 28 234 5678',
    description: 'Hotel boutique com serviços personalizados',
    rating: 4.7,
    capacity: 10,
    currentOccupancy: 5,
  },
];

export function OwnerDashboard({ user, onLogout, reviews, onAddReview }: OwnerDashboardProps) {
  const [activeTab, setActiveTab] = useState('pets');
  // Inicializa com dados mock se for usuário existente (login), senão inicia vazio (registro)
  const [pets, setPets] = useState<Pet[]>(
    user.isNewUser ? [] : MOCK_EXISTING_USER_DATA.pets
  );
  const [bookings, setBookings] = useState<Booking[]>(
    user.isNewUser ? [] : MOCK_EXISTING_USER_DATA.bookings
  );
  const [showAddPet, setShowAddPet] = useState(false);
  const [showHotelSearch, setShowHotelSearch] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  const handleAddPet = (pet: Omit<Pet, 'id' | 'ownerId'>) => {
    const newPet: Pet = {
      ...pet,
      id: Math.random().toString(36).substr(2, 9),
      ownerId: user.id,
    };
    setPets([...pets, newPet]);
    setShowAddPet(false);
  };

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowHotelSearch(false);
    setShowBookingDialog(true);
  };

  const handleCreateBooking = (booking: Omit<Booking, 'id' | 'ownerId'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9),
      ownerId: user.id,
    };
    setBookings([...bookings, newBooking]);
    setShowBookingDialog(false);
    setSelectedHotel(null);
    setActiveTab('bookings');
  };

  const handleCloseBookingDialog = () => {
    setShowBookingDialog(false);
    setSelectedHotel(null);
  };

  if (showHotelSearch) {
    return (
      <HotelSearchPage
        hotels={MOCK_HOTELS}
        reviews={reviews}
        onSelectHotel={handleSelectHotel}
        onBack={() => setShowHotelSearch(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">Fur & Friends Inn</h1>
                <p className="text-sm text-gray-500">Olá, {user.name}</p>
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
            <TabsTrigger value="pets">
              <PawPrint className="w-4 h-4 mr-2" />
              Meus Pets
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Calendar className="w-4 h-4 mr-2" />
              Reservas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pets" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900">Meus Animais</h2>
                <p className="text-sm text-gray-500">Gerencie os animais cadastrados</p>
              </div>
              <Button onClick={() => setShowAddPet(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Pet
              </Button>
            </div>

            {showAddPet ? (
              <AddPetForm
                onSubmit={handleAddPet}
                onCancel={() => setShowAddPet(false)}
              />
            ) : (
              <PetList pets={pets} />
            )}
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900">Minhas Reservas</h2>
                <p className="text-sm text-gray-500">Acompanhe as estadias dos seus pets</p>
              </div>
              <Button onClick={() => setShowHotelSearch(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Reserva
              </Button>
            </div>

            <BookingList
              bookings={bookings}
              pets={pets}
              hotels={MOCK_HOTELS}
              userType="owner"
              reviews={reviews}
              onAddReview={onAddReview}
              currentUserId={user.id}
              currentUserName={user.name}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Booking Dialog */}
      {selectedHotel && (
        <BookingDialog
          isOpen={showBookingDialog}
          onClose={handleCloseBookingDialog}
          hotel={selectedHotel}
          pets={pets}
          ownerName={user.name}
          ownerEmail={user.email}
          onSubmit={handleCreateBooking}
        />
      )}
    </div>
  );
}