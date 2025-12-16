import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Review } from '../App';
import { Star, User } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface HotelReviewsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  hotelName: string;
  reviews: Review[];
}

export function HotelReviewsDialog({ isOpen, onClose, hotelName, reviews }: HotelReviewsDialogProps) {
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Avaliações - {hotelName}</DialogTitle>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-gray-900">{averageRating}</span>
            </div>
            <span className="text-sm text-gray-500">
              ({reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'})
            </span>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Ainda não há avaliações para este hotel.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-gray-900">{review.ownerName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
