// src/context/NotificationContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import * as Stomp from "stompjs";
import axios from "axios";
import { useAuth } from "../components/AuthContext";

import API from "./config/axiosConfig";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  userId: string;
  read: boolean;
  timestamp: Date;
  data: any;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: any) => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const userId = localStorage.getItem("id");

    // Load initial notifications from backend
    API.get(`/notifications/${userId}`).then((res) => {
      const list = res.data.map((n: any) => ({
        id: n.id,
        title: n.type,
        message: n.message,
        type: n.type,
        userId: n.userid,
        read: n.read,
        timestamp: new Date(n.createdAt),
        data: {},
      }));

      setNotifications(list);
      setUnreadCount(list.filter((n: any) => !n.read).length);
    });

    // WebSocket Connection
    const sock = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(sock);

    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/user/${userId}`, (msg) => {
        const incoming = JSON.parse(msg.body);

        const formatted: NotificationItem = {
          id: incoming.id,
          title: incoming.type,
          message: incoming.message,
          type: incoming.type,
          userId: incoming.userid,
          read: incoming.read,
          timestamp: new Date(incoming.createdAt),
          data: {},
        };

        // Insert at top
        setNotifications((prev) => [formatted, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });
    });

    return () => {
      try {
        stompClient.disconnect();
      } catch (_) {}
    };
  }, [user]);

  // Mark single notification
  const markAsRead = (id: string) => {
    API.put(`/notifications/read/${id}`).then(() => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    });
  };

  // Mark all notifications
  const markAllAsRead = () => {
    const userId = localStorage.getItem("id");

    API.put(`/notifications/read_all/${userId}`).then(() => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    });
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
