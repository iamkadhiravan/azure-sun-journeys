import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! 👋 Welcome to Unique World Tours. How can I help you plan your perfect Indian adventure today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickReplies = [
    "Show me tour packages",
    "What's included in the price?",
    "How do I book?",
    "Contact information",
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue.toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    if (userInput.includes("package") || userInput.includes("tour")) {
      return "We offer amazing tour packages across India! Check out our Golden Triangle, Kerala Backwaters, Himalayan Trek, and many more. Prices start from ₹15,999. Would you like to know more about a specific destination?";
    }
    if (userInput.includes("price") || userInput.includes("included")) {
      return "Our tour packages include accommodation, meals, guided tours, and transportation. Airport transfers and entry fees to monuments are also included. Any special requests can be discussed!";
    }
    if (userInput.includes("book") || userInput.includes("reserve")) {
      return "To book a package, simply click 'Book Now' on any tour card. You can also WhatsApp us at +91-XXXXXXXXXX for personalized assistance. Our team will guide you through the booking process!";
    }
    if (userInput.includes("contact") || userInput.includes("phone") || userInput.includes("whatsapp")) {
      return "You can reach us via:\n📱 WhatsApp: +91-XXXXXXXXXX\n📧 Email: info@uniqueworldtours.com\n🌐 Website: www.uniqueworldtours.com\n\nOur team is available 9 AM - 6 PM IST";
    }
    return "I'd be happy to help! You can ask me about our tour packages, pricing, booking process, or contact details. Or simply tell me what kind of experience you're looking for!";
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-lg hover:scale-110 transition-transform z-50"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col shadow-2xl z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <div>
            <h3 className="font-semibold">Unique World Tours</h3>
            <p className="text-xs opacity-90">Online now</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/20 p-1 rounded transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground shadow-sm"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Replies */}
      <div className="p-3 border-t bg-card">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleQuickReply(reply)}
              className="text-xs px-3 py-1 bg-muted hover:bg-muted/80 rounded-full transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-card rounded-b-lg">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
