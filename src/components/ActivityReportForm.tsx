import { useState } from 'react';
import { ActivityReport, Activity, Meal } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { Checkbox } from './ui/checkbox';

interface ActivityReportFormProps {
  bookingId: string;
  onSubmit: (report: Omit<ActivityReport, 'id'>) => void;
  onCancel: () => void;
}

export function ActivityReportForm({ bookingId, onSubmit, onCancel }: ActivityReportFormProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [activities, setActivities] = useState<Activity[]>([
    { time: '', description: '', type: 'walk' },
  ]);
  const [meals, setMeals] = useState<Meal[]>([
    { time: '', description: '', eaten: true },
  ]);
  const [notes, setNotes] = useState('');

  const handleAddActivity = () => {
    setActivities([...activities, { time: '', description: '', type: 'walk' }]);
  };

  const handleRemoveActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const handleActivityChange = (index: number, field: keyof Activity, value: string) => {
    const newActivities = [...activities];
    newActivities[index] = { ...newActivities[index], [field]: value };
    setActivities(newActivities);
  };

  const handleAddMeal = () => {
    setMeals([...meals, { time: '', description: '', eaten: true }]);
  };

  const handleRemoveMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  const handleMealChange = (index: number, field: keyof Meal, value: string | boolean) => {
    const newMeals = [...meals];
    newMeals[index] = { ...newMeals[index], [field]: value };
    setMeals(newMeals);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      bookingId,
      date,
      activities: activities.filter((a) => a.time && a.description),
      meals: meals.filter((m) => m.time && m.description),
      notes,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatório de Atividades Diárias</CardTitle>
        <CardDescription>Registre as atividades e alimentação do animal</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="date">Data *</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Activities Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900">Atividades</h3>
              <Button type="button" variant="outline" size="sm" onClick={handleAddActivity}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>

            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-end">
                  <div className="col-span-2">
                    <Label htmlFor={`activity-time-${index}`} className="text-xs">
                      Horário
                    </Label>
                    <Input
                      id={`activity-time-${index}`}
                      type="time"
                      value={activity.time}
                      onChange={(e) => handleActivityChange(index, 'time', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor={`activity-type-${index}`} className="text-xs">
                      Tipo
                    </Label>
                    <Select
                      value={activity.type}
                      onValueChange={(value) => handleActivityChange(index, 'type', value)}
                    >
                      <SelectTrigger id={`activity-type-${index}`}>
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
                  <div className="col-span-6">
                    <Label htmlFor={`activity-desc-${index}`} className="text-xs">
                      Descrição
                    </Label>
                    <Input
                      id={`activity-desc-${index}`}
                      value={activity.description}
                      onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                      placeholder="Descreva a atividade"
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveActivity(index)}
                      disabled={activities.length === 1}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meals Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900">Alimentação</h3>
              <Button type="button" variant="outline" size="sm" onClick={handleAddMeal}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>

            <div className="space-y-3">
              {meals.map((meal, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-end">
                  <div className="col-span-2">
                    <Label htmlFor={`meal-time-${index}`} className="text-xs">
                      Horário
                    </Label>
                    <Input
                      id={`meal-time-${index}`}
                      type="time"
                      value={meal.time}
                      onChange={(e) => handleMealChange(index, 'time', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-6">
                    <Label htmlFor={`meal-desc-${index}`} className="text-xs">
                      Descrição
                    </Label>
                    <Input
                      id={`meal-desc-${index}`}
                      value={meal.description}
                      onChange={(e) => handleMealChange(index, 'description', e.target.value)}
                      placeholder="Ex: Ração premium 200g"
                      required
                    />
                  </div>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Checkbox
                      id={`meal-eaten-${index}`}
                      checked={meal.eaten}
                      onCheckedChange={(checked) =>
                        handleMealChange(index, 'eaten', checked === true)
                      }
                    />
                    <Label htmlFor={`meal-eaten-${index}`} className="text-xs">
                      Comeu
                    </Label>
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMeal(index)}
                      disabled={meals.length === 1}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Comportamento, saúde, interações sociais, etc."
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Salvar Relatório
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
