import React, { createContext } from "react";

const AuthContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const user = await authService.getCurrentUser();

      setUser(user);
    } catch (error) {
      localStorage.removeItem("token");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const data = await authService.login(email, password);

    localStorage.setItem("token", data.token);

    setUser(data.user);
  };

  const logout = async () => {
    await authService.logout();

    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
