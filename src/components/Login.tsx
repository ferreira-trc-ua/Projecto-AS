import { useState } from 'react';
import { User, UserType } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { PawPrint, Building2 } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [userType, setUserType] = useState<'owner' | 'hotel'>('owner');
  
  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerAddress, setRegisterAddress] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerDescription, setRegisterDescription] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would validate credentials
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      type: userType,
      name: userType === 'owner' ? 'Dono Exemplo' : 'Hotel Pet Paradise',
      email: loginEmail,
      isNewUser: false, // Login = conta existente
    };
    onLogin(user);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration - in real app, this would create account
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      type: userType,
      name: registerName,
      email: registerEmail,
      isNewUser: true, // Registro = conta nova
    };
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-full">
              <PawPrint className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle>Fur & Friends Inn</CardTitle>
          <CardDescription>
            Sistema de Reserva de Hospedagem para Animais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={userType} onValueChange={(v) => setUserType(v as 'owner' | 'hotel')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="owner">
                <PawPrint className="w-4 h-4 mr-2" />
                Dono
              </TabsTrigger>
              <TabsTrigger value="hotel">
                <Building2 className="w-4 h-4 mr-2" />
                Hotel
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              {!isRegistering ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Entrar
                  </Button>
                  <div className="text-center text-sm">
                    <button
                      type="button"
                      onClick={() => setIsRegistering(true)}
                      className="text-indigo-600 hover:underline"
                    >
                      Não tem conta? Registre-se
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">
                      {userType === 'owner' ? 'Nome Completo' : 'Nome do Hotel'}
                    </Label>
                    <Input
                      id="reg-name"
                      type="text"
                      placeholder={userType === 'owner' ? 'João Silva' : 'Hotel Pet Paradise'}
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Senha</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  {userType === 'hotel' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="reg-address">Endereço</Label>
                        <Input
                          id="reg-address"
                          type="text"
                          placeholder="Rua, Número, Cidade"
                          value={registerAddress}
                          onChange={(e) => setRegisterAddress(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-phone">Telefone</Label>
                        <Input
                          id="reg-phone"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={registerPhone}
                          onChange={(e) => setRegisterPhone(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-description">Descrição</Label>
                        <Input
                          id="reg-description"
                          type="text"
                          placeholder="Breve descrição do hotel"
                          value={registerDescription}
                          onChange={(e) => setRegisterDescription(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  
                  <Button type="submit" className="w-full">
                    Criar Conta
                  </Button>
                  <div className="text-center text-sm">
                    <button
                      type="button"
                      onClick={() => setIsRegistering(false)}
                      className="text-indigo-600 hover:underline"
                    >
                      Já tem conta? Faça login
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}