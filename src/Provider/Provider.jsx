/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import setAuthToken from "../config/setAuthToken";
import { BASE_URL } from "../config/constant";
import socket from "../utils/soket";
import Swal from "sweetalert2";
import myData from "../hooks/users/myData";

const CallContext = createContext();

export const Provider = ({ children }) => {
  const navigate = useNavigate();

  // Global states
  const [incomingCall, setIncomingCall] = useState(null);
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myInfo, setMyInfo] = useState(null);
  const [minutes, setMinutes] = useState(0);
  const [isInCall, setIsInCall] = useState(false);
  const [startTime, setStartTime] = useState(null);
  console.log(minutes);

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser({});
    Swal.fire({
      title: "Successful",
      text: "You have logged out!",
      icon: "success",
    });
    navigate("/");
  };

  // ✅ INIT LOGIC (moved from your init.js)
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      document.addEventListener("gesturestart", (e) => {
        e.preventDefault();
      });

      // Version check
      if (localStorage.getItem("app") !== "Virtual 2.x.x") {
        localStorage.clear();
        localStorage.setItem("app", "Virtual 2.x.x");
      }

      let token = localStorage.getItem("token");
      let userString = localStorage.getItem("user");
      let user = userString ? JSON.parse(userString) : null;

      if (token) {
        const decoded = jwtDecode(token, { complete: true });
        const dateNow = new Date();
        const isExpired = decoded.exp * 1000 < dateNow.getTime();

        let result;
        if (!isExpired) {
          try {
            const res = await axios.post(`${BASE_URL}/auth/check-user`, {
              id: decoded.id,
            });
            result = res.data;
          } catch (err) {
            console.log(err);
            result = null;
          }
        }

        if (!result || result.error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          token = null;
          user = null;
        }
      }

      if (token) {
        setAuthToken(token);
      }

      // Push values into global state
      setToken(token);
      setUser(user);
      setLoading(false);
    };

    init();
  }, []);

  // ✅ SOCKET HANDLING
  useEffect(() => {
    if (!socket || !user) return;

    socket.on("connection", () => {
      console.log("✅ Socket connected");
    });

    if (user) {
      socket.emit("register", user.id);
    }

    socket.on("incoming-call", ({ from, roomName }) => {
      setIncomingCall({ from, roomName });
      setModalOpen(true);
    });

    socket.on("call-accepted", ({ roomName, peerSocketId }) => {
      navigate(
        `/room?roomName=${roomName}&username=${user.name}&peerSocketId=${peerSocketId}`
      );
    });

    socket.on("call-declined", () => {});
    socket.on("callCanceled", (data) => {
      if (data.success) {
        setModalOpen(false);
        setIncomingCall(null);
      }
    });

    return () => {
      socket.off("incoming-call");
      socket.off("call-accepted");
      socket.off("call-declined");
      socket.off("callCanceled");
    };
  }, [user, navigate]);

  useEffect(() => {
    if (user?.id) {
      const fetch = async () => {
        const { data } = await myData({ id: user?.id });
        if (data.success) {
          setMyInfo(data.data);
        }
      };
      fetch();
    }
  }, [token, user]);

  // ✅ Helper functions
  const declineCall = useCallback(() => {
    if (!incomingCall) return;
    socket.emit("call-declined", { guestSocketId: incomingCall.from.socketId });
    setModalOpen(false);
    setIncomingCall(null);
  }, [incomingCall]);

  const getRemainingDays = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  useEffect(() => {
    let interval;
    if (isInCall && startTime) {
      interval = setInterval(() => {
        const diff = Math.floor((Date.now() - startTime) / 1000 / 60);
        setMinutes(diff);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInCall, startTime]);

  const acceptCall = useCallback(() => {
    if (!incomingCall) return;

    if (
      myInfo?.subscription?.minute <= 0 ||
      getRemainingDays(myInfo?.subscription?.endDate) <= 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Plan expired or minutes exhausted",
      });
      return;
    }

    socket.emit("call-accepted", {
      roomName: incomingCall.roomName,
      guestSocketId: incomingCall.from.socketId,
    });
    setModalOpen(false);
    setIsInCall(true);
    setStartTime(Date.now());
    setMinutes(0);

    navigate(
      `/room?roomName=${incomingCall.roomName}&username=${user.name}&peerSocketId=${incomingCall.from.socketId}`
    );
  }, [incomingCall, navigate, user, myInfo]);

  // ✅ Data available everywhere
  const data = {
    incomingCall,
    declineCall,
    acceptCall,
    modalOpen,
    user,
    setUser,
    token,
    setToken,
    logout,
    loading,
  };

  return <CallContext.Provider value={data}>{children}</CallContext.Provider>;
};

export const useCall = () => useContext(CallContext);
