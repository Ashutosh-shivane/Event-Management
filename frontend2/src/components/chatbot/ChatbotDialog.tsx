import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_ACTIONS = [
  { id: '1', text: 'How do I create an event?', category: 'events' },
  { id: '2', text: 'How to invite a manager?', category: 'managers' },
  { id: '3', text: 'How does the bidding system work?', category: 'bidding' },
  { id: '4', text: 'How to manage payments?', category: 'payments' },
  { id: '5', text: 'How to submit feedback?', category: 'feedback' },
];

const BOT_RESPONSES: Record<string, string> = {
  events: "To create an event, go to your Organizer Dashboard and click on 'Create New Event'. Fill in the event details including name, date, venue, budget, and description. Once created, you can manage volunteers, vendors, and managers from the event management page.",
  managers: "To invite a manager to an event: 1) Go to your Events page, 2) Click on the event card or 'Manage' button, 3) Click 'Add Manager', 4) Fill in manager details and assign budget and responsibilities, 5) Send the invitation. The manager can accept, reject, or counter-offer.",
  bidding: "The bidding system allows vendors to place bids on events. As an organizer, you can view all bids, compare offers, and approve the best vendor for your event. Vendors can update their bids until you make a final decision.",
  payments: "Your wallet shows your current balance and transaction history. Students pay event fees which go into the organizer's wallet. Organizers can manage payments to vendors and managers. All transactions are tracked in the wallet section of your dashboard.",
  feedback: "Students can submit feedback after attending events. Go to the Events page, find the event you attended, and click 'Submit Feedback'. Rate the event and provide comments. Your feedback helps improve future events!",
  default: "I'm here to help! I can assist you with:\n• Creating and managing events\n• Inviting managers and assigning roles\n• Understanding the bidding system\n• Managing payments and wallets\n• Submitting feedback\n\nWhat would you like to know more about?"
};

export default function ChatbotDialog({ isOpen, onClose }: ChatbotDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Event Management Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes('event') && lowercaseMessage.includes('create')) {
      return BOT_RESPONSES.events;
    } else if (lowercaseMessage.includes('manager') || lowercaseMessage.includes('invite')) {
      return BOT_RESPONSES.managers;
    } else if (lowercaseMessage.includes('bid') || lowercaseMessage.includes('vendor')) {
      return BOT_RESPONSES.bidding;
    } else if (lowercaseMessage.includes('payment') || lowercaseMessage.includes('wallet')) {
      return BOT_RESPONSES.payments;
    } else if (lowercaseMessage.includes('feedback') || lowercaseMessage.includes('rating')) {
      return BOT_RESPONSES.feedback;
    } else if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
      return "Hello! Welcome to the Event Management System. I'm here to help you navigate the platform. What would you like to know?";
    } else if (lowercaseMessage.includes('thank')) {
      return "You're welcome! Feel free to ask if you have any other questions. 😊";
    } else {
      return BOT_RESPONSES.default;
    }
  };

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (action: typeof QUICK_ACTIONS[0]) => {
    handleSendMessage(action.text);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[9998] w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200" style={{ position: 'fixed', bottom: '96px', right: '24px', zIndex: 9998,    maxWidth: 450}}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold">Event Assistant</h3>
            <p className="text-xs opacity-90">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-lg p-1 transition-colors"
            aria-label="Minimize chat"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-lg p-1 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user'
                  ? 'bg-blue-500'
                  : 'bg-gradient-to-br from-purple-500 to-blue-500'
              }`}
            >
              {message.sender === 'user' ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>
            <div
              className={`max-w-[75%] rounded-2xl p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-200'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-200">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 bg-white border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_ACTIONS.slice(0, 3).map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action)}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs hover:bg-blue-100 transition-colors"
              >
                {action.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
            className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}