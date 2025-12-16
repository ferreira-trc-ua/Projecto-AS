import { useState } from 'react';
import { Booking, Pet, Hotel, Review } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Calendar, MapPin, MessageCircle, AlertCircle, Star, FileText, Eye } from 'lucide-react';
import { ChatDialog } from './ChatDialog';
import { ReviewDialog } from './ReviewDialog';

interface BookingListProps {
  bookings: Booking[];
  pets: Pet[];
  hotels: Hotel[];
  userType: 'owner' | 'hotel';
  reviews?: Review[];
  onAddReview?: (review: Review) => void;
  currentUserId?: string;
  currentUserName?: string;
}

export function BookingList({ bookings, pets, hotels, userType, reviews = [], onAddReview, currentUserId, currentUserName }: BookingListProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [chatBooking, setChatBooking] = useState<Booking | null>(null);

  const getPetName = (petId: string) => {
    const pet = pets.find((p) => p.id === petId);
    return pet?.name || 'Pet desconhecido';
  };

  const getPetSpecies = (petId: string) => {
    const pet = pets.find((p) => p.id === petId);
    return pet?.species || '';
  };

  const getHotelName = (hotelId: string) => {
    const hotel = hotels.find((h) => h.id === hotelId);
    return hotel?.name || 'Hotel desconhecido';
  };

  const handleOpenChat = (booking: Booking) => {
    setChatBooking(booking);
    setShowChatDialog(true);
  };

  const handleSubmitReview = (rating: number, comment: string) => {
    if (selectedBooking && onAddReview && currentUserId && currentUserName) {
      const newReview: Review = {
        id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        bookingId: selectedBooking.id,
        ownerId: currentUserId,
        hotelId: selectedBooking.hotelId,
        rating,
        comment,
        date: new Date().toISOString(),
        ownerName: currentUserName,
      };
      onAddReview(newReview);
    }
    setShowReviewDialog(false);
    setSelectedBooking(null);
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'active':
        return 'Ativa';
      case 'completed':
        return 'Concluída';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhuma reserva encontrada.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>{getPetName(booking.petId)}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{getHotelName(booking.hotelId)}</p>
                </div>
                <Badge className={getStatusColor(booking.status)}>
                  {getStatusText(booking.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="text-gray-900">
                      {new Date(booking.checkIn).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="text-gray-900">
                      {new Date(booking.checkOut).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                {booking.specialRequests && (
                  <div>
                    <p className="text-sm text-gray-500">Solicitações Especiais</p>
                    <p className="text-sm text-gray-700 mt-1">{booking.specialRequests}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  {booking.status === 'active' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Ver Relatório
                      </Button>
                      {userType === 'owner' && (
                        <Button
                          size="sm"
                          onClick={() => handleOpenChat(booking)}
                          className="bg-indigo-600 hover:bg-indigo-700"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                      )}
                    </>
                  )}
                  {booking.status === 'completed' && userType === 'owner' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowReviewDialog(true);
                      }}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Avaliar Estadia
                    </Button>
                  )}
                  {userType === 'hotel' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenChat(booking)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Report Dialog */}
      {selectedBooking && !showReviewDialog && (
        <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Relatório de Atividades</DialogTitle>
              <DialogDescription>
                {getPetName(selectedBooking.petId)} - {new Date().toLocaleDateString('pt-BR')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-700 mb-2">Atividades de Hoje</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3 text-sm">
                    <span className="text-gray-500 min-w-[60px]">09:00</span>
                    <span className="text-gray-700">Passeio matinal no parque</span>
                  </div>
                  <div className="flex items-start space-x-3 text-sm">
                    <span className="text-gray-500 min-w-[60px]">11:00</span>
                    <span className="text-gray-700">Brincadeira com bola</span>
                  </div>
                  <div className="flex items-start space-x-3 text-sm">
                    <span className="text-gray-500 min-w-[60px]">14:00</span>
                    <span className="text-gray-700">Descanso</span>
                  </div>
                  <div className="flex items-start space-x-3 text-sm">
                    <span className="text-gray-500 min-w-[60px]">17:00</span>
                    <span className="text-gray-700">Passeio vespertino</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-700 mb-2">Alimentação</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3 text-sm">
                    <span className="text-gray-500 min-w-[60px]">08:00</span>
                    <span className="text-gray-700">Ração premium 200g</span>
                    <span className="text-green-600">✓ Comeu</span>
                  </div>
                  <div className="flex items-start space-x-3 text-sm">
                    <span className="text-gray-500 min-w-[60px]">18:00</span>
                    <span className="text-gray-700">Ração premium 200g</span>
                    <span className="text-green-600">✓ Comeu</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-700 mb-2">Observações</h4>
                <p className="text-sm text-gray-600">
                  {getPetName(selectedBooking.petId)} está muito animado e socializa bem com outros animais.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Review Dialog */}
      {showReviewDialog && selectedBooking && (
        <ReviewDialog
          isOpen={showReviewDialog}
          onClose={() => {
            setShowReviewDialog(false);
            setSelectedBooking(null);
          }}
          hotelName={getHotelName(selectedBooking.hotelId)}
          petName={getPetName(selectedBooking.petId)}
          onSubmit={handleSubmitReview}
        />
      )}

      {/* Chat Dialog */}
      {showChatDialog && chatBooking && (
        <ChatDialog
          isOpen={showChatDialog}
          onClose={() => setShowChatDialog(false)}
          hotelName={getHotelName(chatBooking.hotelId)}
          petName={getPetName(chatBooking.petId)}
          bookingId={chatBooking.id}
          petSpecies={getPetSpecies(chatBooking.petId)}
        />
      )}
    </>
  );
}