import { useState } from 'react';
import { Hotel } from '../App';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { MapPin, Star, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HotelSearchPageProps {
  hotels: Hotel[];
  onSelectHotel: (hotel: Hotel) => void;
  onBack: () => void;
}

const HOTEL_IMAGES = [
  'https://images.unsplash.com/photo-1570567136605-2932a1b44e44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBob3RlbCUyMGx1eHVyeXxlbnwxfHx8fDE3NjM0NzIxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1644416148959-6652dde98e88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjByZXNvcnQlMjBoYXBweXxlbnwxfHx8fDE3NjM1MDMxOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1672764788664-9f5844477a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBob3RlbCUyMGNvenl8ZW58MXx8fHwxNzYzNTAzMTkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1682197289255-b45c7311fcfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXRzJTIwcGxheWZ1bHxlbnwxfHx8fDE3NjM1MDMxOTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
];

export function HotelSearchPage({ hotels, onSelectHotel, onBack }: HotelSearchPageProps) {
  const [location, setLocation] = useState('');
  const [petType, setPetType] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const filteredHotels = hotels.filter((hotel) => {
    if (location && !hotel.address.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-xs">Localização</Label>
              <Input
                id="location"
                placeholder="Cidade ou região"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="petType" className="text-xs">Tipo de Pet</Label>
              <Select value={petType} onValueChange={setPetType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cachorro">Cachorro</SelectItem>
                  <SelectItem value="gato">Gato</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkIn" className="text-xs">Check-in</Label>
              <Input
                id="checkIn"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut" className="text-xs">Check-out</Label>
              <Input
                id="checkOut"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="flex items-end">
              <Button className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-gray-900">Hotéis Disponíveis</h2>
          <p className="text-sm text-gray-500">{filteredHotels.length} hotel(is) encontrado(s)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel, index) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <ImageWithFallback
                  src={HOTEL_IMAGES[index % HOTEL_IMAGES.length]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm">{hotel.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-gray-900 mb-1">{hotel.name}</h3>
                
                <div className="flex items-start gap-1 text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{hotel.address.split('-')[1]?.trim() || hotel.address}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {hotel.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-indigo-600">€16</span>
                    <span className="text-sm text-gray-500">/noite</span>
                  </div>
                  <Button onClick={() => onSelectHotel(hotel)} size="sm">
                    Reservar Agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum hotel encontrado com os filtros selecionados.</p>
          </div>
        )}

        <div className="mt-8">
          <Button variant="outline" onClick={onBack}>
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
