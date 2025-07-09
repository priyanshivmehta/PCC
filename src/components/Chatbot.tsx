// src/components/Chatbot.tsx

import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Check if already injected
    if (window.botpressWebChat) {
      window.botpressWebChat.init({
        botId: "your-bot-id",
        hostUrl: "https://cdn.botpress.cloud/webchat/v3",
        clientId: "your-bot-id",
        botName: "DeliCare Assistant",
        showPoweredBy: false,
      });
      return;
    }

    // Inject Botpress WebChat script
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v3.1/inject.js";
    script.async = true;
    script.onload = () => {
      window.botpressWebChat.init({
        botId: "your-bot-id", // 🔁 Replace this with your bot ID
        hostUrl: "https://cdn.botpress.cloud/webchat/v3",
        clientId: "your-bot-id", // 🔁 Same here
        botName: "DeliCare Assistant",
        showPoweredBy: false,
      });
    };

    document.body.appendChild(script);
  }, []);

  return null; // Nothing is rendered on screen directly
};

export default Chatbot;
