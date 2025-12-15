import { useState } from 'react';
import { Pet } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AddPetFormProps {
  onSubmit: (pet: Omit<Pet, 'id' | 'ownerId'>) => void;
  onCancel: () => void;
}

export function AddPetForm({ onSubmit, onCancel }: AddPetFormProps) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      species,
      breed,
      age: parseInt(age),
      weight: parseFloat(weight),
      specialNeeds: specialNeeds || undefined,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Novo Pet</CardTitle>
        <CardDescription>Preencha as informações do seu animal</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do pet"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="species">Espécie *</Label>
              <Select value={species} onValueChange={setSpecies} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cachorro">Cachorro</SelectItem>
                  <SelectItem value="Gato">Gato</SelectItem>
                  <SelectItem value="Coelho">Coelho</SelectItem>
                  <SelectItem value="Hamster">Hamster</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="breed">Raça *</Label>
              <Input
                id="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="Raça do pet"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Idade (anos) *</Label>
              <Input
                id="age"
                type="number"
                min="0"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg) *</Label>
              <Input
                id="weight"
                type="number"
                min="0"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0.0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialNeeds">Necessidades Especiais</Label>
            <Textarea
              id="specialNeeds"
              value={specialNeeds}
              onChange={(e) => setSpecialNeeds(e.target.value)}
              placeholder="Alergias, medicamentos, restrições alimentares, etc."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Adicionar Pet
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
