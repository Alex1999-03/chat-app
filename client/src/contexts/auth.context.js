import { createContext, useContext, useState } from "react";
import Socket from "../services/socket";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const socket = Socket.getInstance();

  const signIn = async (data) => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      return false;
    } 

    const user = await response.json();
    setAuth(user);
    socket.connect();
    return true;
  };

  const signOut = () => {
    setAuth(null);
    socket.disconnect();
  };

  const signUp = async (data) => {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if(response.status === 409) {
      return false;
    }

    const newUser = await response.json();
    setAuth(newUser);
    socket.connect();
    return true;
  };

  let value = { auth, signIn, signOut, signUp };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
