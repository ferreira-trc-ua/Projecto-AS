import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { Activity, Meal } from '../App';

interface CreateReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  petName: string;
  onSubmit: (activities: Activity[], meals: Meal[], notes: string) => void;
}

export function CreateReportDialog({ isOpen, onClose, petName, onSubmit }: CreateReportDialogProps) {
  const [activities, setActivities] = useState<Activity[]>([
    { time: '', description: '', type: 'walk' },
  ]);
  const [meals, setMeals] = useState<Meal[]>([
    { time: '', description: '', eaten: true },
  ]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(activities, meals, notes);
    // Reset form
    setActivities([{ time: '', description: '', type: 'walk' }]);
    setMeals([{ time: '', description: '', eaten: true }]);
    setNotes('');
    onClose();
  };

  const addActivity = () => {
    setActivities([...activities, { time: '', description: '', type: 'walk' }]);
  };

  const removeActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const updateActivity = (index: number, field: keyof Activity, value: any) => {
    const updated = [...activities];
    updated[index] = { ...updated[index], [field]: value };
    setActivities(updated);
  };

  const addMeal = () => {
    setMeals([...meals, { time: '', description: '', eaten: true }]);
  };

  const removeMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  const updateMeal = (index: number, field: keyof Meal, value: any) => {
    const updated = [...meals];
    updated[index] = { ...updated[index], [field]: value };
    setMeals(updated);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Relatório Diário</DialogTitle>
          <p className="text-sm text-gray-500">Relatório de atividades de {petName}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Activities Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Atividades</Label>
              <Button type="button" onClick={addActivity} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div key={index} className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <div>
                      <Input
                        type="time"
                        value={activity.time}
                        onChange={(e) => updateActivity(index, 'time', e.target.value)}
                        required
                        placeholder="Hora"
                      />
                    </div>
                    <div>
                      <Select
                        value={activity.type}
                        onValueChange={(value) => updateActivity(index, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="walk">Passeio</SelectItem>
                          <SelectItem value="play">Brincadeira</SelectItem>
                          <SelectItem value="rest">Descanso</SelectItem>
                          <SelectItem value="training">Treino</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Input
                        value={activity.description}
                        onChange={(e) => updateActivity(index, 'description', e.target.value)}
                        placeholder="Descrição"
                        required
                      />
                    </div>
                  </div>
                  {activities.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeActivity(index)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Meals Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Refeições</Label>
              <Button type="button" onClick={addMeal} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {meals.map((meal, index) => (
                <div key={index} className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <div>
                      <Input
                        type="time"
                        value={meal.time}
                        onChange={(e) => updateMeal(index, 'time', e.target.value)}
                        required
                        placeholder="Hora"
                      />
                    </div>
                    <div>
                      <Input
                        value={meal.description}
                        onChange={(e) => updateMeal(index, 'description', e.target.value)}
                        placeholder="Descrição"
                        required
                      />
                    </div>
                    <div>
                      <Select
                        value={meal.eaten ? 'true' : 'false'}
                        onValueChange={(value) => updateMeal(index, 'eaten', value === 'true')}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Comeu</SelectItem>
                          <SelectItem value="false">Não comeu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {meals.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMeal(index)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Observações sobre o comportamento e bem-estar do animal..."
              rows={4}
              className="mt-2"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button type="submit" className="flex-1">
              Salvar Relatório
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
