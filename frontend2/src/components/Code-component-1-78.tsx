import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { 
  MessageCircle, 
  Send, 
  Search,
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Smile,
  Users
} from 'lucide-react';

export function ChatPage() {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  const chatList = [
    {
      id: 1,
      name: 'Tech Conference Team',
      type: 'group',
      lastMessage: 'The venue setup is confirmed for tomorrow',
      lastTime: '2 min ago',
      unread: 3,
      online: true,
      members: 5
    },
    {
      id: 2,
      name: 'John Doe',
      type: 'direct',
      lastMessage: 'Thanks for the quick response!',
      lastTime: '1 hour ago',
      unread: 0,
      online: true,
      role: 'Event Organizer'
    },
    {
      id: 3,
      name: 'Catering Services',
      type: 'direct',
      lastMessage: 'We can accommodate the dietary requirements',
      lastTime: '3 hours ago',
      unread: 1,
      online: false,
      role: 'Vendor'
    },
    {
      id: 4,
      name: 'Music Festival Planning',
      type: 'group',
      lastMessage: 'Sound check scheduled for 4 PM',
      lastTime: '1 day ago',
      unread: 0,
      online: true,
      members: 8
    },
    {
      id: 5,
      name: 'Sarah Wilson',
      type: 'direct',
      lastMessage: 'Looking forward to the event!',
      lastTime: '2 days ago',
      unread: 0,
      online: false,
      role: 'Attendee'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'John Doe',
      content: 'Hi there! I wanted to discuss the catering arrangements for the Tech Conference.',
      time: '10:30 AM',
      isOwn: false,
      avatar: 'JD'
    },
    {
      id: 2,
      sender: 'You',
      content: 'Sure! What specific requirements do you have in mind?',
      time: '10:32 AM',
      isOwn: true,
      avatar: user?.name.charAt(0).toUpperCase() || 'U'
    },
    {
      id: 3,
      sender: 'John Doe',
      content: 'We need to accommodate about 300 people, with vegetarian and gluten-free options.',
      time: '10:35 AM',
      isOwn: false,
      avatar: 'JD'
    },
    {
      id: 4,
      sender: 'You',
      content: 'That\'s definitely doable. I\'ll send you a detailed proposal by end of day.',
      time: '10:38 AM',
      isOwn: true,
      avatar: user?.name.charAt(0).toUpperCase() || 'U'
    },
    {
      id: 5,
      sender: 'John Doe',
      content: 'Perfect! Also, can we schedule a quick call tomorrow to finalize the menu?',
      time: '10:40 AM',
      isOwn: false,
      avatar: 'JD'
    },
    {
      id: 6,
      sender: 'You',
      content: 'Absolutely. How about 2 PM tomorrow?',
      time: '10:42 AM',
      isOwn: true,
      avatar: user?.name.charAt(0).toUpperCase() || 'U'
    },
    {
      id: 7,
      sender: 'John Doe',
      content: 'That works perfectly. Thanks for the quick response!',
      time: '10:45 AM',
      isOwn: false,
      avatar: 'JD'
    }
  ];

  const selectedChatInfo = chatList.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Chat List Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            <Button size="sm" variant="outline">
              <Users size={16} />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search messages..."
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chatList.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat === chat.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {chat.type === 'group' ? (
                      <Users size={20} />
                    ) : (
                      chat.name.split(' ').map(n => n[0]).join('').slice(0, 2)
                    )}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {chat.name}
                      {chat.type === 'group' && (
                        <span className="text-xs text-gray-500 ml-1">({chat.members})</span>
                      )}
                    </h3>
                    <span className="text-xs text-gray-500">{chat.lastTime}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge variant="destructive" className="rounded-full text-xs h-5 w-5 p-0 flex items-center justify-center">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                  
                  {chat.role && (
                    <p className="text-xs text-gray-400 mt-1">{chat.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChatInfo ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {selectedChatInfo.type === 'group' ? (
                        <Users size={18} />
                      ) : (
                        selectedChatInfo.name.split(' ').map(n => n[0]).join('').slice(0, 2)
                      )}
                    </div>
                    {selectedChatInfo.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedChatInfo.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedChatInfo.online ? 'Online' : 'Last seen 2 hours ago'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                    msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                      {msg.avatar}
                    </div>
                    
                    <div className={`px-4 py-2 rounded-2xl ${
                      msg.isOwn 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-900'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip size={16} />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile size={16} />
                  </Button>
                </div>
                
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No chat selected</h3>
              <p className="text-gray-600">Choose a conversation from the sidebar to start messaging.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}