
'use client';

import { useState } from 'react';
import { MessageSquare, Send, Search, User, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function MessagerieAvocatPage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const messages = [
    {
      id: '1',
      senderName: 'Jean Dupont',
      senderEmail: 'jean.dupont@email.com',
      subject: 'Question sur optimisation fiscale',
      content: 'Bonjour Maître, j\'aimerais avoir votre avis sur la restructuration de ma holding familiale. Pouvez-vous me proposer un rendez-vous ?',
      createdAt: '2025-01-18T10:30:00',
      isRead: false,
      priority: 'high',
    },
    {
      id: '2',
      senderName: 'Marie Martin',
      senderEmail: 'marie.martin@email.com',
      subject: 'Suite consultation succession',
      content: 'Merci pour notre échange d\'hier. Pouvez-vous me confirmer les documents à préparer pour la donation ?',
      createdAt: '2025-01-17T15:45:00',
      isRead: true,
      priority: 'normal',
    },
    {
      id: '3',
      senderName: 'Pierre Leroy',
      senderEmail: 'pierre.leroy@email.com',
      subject: 'Urgence - Contrôle fiscal',
      content: 'Bonjour, je viens de recevoir un avis de contrôle fiscal. Pouvez-vous m\'aider rapidement ?',
      createdAt: '2025-01-16T09:15:00',
      isRead: true,
      priority: 'urgent',
    },
  ];

  const priorityColors = {
    urgent: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    normal: 'bg-gray-100 text-gray-800',
  };

  const priorityLabels = {
    urgent: 'Urgent',
    high: 'Important',
    normal: 'Normal',
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messagerie</h1>
            <p className="text-gray-600">Gérez vos échanges avec vos clients</p>
          </div>
          <Button className="bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90">
            <MessageSquare className="w-4 h-4 mr-2" />
            Nouveau message
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-lg p-3">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Non lus</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-lg p-3">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Aujourd'hui</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-lg p-3">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Importants</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-lg p-3">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">247</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Messages reçus</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Rechercher..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                        !message.isRead ? 'border-l-[var(--lexanova-blue)] bg-blue-50' : 'border-l-transparent'
                      } ${selectedMessage === message.id ? 'bg-gray-100' : ''}`}
                      onClick={() => setSelectedMessage(message.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[var(--lexanova-blue)]/10 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-[var(--lexanova-blue)]" />
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                              {message.senderName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(message.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <Badge className={priorityColors[message.priority as keyof typeof priorityColors]} variant="secondary">
                          {priorityLabels[message.priority as keyof typeof priorityLabels]}
                        </Badge>
                      </div>
                      <h4 className={`text-sm font-medium mb-1 ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                        {message.subject}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {message.content}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Content */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>
                        {messages.find(m => m.id === selectedMessage)?.subject}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        De: {messages.find(m => m.id === selectedMessage)?.senderName} 
                        ({messages.find(m => m.id === selectedMessage)?.senderEmail})
                      </p>
                    </div>
                    <Badge className={priorityColors[messages.find(m => m.id === selectedMessage)?.priority as keyof typeof priorityColors]}>
                      {priorityLabels[messages.find(m => m.id === selectedMessage)?.priority as keyof typeof priorityLabels]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {messages.find(m => m.id === selectedMessage)?.content}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Répondre</h4>
                    <Textarea
                      placeholder="Tapez votre réponse..."
                      rows={6}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <div className="flex space-x-3">
                      <Button className="bg-[var(--lexanova-blue)] hover:bg-[var(--lexanova-blue)]/90">
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer
                      </Button>
                      <Button variant="outline">
                        Proposer un RDV
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Sélectionnez un message
                  </h3>
                  <p className="text-gray-600">
                    Choisissez un message dans la liste pour le lire et y répondre.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
