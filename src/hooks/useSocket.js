import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export const useSocket = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);

  const loadOldNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/mentor/notifications`, // Используем общий эндпоинт для получения уведомлений
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  useEffect(() => {
    if (!userId) return;

    loadOldNotifications();

    const socket = io(import.meta.env.VITE_BACKEND_API + "/students", {
      transports: ["websocket"],
      reconnection: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("register", userId);
    });

    socket.on("notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      
      // Браузерное уведомление
      if (Notification.permission === "granted") {
        new Notification(notification.title, { body: notification.text });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const markAsViewed = (notificationId) => {
    if (socketRef.current) {
      socketRef.current.emit("markAsViewed", notificationId);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, status: "viewed" } : n
        )
      );
    }
  };

  return { notifications, markAsViewed };
};