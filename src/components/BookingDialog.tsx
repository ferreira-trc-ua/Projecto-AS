import { useState } from 'react';
import { Booking, Pet, Hotel } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { CreditCard, Smartphone, FileText, User, PawPrint, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from './ui/badge';

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: Hotel;
  pets: Pet[];
  ownerName: string;
  ownerEmail: string;
  onSubmit: (booking: Omit<Booking, 'id' | 'ownerId'>) => void;
}

const PAYMENT_METHODS = [
  { value: 'mbway', label: 'MB Way', icon: Smartphone },
  { value: 'reference', label: 'Referência Multibanco', icon: FileText },
  { value: 'multibanco', label: 'Cartão Multibanco', icon: CreditCard },
  { value: 'visa', label: 'Visa', icon: CreditCard },
  { value: 'mastercard', label: 'Mastercard', icon: CreditCard },
] as const;

export function BookingDialog({
  isOpen,
  onClose,
  hotel,
  pets,
  ownerName,
  ownerEmail,
  onSubmit,
}: BookingDialogProps) {
  const [step, setStep] = useState<1 | 2>(1);
  
  // Owner data
  const [fullName, setFullName] = useState(ownerName);
  const [email, setEmail] = useState(ownerEmail);
  const [phone, setPhone] = useState('');
  
  // Pet data
  const [selectedPetId, setSelectedPetId] = useState('');
  
  // Booking data
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Payment data
  const [paymentMethod, setPaymentMethod] = useState<'mbway' | 'reference' | 'multibanco' | 'visa' | 'mastercard'>('mbway');
  const [paymentDetails, setPaymentDetails] = useState('');

  const selectedPet = pets.find(p => p.id === selectedPetId);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      petId: selectedPetId,
      hotelId: hotel.id,
      checkIn,
      checkOut,
      status: 'pending',
      specialRequests: specialRequests || undefined,
      paymentMethod,
      paymentDetails: paymentDetails || undefined,
    });
    onClose();
  };

  const handleClose = () => {
    setStep(1);
    setSelectedPetId('');
    setCheckIn('');
    setCheckOut('');
    setSpecialRequests('');
    setPaymentDetails('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? 'Dados da Reserva' : 'Pagamento'}
          </DialogTitle>
          <DialogDescription>
            {step === 1 ? `Reserva no ${hotel.name}` : 'Escolha o método de pagamento'}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <form onSubmit={handleNext} className="space-y-6">
            {/* Dados do Responsável */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-900">
                <User className="w-5 h-5" />
                <h3>Dados do Responsável</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome completo *</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+351 912 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Dados do Pet */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-900">
                <PawPrint className="w-5 h-5" />
                <h3>Dados do Pet</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pet">Selecione o pet *</Label>
                <Select value={selectedPetId} onValueChange={setSelectedPetId} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha seu pet" />
                  </SelectTrigger>
                  <SelectContent>
                    {pets.map((pet) => (
                      <SelectItem key={pet.id} value={pet.id}>
                        {pet.name} - {pet.species}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedPet && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Espécie:</span>
                      <span className="ml-2 text-gray-900">{selectedPet.species}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Raça:</span>
                      <span className="ml-2 text-gray-900">{selectedPet.breed}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Idade:</span>
                      <span className="ml-2 text-gray-900">{selectedPet.age} anos</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Peso:</span>
                      <span className="ml-2 text-gray-900">{selectedPet.weight} kg</span>
                    </div>
                  </div>
                  {selectedPet.specialNeeds && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <span className="text-gray-500 text-sm">Necessidades especiais:</span>
                      <p className="text-gray-900 text-sm mt-1">{selectedPet.specialNeeds}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Período da Estadia */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-900">
                <CalendarIcon className="w-5 h-5" />
                <h3>Período da Estadia</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkIn">Check-in *</Label>
                  <Input
                    id="checkIn"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="checkOut">Check-out *</Label>
                  <Input
                    id="checkOut"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Observações Especiais */}
            <div className="space-y-2">
              <Label htmlFor="specialRequests">Observações especiais (opcional)</Label>
              <Textarea
                id="specialRequests"
                placeholder="Alergias, medicações, comportamento, etc."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Continuar para Pagamento
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Methods */}
            <div className="space-y-2">
              <Label>Método de Pagamento *</Label>
              <div className="grid grid-cols-1 gap-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => setPaymentMethod(method.value)}
                      className={`flex items-center gap-3 p-4 border rounded-lg transition-all ${
                        paymentMethod === method.value
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${paymentMethod === method.value ? 'text-indigo-600' : 'text-gray-400'}`} />
                      <span className={paymentMethod === method.value ? 'text-indigo-900' : 'text-gray-700'}>
                        {method.label}
                      </span>
                      {paymentMethod === method.value && (
                        <Badge className="ml-auto bg-indigo-600">Selecionado</Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment Details */}
            {paymentMethod === 'mbway' && (
              <div className="space-y-2">
                <Label htmlFor="mbwayPhone">Número de Telefone MB Way *</Label>
                <Input
                  id="mbwayPhone"
                  type="tel"
                  placeholder="+351 912 345 678"
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  required
                />
              </div>
            )}

            {paymentMethod === 'reference' && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  A referência multibanco será gerada após a confirmação da reserva.
                </p>
              </div>
            )}

            {(paymentMethod === 'multibanco' || paymentMethod === 'visa' || paymentMethod === 'mastercard') && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número do Cartão *</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails}
                    onChange={(e) => setPaymentDetails(e.target.value)}
                    maxLength={19}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Validade *</Label>
                    <Input
                      id="expiry"
                      type="text"
                      placeholder="MM/AA"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-gray-900 mb-3">Resumo da Reserva</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hotel:</span>
                  <span className="text-gray-900">{hotel.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pet:</span>
                  <span className="text-gray-900">{selectedPet?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Período:</span>
                  <span className="text-gray-900">
                    {checkIn && checkOut && `${new Date(checkIn).toLocaleDateString('pt-PT')} - ${new Date(checkOut).toLocaleDateString('pt-PT')}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button type="submit" className="flex-1">
                Confirmar Reserva
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
