import React, { useState } from "react";
import { Send, Bot, User, Mic, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../contexts/AppContext";
import { ChatMessage } from "../types";

const ChatAssistant: React.FC = () => {
  const { chatMessages, setChatMessages, currentLanguage, setCurrentLanguage } = useApp();
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sampleQuestions = [
    { text: "My baby has a mild fever", img: 'https://cbx-prod.b-cdn.net/COLOURBOX51887813.jpg?height=800&quality=70&width=800' },
    { text: "Where can I get free vaccination near me", img: 'https://www.shutterstock.com/image-vector/baby-receiving-vaccination-doctor-600nw-2343151247.jpg' },
    { text: "What foods should I give during weaning", img: "https://img.freepik.com/free-vector/doctor-giving-injection-baby-vaccination-campaign-flat-vector-illustration_1284-67449.jpg" },
    { text: "How to handle night feeding schedules", img: 'https://www.shutterstock.com/shutterstock/photos/1709942719/display_1500/stock-vector-sick-child-mother-and-kid-the-image-of-the-mother-taking-care-of-the-baby-child-at-fever-flu-1709942719.jpg' },
    { text: "When should I start solid foods", img: "https://www.shutterstock.com/shutterstock/photos/1709942719/display_1500/stock-vector-sick-child-mother-and-kid-the-image-of-the-mother-taking-care-of-the-baby-child-at-fever-flu-1709942719.jpg" },
  ];

  const responses: Record<string, { text: string; image: string }> = {
    fever: {
      text: "Ensure hydration and monitor temperature... consult pediatrician if above 38°C.",
      image: 'https://cbx-prod.b-cdn.net/COLOURBOX51887813.jpg?height=800&quality=70&width=800',
    },
    vaccination: {
      text: "Visit your nearest clinic for free immunization under national program.",
      image: 'https://www.shutterstock.com/image-vector/baby-receiving-vaccination-doctor-600nw-2343151247.jpg',
    },
    weaning: {
      text: "Start weaning around 6 months with soft purees like ragi, banana.",
      image: "https://img.freepik.com/free-vector/doctor-giving-injection-baby-vaccination-campaign-flat-vector-illustration_1284-67449.jpg",
    },
    feeding: {
      text: "Night feeds every 2‑3 hours; dim lights to help sleep routines.",
      image: 'https://www.shutterstock.com/shutterstock/photos/1709942719/display_1500/stock-vector-sick-child-mother-and-kid-the-image-of-the-mother-taking-care-of-the-baby-child-at-fever-flu-1709942719.jpg',
    },
    solid: {
      text: "Begin solids at 6 months when baby shows readiness, start with single foods.",
      image: "https://www.shutterstock.com/shutterstock/photos/1709942719/display_1500/stock-vector-sick-child-mother-and-kid-the-image-of-the-mother-taking-care-of-the-baby-child-at-fever-flu-1709942719.jpg",
    },
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      language: currentLanguage,
    };
    setChatMessages([...chatMessages, msg]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const key = Object.keys(responses).find((k) => inputMessage.toLowerCase().includes(k));
      const resp = key ? responses[key] : {
        text: "I can help with baby care—ask me anything!",
        image: "https://via.placeholder.com/400?text=Help",
      };
      const aiMsg: ChatMessage & { image?: string } = {
        id: (Date.now() + 1).toString(),
        content: resp.text,
        sender: "assistant",
        timestamp: new Date(),
        language: currentLanguage,
      };
      (aiMsg as any).imageUrl = resp.image;
      setChatMessages([...chatMessages, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-[#fdfbf7]">
      {/* Header */}
      <div className="p-4 bg-[#f5efe8] shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-[#8b5e34] to-[#b58857] p-2 rounded-full shadow">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-[#5a3821] font-semibold text-lg">AI Care Assistant</h2>
            <p className="text-[#7a5a3a] text-sm">Pregnancy & Baby Care</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select title="language" value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}
            className="bg-white border text-sm px-2 py-1 rounded">
            <option value="english">English</option>
            <option value="hindi">हिंदी</option>
          </select>
          <Languages className="w-4 h-4 text-[#7a5a3a]" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 ? (
          <div className="text-center space-y-4">
            {sampleQuestions.map((q, i) => (
              <button key={i} onClick={() => setInputMessage(q.text)}
                className="w-full flex items-center bg-white p-3 rounded-lg shadow hover:bg-gray-100 transition">
                <img src={q.img} alt="" className="w-32 h-44 rounded mr-3 object-cover" />
                <span className="text-sm text-[#5a3821]">{q.text}</span>
              </button>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            {chatMessages.map((msg) => (
              <motion.div key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {msg.sender === "assistant" && (msg as any).imageUrl && (
                  <img src={(msg as any).imageUrl} alt="" className="w-full max-h-48 object-cover rounded-lg mb-2" />
                )}
                <div className={`flex items-start max-w-[80%] ${msg.sender === "user" ? "ml-auto" : ""}`}>
                  {msg.sender === "assistant" ? <Bot className="w-5 h-5 text-[#7a5a3a] mr-2" /> 
                    : <User className="w-5 h-5 text-blue-500 mr-2" />}
                  <div className={`p-3 rounded-lg shadow ${msg.sender === "assistant" ? "bg-white text-[#5a3821]" : "bg-blue-500 text-white"}`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {msg.timestamp.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        {isTyping && (
          <div className="flex items-start space-x-2">
            <Bot className="w-5 h-5 text-[#7a5a3a]" />
            <div className="p-3 bg-white rounded-lg shadow">
              <div className="flex space-x-1">
                <motion.div className="w-2 h-2 bg-[#b58857] rounded-full" animate={{ opacity: [0,1,0] }} transition={{ repeat: Infinity, duration: 1 }} />
                <motion.div className="w-2 h-2 bg-[#b58857] rounded-full" animate={{ opacity: [0,1,0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} />
                <motion.div className="w-2 h-2 bg-[#b58857] rounded-full" animate={{ opacity: [0,1,0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#f5efe8] flex items-center space-x-2">
        <button title="mic" className="text-[#7a5a3a] p-2 hover:text-[#5a3821]"><Mic className="w-5 h-5" /></button>
        <input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-2 rounded-full border placeholder-gray-400 focus:ring-2 focus:ring-[#b58857]" 
          placeholder="Ask your question..." />
        <button title="disabled" onClick={handleSend} disabled={!inputMessage.trim()}
          className="bg-[#8b5e34] text-white p-2 rounded-full disabled:opacity-50">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
