import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Stack } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ScrollableFeed from "react-scrollable-feed";
import { useReactiveVar } from "@apollo/client";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import { socketVar, userVar } from "../../apollo/store";
import { REACT_APP_API_URL } from "../config";
import { RippleBadge } from "@/scss/MaterialTheme/styled";

interface MessagePayload {
  text: string;
  memberData: any;
}

const Chat = () => {

  const [liveMessages, setLiveMessages] = useState<MessagePayload[]>([]);
  const [aiMessages, setAiMessages] = useState<MessagePayload[]>([]);
  const [onlineUsers, setOnlineUsers] = useState(0);

  const [messageInput, setMessageInput] = useState("");
  const [open, setOpen] = useState(false);
  const [chatMode, setChatMode] = useState<"live" | "ai">("live");

  const [aiWelcomeShown, setAiWelcomeShown] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);

  const socket = useReactiveVar(socketVar);
  const user = useReactiveVar(userVar);

  const chatContentRef = useRef<HTMLDivElement>(null);

  /** SOCKET **/

  useEffect(() => {

    if (!socket) return;

    const handleMessage = (msg: MessageEvent) => {

      const data = JSON.parse(msg.data);

      if (data.event === "message") {
        setLiveMessages((prev) => [...prev, data]);
      }

      if (data.event === "getMessages") {
        setLiveMessages(data.list);
      }

      if (data.event === "onlineUsers") {
        setOnlineUsers(data.count);
      }

      if (data.event === "info" && data.totalClients !== undefined) {
        setOnlineUsers(data.totalClients);
      }

    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };

  }, [socket]);

  /** AI WELCOME **/

  useEffect(() => {

    if (chatMode === "ai" && !aiWelcomeShown) {

      const welcomeMessage = {
        text: `👋 Welcome to HanBooking AI Assistant.

				You can ask me about:
				• Hotels in South Korea
				• Resorts
				• Hostels
				• How to book accommodation

				How can I help you today?`,
        memberData: { _id: "ai" },
      };

      setAiMessages([welcomeMessage]);
      setAiWelcomeShown(true);

    }

  }, [chatMode]);

  /** INPUT **/

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  /** SEND MESSAGE **/

  const sendMessage = async () => {

    if (!messageInput.trim()) return;

    /** LIVE CHAT */

    if (chatMode === "live") {

      socket?.send(
        JSON.stringify({
          event: "message",
          data: messageInput,
        })
      );

    }

    /** AI CHAT */

    if (chatMode === "ai") {

      const userMsg = {
        text: messageInput,
        memberData: { _id: user?._id },
      };

      setAiMessages((prev) => [...prev, userMsg]);

      setAiTyping(true);

      try {

        const res = await fetch("/api/ai-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: messageInput,
          }),
        });

        const data = await res.json();

        const aiMsg = {
          text: data.reply || "AI javob bera olmadi",
          memberData: { _id: "ai" },
        };

        setTimeout(() => {

          setAiTyping(false);
          setAiMessages((prev) => [...prev, aiMsg]);

        }, 2500);

      } catch {

        setAiTyping(false);

        setAiMessages((prev) => [
          ...prev,
          {
            text: "AI bilan bog'lanishda xatolik.",
            memberData: { _id: "ai" },
          },
        ]);

      }

    }

    setMessageInput("");

  };

  const currentMessages = chatMode === "live" ? liveMessages : aiMessages;

  return (

    <Stack className="ai-chat-container">

      {/* CHAT TOGGLE */}

      <button
        className="ai-chat-toggle"
        onClick={() => setOpen(!open)}
      >
        {open ? <CloseRoundedIcon /> : <SmartToyRoundedIcon />}
      </button>

      {/* CHAT WINDOW */}

      <Stack className={`ai-chat-window ${open ? "show" : ""}`}>

        {chatMode === "live" && (

          <div className="online-users-badge">
            Online Users: <RippleBadge style={{ margin: '-2px 5px 0 10px' }} badgeContent={onlineUsers}/>
          </div>

        )}

        {/* HEADER */}

        <Box className="ai-chat-header">

          <div className="chat-tabs">

            <button
              className={chatMode === "live" ? "active" : ""}
              onClick={() => setChatMode("live")}
            >
              Live Chat
            </button>

            <button
              className={chatMode === "ai" ? "active" : ""}
              onClick={() => setChatMode("ai")}
            >
              AI Assistant
            </button>

          </div>

        </Box>

        {/* BODY */}

        <Box className="ai-chat-body" ref={chatContentRef}>

          <ScrollableFeed>

            {currentMessages.map((msg, i) => {

              const isMine = msg.memberData?._id === user?._id;
              const isAI = msg.memberData?._id === "ai";

              const memberImage = msg.memberData?.memberImage
                ? `${REACT_APP_API_URL}/${msg.memberData.memberImage}`
                : "/img/profile/defaultUser.svg";

              if (isAI) {

                return (

                  <div key={i} className="message other-message">

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      '@keyframes bounce': {
                          '0%':   { transform: 'translateY(0)' },
                          '100%': { transform: 'translateY(-10px)' },
                      },
                    }}>
                      <Avatar 
                          style={{ animation: 'bounce 0.8s infinite alternate ease-in-out' }} 
                          src="/img/ai.png" 
                      />
                    </Box>

                    <div className="bubble">{msg.text}</div>

                  </div>

                );

              }

              return isMine ? (

                <div key={i} className="message my-message">

                  <div className="bubble">{msg.text}</div>

                </div>

              ) : (

                <div key={i} className="message other-message">

                  <Avatar src={memberImage} />

                  <div className="bubble">{msg.text}</div>

                </div>

              );

            })}

            {chatMode === "ai" && aiTyping && (

              <div className="message other-message">

                <Avatar style={{ background: "#2a2d7b" }} src="/img/ai.png" />

                <div className="bubble typing">
                  typing...
                </div>

              </div>

            )}

          </ScrollableFeed>

        </Box>

        {/* INPUT */}

        <Box className="ai-chat-input">

          <input
            type="text"
            placeholder="Write message..."
            value={messageInput}
            onChange={handleInput}
            onKeyDown={handleKey}
          />

          <button onClick={sendMessage}>
            <SendRoundedIcon />
          </button>

        </Box>

      </Stack>

    </Stack>

  );

};

export default Chat;