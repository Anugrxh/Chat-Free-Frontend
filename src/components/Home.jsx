import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast, { Toaster } from "react-hot-toast";

// --- SVG Icon Components ---
const SendIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);
const PlusIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
const LogoutIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const GeminiLogo = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9l8 -4.5" />
    <path d="M12 12l8 -4.5" />
    <path d="M12 12v9" />
    <path d="M12 12l-8 -4.5" />
    <path d="M16 5.25l-8 4.5" />
  </svg>
);
const TrashIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);
const CopyIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);
const CheckIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
const HistoryIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

// --- CodeBlock Component ---
const CodeBlock = ({ language, code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-[#0d1117] rounded-xl my-2 border border-white/10">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-900/50">
        <p className="text-xs text-gray-400 font-sans">{language}</p>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {isCopied ? (
            <CheckIcon className="w-4 h-4 text-green-500" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
          {isCopied ? "Copied!" : "Copy code"}
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            padding: "1rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

// --- Main Home Component ---
export default function Home() {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    const fetchChats = async () => {
      if (!token) return;
      try {
        const response = await api.get("/chat");
        const fetchedChats = response.data.reverse();
        setChats(fetchedChats);
        if (fetchedChats.length > 0) {
          selectChat(fetchedChats[fetchedChats.length - 1]._id);
        } else {
          handleNewChat();
        }
      } catch (error) {
        console.error("Failed to fetch chats:", error);
        toast.error("Failed to load chat history");
      }
    };
    fetchChats();
  }, [token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectChat = async (chatId) => {
    if (chatId === activeChatId) return;
    setActiveChatId(chatId);
    setShowHistory(false);
    if (chatId === "new") {
      setMessages([]);
      return;
    }
    try {
      const response = await api.get(`/chat/${chatId}`);
      setMessages(response.data.messages || []);
      toast.success("Chat loaded successfully");
    } catch (error) {
      console.error("Failed to fetch chat messages:", error);
      toast.error("Failed to load chat messages");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    const userMessage = { sender: "user", text: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    try {
      let currentChatId = activeChatId;
      if (activeChatId === "new") {
        const chatResponse = await api.post("/chat/new", {
          title: trimmedInput,
        });
        const newChat = chatResponse.data;
        setChats((prev) => [...prev, newChat]);
        setActiveChatId(newChat._id);
        currentChatId = newChat._id;
        toast.success("New chat created");
      }
      const messageResponse = await api.post(`/chat/${currentChatId}/message`, {
        message: trimmedInput,
      });
      if (messageResponse.data && messageResponse.data.reply) {
        const botMessage = { sender: "bot", text: messageResponse.data.reply };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, an error occurred. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setActiveChatId("new");
    setMessages([]);
    setShowHistory(false);
    toast.success("Started new conversation");
  };

  const handleDeleteChat = async (chatIdToDelete) => {
    try {
      await api.delete(`/chat/${chatIdToDelete}`);
      const updatedChats = chats.filter((c) => c._id !== chatIdToDelete);
      setChats(updatedChats);

      if (activeChatId === chatIdToDelete) {
        if (updatedChats.length > 0) {
          selectChat(updatedChats[updatedChats.length - 1]._id);
        } else {
          handleNewChat();
        }
      }
      toast.success("Chat deleted successfully");
    } catch (error) {
      console.error("Failed to delete chat:", error);
      toast.error("Failed to delete chat");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      performLogout();
    }
  };

  const performLogout = async () => {
    try {
      await api.post("/logout");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Server logout failed:", error);
    } finally {
      logout();
      navigate("/");
    }
  };

  const getChatTitle = () => {
    if (activeChatId === "new") return "New Conversation";
    return chats.find((c) => c._id === activeChatId)?.title || "ChatFree";
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-200 font-sans overflow-hidden relative">
      {/* Toaster */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "16px",
            color: "white",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "white",
            },
          },
        }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-white/10 bg-black/20 backdrop-blur-xl relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <div className="w-6 h-6 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-sm font-bold text-white">CF</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              ChatFree
            </h1>
            <p className="text-sm text-white/60">{getChatTitle()}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* New Chat Button */}
          <motion.button
            onClick={handleNewChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            <PlusIcon className="w-5 h-5" />
            <span className="hidden sm:inline">New</span>
          </motion.button>

          {/* History Button */}
          <motion.button
            onClick={() => setShowHistory(!showHistory)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl shadow-lg transition-all duration-300 ${
              showHistory
                ? "bg-white/20 text-white border border-white/30"
                : "bg-white/10 text-white/70 hover:bg-white/15"
            }`}
          >
            <HistoryIcon className="w-5 h-5" />
            <span className="hidden sm:inline">History</span>
          </motion.button>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center font-bold text-white shadow-lg text-sm">
                {user?.username?.charAt(0).toUpperCase() || "?"}
              </div>
              <span className="hidden md:inline text-white/80 text-sm">
                {user?.username}
              </span>
            </div>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
              title="Logout"
            >
              <LogoutIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-88px)] relative">
        {/* Chat History Overlay */}
        <AnimatePresence>
          {showHistory && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 z-30"
                onClick={() => setShowHistory(false)}
              />
              <motion.div
                initial={{ x: -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -400, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute left-0 top-0 bottom-0 w-80 bg-black/30 backdrop-blur-2xl border-r border-white/10 z-40 overflow-y-auto"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Chat History
                  </h3>
                  <div className="space-y-2">
                    {activeChatId === "new" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-white/20 border border-white/30 text-white shadow-lg backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          New Conversation
                        </div>
                      </motion.div>
                    )}

                    {chats.map((chat, index) => (
                      <motion.div
                        key={chat._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`group p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                          activeChatId === chat._id
                            ? "bg-white/20 border border-white/30 text-white shadow-lg backdrop-blur-sm"
                            : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            onClick={() => selectChat(chat._id)}
                            className="flex-1 flex items-center gap-3"
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                activeChatId === chat._id
                                  ? "bg-purple-400"
                                  : "bg-gray-500"
                              }`}
                            ></div>
                            <span className="text-sm font-medium truncate">
                              {chat.title.length > 20
                                ? `${chat.title.substring(0, 20)}...`
                                : chat.title}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChat(chat._id);
                            }}
                            className="p-2 text-red-400 rounded-xl hover:bg-red-500/20 transition-all duration-200"
                            title="Delete"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative z-10">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg._id || i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`flex items-start gap-3 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${
                      msg.sender === "user" ? "bg-blue-600" : "bg-indigo-600"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      user?.username?.charAt(0).toUpperCase() || "U"
                    ) : (
                      <GeminiLogo className="w-5 h-5" />
                    )}
                  </div>

                  <div
                    className={`px-5 py-4 rounded-3xl text-sm shadow-xl border backdrop-blur-xl break-words prose prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-2 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white border-purple-400/30 rounded-br-lg shadow-purple-500/25"
                        : "bg-white/10 text-gray-200 border-white/20 rounded-bl-lg"
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          const codeString = String(children).replace(
                            /\n$/,
                            ""
                          );
                          return !inline && match ? (
                            <CodeBlock
                              language={match[1]}
                              code={codeString}
                              {...props}
                            />
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 flex-row"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shrink-0 bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg">
                    <GeminiLogo className="w-5 h-5 animate-spin" />
                  </div>
                  <div className="px-5 py-4 rounded-3xl text-sm shadow-xl border border-white/20 backdrop-blur-xl max-w-lg bg-white/10 text-gray-300 rounded-bl-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span>Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="px-6 pb-6">
            <form onSubmit={handleSend} className="relative">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-4 hover:bg-white/15 transition-all duration-300">
                <input
                  type="text"
                  placeholder="Message ChatFree..."
                  className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none text-lg"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!input.trim() || isLoading}
                >
                  <SendIcon className="w-6 h-6" />
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
