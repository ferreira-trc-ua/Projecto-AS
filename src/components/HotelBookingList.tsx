import { useState } from 'react';
import { Booking, Caretaker, ActivityReport, Activity, Meal } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, User, MessageCircle, FileText, History } from 'lucide-react';
import { ChatDialog } from './ChatDialog';
import { CreateReportDialog } from './CreateReportDialog';
import { ReportHistoryDialog } from './ReportHistoryDialog';

interface HotelBookingListProps {
  bookings: Booking[];
  caretakers: Caretaker[];
  reports: ActivityReport[];
  onCreateReport: (bookingId: string, activities: Activity[], meals: Meal[], notes: string) => void;
}

export function HotelBookingList({ bookings, caretakers, reports, onCreateReport }: HotelBookingListProps) {
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [showReportHistory, setShowReportHistory] = useState(false);

  const getCaretakerName = (caretakerId: string | undefined) => {
    if (!caretakerId) return 'Não atribuído';
    const caretaker = caretakers.find((c) => c.id === caretakerId);
    return caretaker?.name || 'Não atribuído';
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

  const handleOpenChat = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowChatDialog(true);
  };

  const handleOpenCreateReport = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowCreateReport(true);
  };

  const handleOpenReportHistory = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowReportHistory(true);
  };

  const handleSubmitReport = (activities: Activity[], meals: Meal[], notes: string) => {
    if (selectedBooking) {
      onCreateReport(selectedBooking.id, activities, meals, notes);
      setShowCreateReport(false);
      setSelectedBooking(null);
    }
  };

  const getBookingReports = (bookingId: string) => {
    return reports.filter((r) => r.bookingId === bookingId);
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Nenhuma reserva encontrada.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {booking.petName}
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusText(booking.status)}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Dono: {booking.ownerName}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Check-in: {new Date(booking.checkIn).toLocaleDateString('pt-PT')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Check-out: {new Date(booking.checkOut).toLocaleDateString('pt-PT')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span>Cuidador: {getCaretakerName(booking.caretakerId)}</span>
                  </div>
                </div>

                {booking.specialRequests && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-sm">
                      <span className="text-amber-800">Pedidos especiais:</span>{' '}
                      {booking.specialRequests}
                    </p>
                  </div>
                )}

                {/* Action buttons - only for active bookings */}
                {booking.status === 'active' && (
                  <div className="flex gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenChat(booking)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenCreateReport(booking)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Criar Relatório
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenReportHistory(booking)}
                    >
                      <History className="w-4 h-4 mr-2" />
                      Histórico ({getBookingReports(booking.id).length})
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chat Dialog */}
      {showChatDialog && selectedBooking && (
        <ChatDialog
          isOpen={showChatDialog}
          onClose={() => {
            setShowChatDialog(false);
            setSelectedBooking(null);
          }}
          hotelName="Seu Hotel"
          petName={selectedBooking.petName || 'Pet'}
          bookingId={selectedBooking.id}
        />
      )}

      {/* Create Report Dialog */}
      {showCreateReport && selectedBooking && (
        <CreateReportDialog
          isOpen={showCreateReport}
          onClose={() => {
            setShowCreateReport(false);
            setSelectedBooking(null);
          }}
          petName={selectedBooking.petName || 'Pet'}
          onSubmit={handleSubmitReport}
        />
      )}

      {/* Report History Dialog */}
      {showReportHistory && selectedBooking && (
        <ReportHistoryDialog
          isOpen={showReportHistory}
          onClose={() => {
            setShowReportHistory(false);
            setSelectedBooking(null);
          }}
          petName={selectedBooking.petName || 'Pet'}
          reports={getBookingReports(selectedBooking.id)}
        />
      )}
    </>
  );
}
