import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { ActivityReport } from '../App';
import { Calendar, Check, X } from 'lucide-react';

interface ReportHistoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  petName: string;
  reports: ActivityReport[];
}

export function ReportHistoryDialog({ isOpen, onClose, petName, reports }: ReportHistoryDialogProps) {
  const getActivityTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      walk: 'Passeio',
      play: 'Brincadeira',
      rest: 'Descanso',
      training: 'Treino',
      other: 'Outro',
    };
    return types[type] || type;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Histórico de Relatórios</DialogTitle>
          <p className="text-sm text-gray-500">Relatórios diários de {petName}</p>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-6 py-4">
            {reports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span className="text-gray-900">
                    {new Date(report.date).toLocaleDateString('pt-PT', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Activities */}
                <div className="mb-4">
                  <h4 className="text-sm text-gray-700 mb-2">Atividades</h4>
                  <div className="space-y-2">
                    {report.activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <span className="text-gray-500 min-w-[60px]">{activity.time}</span>
                        <span className="text-indigo-600 min-w-[100px]">
                          {getActivityTypeLabel(activity.type)}
                        </span>
                        <span className="text-gray-700 flex-1">{activity.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meals */}
                <div className="mb-4">
                  <h4 className="text-sm text-gray-700 mb-2">Alimentação</h4>
                  <div className="space-y-2">
                    {report.meals.map((meal, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <span className="text-gray-500 min-w-[60px]">{meal.time}</span>
                        <span className="text-gray-700 flex-1">{meal.description}</span>
                        {meal.eaten ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            Comeu
                          </span>
                        ) : (
                          <span className="text-red-600 flex items-center gap-1">
                            <X className="w-4 h-4" />
                            Não comeu
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {report.notes && (
                  <div>
                    <h4 className="text-sm text-gray-700 mb-2">Observações</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {report.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {reports.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum relatório encontrado.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
