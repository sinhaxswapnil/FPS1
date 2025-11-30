import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';
import { streamGeminiResponse } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hello. I am Sentinel AI. I can assist with emergency procedures, first aid protocols, and locating services. How can I help you today?',
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Create a placeholder message for the streaming response
      const responseId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: responseId,
        role: 'model',
        text: '',
        timestamp: Date.now()
      }]);

      // Prepare history for API
      const history = messages.map(m => ({ role: m.role, text: m.text }));

      const streamResult = await streamGeminiResponse(history, userMessage.text);
      
      let fullText = '';
      for await (const chunk of streamResult.stream) {
        const textChunk = chunk.text();
        fullText += textChunk;
        
        setMessages(prev => 
          prev.map(msg => 
            msg.id === responseId 
              ? { ...msg, text: fullText } 
              : msg
          )
        );
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: 'I encountered a connection error. Please try again or check your network.',
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-900 shadow-md z-10">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <Sparkles className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Emergency AI Assistant</h2>
          <p className="text-xs text-slate-400">Powered by Gemini 2.5 Flash • Real-time Guidance</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              message.role === 'user' ? 'bg-blue-600' : 'bg-indigo-600'
            }`}>
              {message.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
            </div>
            
            <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                message.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-sm' 
                  : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'
              }`}>
                {message.role === 'model' ? (
                  <ReactMarkdown 
                    className="prose prose-invert prose-sm max-w-none"
                    components={{
                      ul: ({node, ...props}) => <ul className="list-disc pl-4 my-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-4 my-2" {...props} />,
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      strong: ({node, ...props}) => <strong className="text-indigo-300 font-bold" {...props} />
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                ) : (
                  message.text
                )}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
               <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="px-4 py-3 bg-slate-800 rounded-2xl rounded-tl-sm border border-slate-700 flex items-center">
              <Loader2 className="w-5 h-5 text-indigo-400 animate-spin mr-2" />
              <span className="text-slate-400 text-sm">Analyzing situation...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the emergency or ask for protocols (e.g., 'Treating a chemical burn')..."
            className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-[60px] scrollbar-hide"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 top-2 p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-500 mt-2 flex items-center justify-center gap-1">
          <AlertCircle className="w-3 h-3" />
          AI can make mistakes. In a life-threatening emergency, always call local authorities (911/112).
        </p>
      </div>
    </div>
  );
};