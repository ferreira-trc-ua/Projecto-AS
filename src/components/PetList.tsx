import { Pet } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { PawPrint } from 'lucide-react';

interface PetListProps {
  pets: Pet[];
}

export function PetList({ pets }: PetListProps) {
  if (pets.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <PawPrint className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum animal cadastrado ainda.</p>
          <p className="text-sm text-gray-400 mt-2">
            Clique em "Adicionar Pet" para começar.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pets.map((pet) => (
        <Card key={pet.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{pet.name}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {pet.species} - {pet.breed}
                </p>
              </div>
              <PawPrint className="w-5 h-5 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Idade:</span>
                <span className="text-gray-900">{pet.age} anos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Peso:</span>
                <span className="text-gray-900">{pet.weight} kg</span>
              </div>
              {pet.specialNeeds && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-gray-500 mb-1">Necessidades especiais:</p>
                  <Badge variant="secondary">{pet.specialNeeds}</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
