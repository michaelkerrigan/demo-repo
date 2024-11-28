"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Send, MessageCircle, Menu, X, Home } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-bot',
      text: 'Welcome! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(() => {
    if (inputText.trim() === '') return;

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    // Simulated bot response - replace with actual AI/API logic
    const botResponse: Message = {
      id: `bot-${Date.now()}`,
      text: `You said: "${inputText}"`,
      sender: 'bot',
      timestamp: new Date(),
    };

    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 500);

    setInputText('');
  }, [inputText]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header with Menu Toggle */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center">
          <MessageCircle className="mr-2 text-blue-600" size={32} />
          <h1 className="text-2xl font-bold text-blue-800">AI Chatbot</h1>
        </div>
        
        <button 
          onClick={toggleMenu} 
          className="z-50 relative p-2 hover:bg-blue-100 rounded-md"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Hamburger Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center">
          <nav className="space-y-6 text-center">
            <Link 
              href="/" 
              className="flex items-center justify-center text-2xl text-blue-600 hover:text-blue-800 transition-colors"
              onClick={toggleMenu}
            >
              <Home className="mr-2" size={24} /> Home Page
            </Link>
            <Link 
              href="#" 
              className="block text-2xl text-blue-600 hover:text-blue-800 transition-colors"
              onClick={toggleMenu}
            >
              Settings
            </Link>
            <Link 
              href="#" 
              className="block text-2xl text-blue-600 hover:text-blue-800 transition-colors"
              onClick={toggleMenu}
            >
              Help
            </Link>
          </nav>
        </div>
      )}
      
      <div className="flex-grow overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg shadow-md ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-white shadow-lg">
        <div className="flex">
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;