import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [uploaded, setUploaded] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [user]);
  //Login user
  const login = async ({ username, password }) => {
    try {
      setLoading(true);

      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });

      if (res.data.success) {
        loadUser();
        setisAuthenticated(true);
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };
  // Register user
  const register = async ({ firstName, lastName, email, password }) => {
    try {
      setLoading(true);

      const res = await axios.post(`${process.env.API_URL}/api/register/`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      console.log(res.data);

      if (res.data.message) {
        setLoading(false);
        router.push("/login");
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };
  // Update Profile
  const updateProfile = async ({ firstName, lastName, email, password }) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${process.env.API_URL}/api/me/update/`,
        { first_name: firstName, last_name: lastName, email, password },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data) {
        setLoading(false);
        setUser(res.data);
        setUpdated(true);
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };
  // Uplaod Resume
  const uploadResume = async (formData, access_token) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${process.env.API_URL}/api/upload/resume/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data) {
        setLoading(false);
        setUploaded(true);
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };
  const loadUser = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/auth/user");

      if (res.data.user) {
        loadUser();
        setisAuthenticated(true);
        setLoading(false);
        setUser(res.data.user);
      }
    } catch (error) {
      setLoading(false);
      setisAuthenticated(false);
      setUser(null);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };
  // Logout user
  const logout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");

      if (res.data.success) {
        setisAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  //clear errors
  const clearErrors = () => {
    setError(null);
  };
  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        error,
        isAuthenticated,
        login,
        register,
        clearErrors,
        logout,
        uploaded,
        uploadResume,
        setUploaded,
        updated,
        updateProfile,
        setUpdated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
