import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface LeadInfo {
  name?: string;
  email?: string;
  phone?: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "G'day! 👋 I'm the Troweled Earth assistant. I can help you find the perfect plaster finish for your project.\n\nWhat are you working on today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/TEM--V2/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId,
          conversationHistory: messages
        })
      });

      const data = await response.json();

      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
      }

      if (data.leadInfo) {
        setLeadInfo(prev => ({ ...prev, ...data.leadInfo }));
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Show lead form after a few exchanges
      if (messages.length >= 4 && !leadInfo.email) {
        setTimeout(() => setShowLeadForm(true), 2000);
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting. Please try again or contact us directly at 0439 243 055.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save lead to Supabase
      const response = await fetch('/TEM--V2/api/chat', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadInfo,
          sessionId,
          productsInterested: messages
            .filter(m => m.role === 'assistant')
            .flatMap(m => {
              const matches = m.content.match(/\*\*([A-Za-z\s]+)\*\*/g);
              return matches ? matches.map(m => m.replace(/\*\*/g, '')) : [];
            })
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save lead');
      }
    } catch (error) {
      console.error('Lead save error:', error);
    }
    
    setShowLeadForm(false);
    
    const thankYouMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Thanks ${leadInfo.name || 'for your details'}! 🎉 We'll be in touch soon to discuss your project. In the meantime, feel free to keep asking questions!`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, thankYouMessage]);
  };

  const quickQuestions = [
    "What's best for bathrooms?",
    "Tell me about Marbellino",
    "Can I get a quote?",
    "Do you offer training?"
  ];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#8b7355] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#a68b6a] transition-colors ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px]"
          >
            {/* Jose Avatar - hanging over the top */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10">
              <img 
                src="/TEM--V2/images/jose-chat-avatar.png" 
                alt="Jose" 
                className="w-20 h-20 rounded-full object-cover border-4 border-[#8b7355] shadow-lg bg-white"
              />
            </div>

            {/* Chat container */}
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden h-full mt-10">
              {/* Header */}
              <div className="bg-[#1a1a1a] text-white pt-8 pb-4 px-5 flex items-center justify-between">
                <div className="flex-1 text-center">
                  <h3 className="font-semibold text-lg">Jose from Troweled Earth</h3>
                  <p className="text-sm text-white/60">Ask me anything</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-12 right-4 text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f5f5f0]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-[#8b7355] text-white rounded-br-md'
                        : 'bg-white text-[#1a1a1a] rounded-bl-md shadow-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap"
                       dangerouslySetInnerHTML={{ 
                         __html: msg.content
                           .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                           .replace(/\n/g, '<br/>') 
                       }}
                    />
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#8b7355] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-[#8b7355] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-[#8b7355] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions (show only at start) */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 bg-white border-t border-[#f5f5f0]">
                <p className="text-xs text-[#1a1a1a]/50 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => setInput(q)}
                      className="text-xs px-3 py-1 bg-[#f5f5f0] text-[#1a1a1a]/70 rounded-full hover:bg-[#8b7355] hover:text-white transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lead Form */}
            {showLeadForm && !leadInfo.email && (
              <div className="p-4 bg-[#8b7355]/10 border-t border-[#8b7355]/20">
                <p className="text-sm font-medium text-[#1a1a1a] mb-2">📩 Get personalized recommendations</p>
                <form onSubmit={handleLeadSubmit} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={leadInfo.name || ''}
                    onChange={(e) => setLeadInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#8b7355]/30 focus:outline-none focus:border-[#8b7355]"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={leadInfo.email || ''}
                    onChange={(e) => setLeadInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#8b7355]/30 focus:outline-none focus:border-[#8b7355]"
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 px-3 py-2 bg-[#8b7355] text-white text-sm rounded-lg hover:bg-[#a68b6a] transition-colors"
                    >
                      Send
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowLeadForm(false)}
                      className="px-3 py-2 text-[#1a1a1a]/50 text-sm hover:text-[#1a1a1a] transition-colors"
                    >
                      Later
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 bg-white border-t border-[#f5f5f0]">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-[#f5f5f0] text-[#1a1a1a] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#8b7355]/30 placeholder:text-[#1a1a1a]/50"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-[#8b7355] text-white rounded-full flex items-center justify-center hover:bg-[#a68b6a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
