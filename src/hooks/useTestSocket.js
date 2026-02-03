// src/hooks/useTestSocket.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useTestSocket = (userId) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) {
      console.warn("⚠️ useTestSocket: userId is missing");
      return;
    }

    const backendUrl = import.meta.env.VITE_BACKEND_API;
    console.log("🔌 Connecting to:", backendUrl + "/students");

    const socket = io(backendUrl + "/students", {
      transports: ["websocket", "polling"], // ✅ оба транспорта
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10, // увеличено
      timeout: 20000,
      forceNew: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Student socket connected:", socket.id);
      console.log("🔄 Transport:", socket.io.engine.transport.name);
      socket.emit("register", userId);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Student socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("🔴 Socket connection error:", error.message);
      console.error("Details:", {
        type: error.type,
        description: error.description,
      });
    });

    // Дебаг транспорта
    socket.io.engine.on("upgrade", (transport) => {
      console.log("⬆️ Transport upgraded to:", transport.name);
    });

    return () => {
      console.log("🔌 Disconnecting socket...");
      socket.disconnect();
    };
  }, [userId]);

  const startTest = (testId, testTitle) => {
    if (socketRef.current && socketRef.current.connected && userId) {
      console.log("🎯 Emitting startTest:", { userId, testId, testTitle });
      socketRef.current.emit("startTest", {
        userId,
        testId,
        testTitle,
      });
    } else {
      console.warn(
        "⚠️ Cannot start test:",
        !socketRef.current
          ? "socket not initialized"
          : !socketRef.current.connected
            ? "socket not connected"
            : "userId missing"
      );
    }
  };

  const finishTest = (testId, score, successRate) => {
    if (socketRef.current && socketRef.current.connected && userId) {
      console.log("✅ Emitting finishTest:", {
        userId,
        testId,
        score,
        successRate,
      });
      socketRef.current.emit("finishTest", {
        userId,
        testId,
        score,
        successRate,
      });
    } else {
      console.warn(
        "⚠️ Cannot finish test: socket not connected or userId missing"
      );
    }
  };

  return {
    startTest,
    finishTest,
    socket: socketRef.current,
    isConnected: socketRef.current?.connected || false,
  };
};
