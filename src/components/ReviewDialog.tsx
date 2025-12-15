import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Star } from 'lucide-react';

interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  hotelName: string;
  petName: string;
  onSubmit: (rating: number, comment: string) => void;
}

export function ReviewDialog({ isOpen, onClose, hotelName, petName, onSubmit }: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Por favor, selecione uma avaliação de 1 a 5 estrelas');
      return;
    }
    onSubmit(rating, comment);
    setRating(0);
    setComment('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Avaliar Estadia</DialogTitle>
          <p className="text-sm text-gray-500">
            Como foi a estadia de {petName} no {hotelName}?
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div className="space-y-2">
            <label className="text-sm">Avaliação</label>
            <div className="flex gap-2 justify-center py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-gray-600">
                {rating === 1 && 'Muito insatisfeito'}
                {rating === 2 && 'Insatisfeito'}
                {rating === 3 && 'Neutro'}
                {rating === 4 && 'Satisfeito'}
                {rating === 5 && 'Muito satisfeito'}
              </p>
            )}
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="text-sm">Comentário (Opcional)</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte-nos sobre a experiência..."
              rows={4}
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              Enviar Avaliação
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
