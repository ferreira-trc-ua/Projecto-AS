import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send, Image as ImageIcon, Video } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  sender: 'owner' | 'hotel';
  text: string;
  timestamp: Date;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
}

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  hotelName: string;
  petName: string;
}

export function ChatDialog({ isOpen, onClose, hotelName, petName }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'hotel',
      text: `Olá! O ${petName} chegou bem e já está se adaptando. Como podemos ajudar?`,
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'owner',
      text: newMessage,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate hotel response
    setTimeout(() => {
      const response: Message = {
        id: Math.random().toString(36).substr(2, 9),
        sender: 'hotel',
        text: 'Obrigado pela sua mensagem! Vamos verificar e responder em breve.',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-gray-200">
          <DialogTitle>Chat com {hotelName}</DialogTitle>
          <p className="text-sm text-gray-500">Sobre a estadia de {petName}</p>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'owner' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender === 'owner'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.type === 'text' && <p className="text-sm">{message.text}</p>}
                  {message.type === 'image' && message.mediaUrl && (
                    <div className="space-y-2">
                      <img
                        src={message.mediaUrl}
                        alt="Imagem compartilhada"
                        className="rounded max-w-full"
                      />
                      {message.text && <p className="text-sm">{message.text}</p>}
                    </div>
                  )}
                  {message.type === 'video' && message.mediaUrl && (
                    <div className="space-y-2">
                      <video src={message.mediaUrl} controls className="rounded max-w-full" />
                      {message.text && <p className="text-sm">{message.text}</p>}
                    </div>
                  )}
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'owner' ? 'text-indigo-200' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button type="button" variant="outline" size="icon">
              <ImageIcon className="w-4 h-4" />
            </Button>
            <Button type="button" variant="outline" size="icon">
              <Video className="w-4 h-4" />
            </Button>
            <Button type="submit" size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            Use o chat para pedir relatórios, fotos e vídeos sobre {petName}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
