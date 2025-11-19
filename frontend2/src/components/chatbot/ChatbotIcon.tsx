import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface ChatbotIconProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ChatbotIcon({ isOpen, onClick }: ChatbotIconProps) {
  console.log('ChatbotIcon rendering, isOpen:', isOpen);
  
  return (
    <button
      onClick={(e) => {
        console.log('Chatbot icon clicked');
        onClick();
      }}
      aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      style={{ 
        position: 'fixed', 
        bottom: '24px', 
        right: '24px', 
        zIndex: 9999,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'linear-gradient(to right, #3b82f6, #9333ea)',
        color: 'white',
        border: 'none',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <MessageCircle className="w-6 h-6" />
      )}
      {!isOpen && (
        <span style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '12px',
          height: '12px',
          backgroundColor: '#ef4444',
          borderRadius: '50%',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }} />
      )}
    </button>
  );
}