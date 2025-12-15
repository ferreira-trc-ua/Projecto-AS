import { useState } from 'react';
import { Caretaker } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { User, Phone, Mail, Award, Plus } from 'lucide-react';

interface CaretakersListProps {
  caretakers: Caretaker[];
  onAddCaretaker: (caretaker: Omit<Caretaker, 'id' | 'hotelId'>) => void;
}

export function CaretakersList({ caretakers, onAddCaretaker }: CaretakersListProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCaretaker, setNewCaretaker] = useState({
    name: '',
    phone: '',
    email: '',
    specialization: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCaretaker(newCaretaker);
    setNewCaretaker({ name: '', phone: '', email: '', specialization: '' });
    setShowAddDialog(false);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">
            {caretakers.length} cuidador(es) cadastrado(s)
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Cuidador
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {caretakers.map((caretaker) => (
          <Card key={caretaker.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <span>{caretaker.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{caretaker.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{caretaker.email}</span>
                </div>
                {caretaker.specialization && (
                  <div className="flex items-start gap-2 text-sm">
                    <Award className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-600">{caretaker.specialization}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {caretakers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Nenhum cuidador cadastrado ainda.</p>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Primeiro Cuidador
          </Button>
        </div>
      )}

      {/* Add Caretaker Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Cuidador</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={newCaretaker.name}
                onChange={(e) => setNewCaretaker({ ...newCaretaker, name: e.target.value })}
                required
                placeholder="Ex: João Silva"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                type="tel"
                value={newCaretaker.phone}
                onChange={(e) => setNewCaretaker({ ...newCaretaker, phone: e.target.value })}
                required
                placeholder="Ex: +351 912 345 678"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={newCaretaker.email}
                onChange={(e) => setNewCaretaker({ ...newCaretaker, email: e.target.value })}
                required
                placeholder="Ex: joao@hotel.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Especialização</Label>
              <Input
                id="specialization"
                value={newCaretaker.specialization}
                onChange={(e) =>
                  setNewCaretaker({ ...newCaretaker, specialization: e.target.value })
                }
                placeholder="Ex: Cães de grande porte"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Adicionar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
