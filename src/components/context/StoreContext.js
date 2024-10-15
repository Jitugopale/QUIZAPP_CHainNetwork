import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const url = "http://localhost:5002"; // Adjust base URL as needed

  // Fetch token from localStorage if it exists
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle registration
  const handleRegister = async (navigate) => {
    // Validate password and confirmation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setError(""); // Reset error before making the request
    try {
      const response = await axios.post(`${url}/api/auth/createUser`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Error during registration. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle login
  const handleLogin = async (navigate) => {
    setLoading(true);
    setError(""); // Reset error before making the request
    try {
      const response = await axios.post(`${url}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        setSuccess("Login successful!");
        navigate("/topics"); // Redirect to topic selection page
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("Error during login. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch quiz topics
  const fetchTopics = async () => {
    setLoading(true);
    setError(""); // Reset error before making the request
    try {
      const response = await axios.get(`${url}/api/topics/select`, {
        headers: { "auth-token": token }, // Use 'auth-token' instead of 'Bearer'
      });
      setTopics(response.data);
    } catch (error) {
      setError("Failed to fetch topics. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch questions based on selected topic
  const fetchQuestions = async (topic) => {
    setLoading(true);
    setError(""); // Reset error before making the request
    try {
      const response = await axios.get(`${url}/api/quiz/questions/${topic}`, {
        headers: { "auth-token": token }, // Use 'auth-token'
      });
      setSelectedQuestions(response.data);
      setCurrentQuestionIndex(0);
      setAnswers([]); // Reset answers for new quiz
    } catch (error) {
      setError("Failed to fetch questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to submit answers and get results
  const submitAnswers = async () => {
    setLoading(true);
    setError(""); // Reset error before making the request
    try {
      const response = await axios.post(
        `${url}/api/quiz/results`,
        { answers },
        {
          headers: { "auth-token": token }, // Use 'auth-token'
        }
      );

      if (response.data.success) {
        setQuizResults(response.data.results);
        fetchLeaderboard(); // Fetch leaderboard after submitting results
      } else {
        setError("Error submitting answers. Please try again.");
      }
    } catch (error) {
      setError("Error submitting answers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch leaderboard
  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(""); // Reset error before making the request
    try {
      const response = await axios.get(`${url}/api/quiz/leaderboard`, {
        headers: { "auth-token": token }, // Use 'auth-token'
      });
      setLeaderboard(response.data);
    } catch (error) {
      setError("Failed to fetch leaderboard. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        token,
        setToken,
        topics,
        selectedQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        formData,
        setFormData, // Provide setFormData
        handleInputChange,
        error,
        setError,
        success,
        setSuccess,
        loading,
        setLoading,
        handleRegister, // Provide registration function to context
        handleLogin, // Provide login function to context
        fetchTopics,
        fetchQuestions,
        answers,
        setAnswers,
        submitAnswers,
        quizResults,
        setQuizResults,
        leaderboard,
        fetchLeaderboard,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
