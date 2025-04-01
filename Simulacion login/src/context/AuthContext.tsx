import { createContext, useContext, useEffect, useState } from "react";

export interface userData {
  correo: string;
  password: string;
  rol: "admin" | "user";
}

interface AuthContextProps {
  user: userData | null;
  authenticated: boolean;
  login: (user: userData) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const isTestEnv = import.meta.env.MODE === "test";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<userData | null>(null);


  useEffect(() => {
    if (isTestEnv) return;
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try{
        const parsedUser = JSON.parse(storedUser);
        if(parsedUser.validationKey===import.meta.env.VITE_APP_VALIDATION_KEY) {

          setUser(JSON.parse(storedUser));
        }else{
          console.error("Invalid validation key");
          sessionStorage.removeItem("user");
          setUser(null);
        }

      }
      catch (error) {
        console.error("Error parsing user data from sessionStorage", error);
        sessionStorage.removeItem("user");
        setUser(null);
      }
    }
  }, []);

  const login = (userData: userData) => {
    if (isTestEnv) return;

    const validationKey=import.meta.env.VITE_APP_VALIDATION_KEY;
    const userWithValidation = {
      ...userData,
      validationKey,
    };
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userWithValidation));
  };

  const logout = () => {
    if (isTestEnv) return;
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return <AuthContext.Provider value={{ user, login, logout, authenticated:!!user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de un AuthProvider");
  }
  return context;
};
