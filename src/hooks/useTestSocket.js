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

    console.log("🔌 Connecting to /students namespace...");
    const socket = io(import.meta.env.VITE_BACKEND_API + "/students", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Student socket connected:", socket.id);
      socket.emit("register", userId);
    });

    socket.on("disconnect", () => {
      console.log("❌ Student socket disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("🔴 Socket connection error:", error);
    });

    return () => {
      console.log("🔌 Disconnecting socket...");
      socket.disconnect();
    };
  }, [userId]);

  const startTest = (testId, testTitle) => {
    if (socketRef.current && userId) {
      console.log("🎯 Emitting startTest:", { userId, testId, testTitle });
      socketRef.current.emit("startTest", {
        userId,
        testId,
        testTitle,
      });
    } else {
      console.warn(
        "⚠️ Cannot start test: socket not connected or userId missing"
      );
    }
  };

  const finishTest = (testId, score, successRate) => {
    if (socketRef.current && userId) {
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
  };
};
