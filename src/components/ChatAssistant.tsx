import React, { useState } from "react";
import { Send, Bot, User, Mic, Languages } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { ChatMessage } from "../types";

const ChatAssistant: React.FC = () => {
  const { chatMessages, setChatMessages, currentLanguage, setCurrentLanguage } =
    useApp();
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const languages = [
    { code: "english", label: "English" },
    { code: "hindi", label: "हिंदी" },
    { code: "regional", label: "Regional" },
  ];

  const sampleQuestions = [
    "My baby has a mild fever, what should I do?",
    "Where can I get free vaccination near me?",
    "What foods should I give during weaning?",
    "How to handle night feeding schedules?",
    "When should I start solid foods?",
  ];

  const simulateAIResponse = (userMessage: string): string => {
    const responses: { [key: string]: string } = {
      fever:
        "For mild fever in babies, ensure proper hydration and monitoring. If temperature exceeds 100.4°F (38°C) or baby seems uncomfortable, consult a pediatrician immediately. You can use tepid sponging and ensure room is well-ventilated.",
      vaccination:
        "For free vaccinations, visit your nearest Anganwadi center or Primary Health Center (PHC). Most childhood vaccines are provided free under the Universal Immunization Programme. You can also check the CoWIN portal for nearby vaccination centers.",
      weaning:
        "Start weaning around 6 months with single-ingredient foods like rice cereal, mashed banana, or well-cooked dal water. Introduce one new food every 3-4 days to check for allergies. Traditional foods like khichdi, ragi porridge are excellent choices.",
      feeding:
        "For night feeding, try to establish a routine. Feed every 2-3 hours for newborns. As baby grows, gradually extend intervals. Keep room dimly lit during night feeds to maintain sleep cycles.",
      solid:
        "Introduce solid foods around 6 months when baby can sit with support and shows interest in food. Start with single-ingredient purees and gradually increase texture and variety.",
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return "I understand your concern. For specific medical advice, please consult with your pediatrician. However, I can provide general guidance on baby care, nutrition, and development milestones. Feel free to ask specific questions!";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      language: currentLanguage,
    };

    setChatMessages([...chatMessages, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: simulateAIResponse(inputMessage),
        sender: "assistant",
        timestamp: new Date(),
        language: currentLanguage,
      };

      setChatMessages([...chatMessages, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="flex flex-col h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">AI Care Assistant</h2>
              <p className="text-sm text-gray-600">
                Ask me anything about baby care
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <select
              title="language"
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-2 py-1"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
            <Languages className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 ? (
          <div className="text-center py-8">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl">
              <Bot className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Welcome to AI Care Assistant
              </h3>
              <p className="text-gray-600 mb-4">
                I'm here to help with your baby care questions. Try asking
                about:
              </p>
              <div className="space-y-2">
                {sampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="block w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <span className="text-sm text-gray-700">{question}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    message.sender === "user" ? "bg-blue-500" : "bg-gray-200"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="p-2 rounded-full bg-gray-200">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
              <div className="p-3 rounded-lg bg-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <button
            title="button"
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            <Mic className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask your question here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            title="message"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
