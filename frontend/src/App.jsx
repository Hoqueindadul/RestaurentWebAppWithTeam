import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Nonveg from "./components/subcomponents/Nonveg";
import Veg from "./components/subcomponents/Veg";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import SignupForm from "./components/SignupForm";
import Login from "./components/Login";
import Booking from "./components/subcomponents/Booking";
import RecipeDetails from "./components/RecipeDetails";
import ThankYou from "./components/ThankYou";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import fooddata from "./recipes.json";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { loggedInUsername } = useAuth();
  return loggedInUsername ? children : <Navigate to="/login" />;
};

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(fooddata);
    Aos.init();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/signupForm" element={<SignupForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/veg" element={<ProtectedRoute><Veg /></ProtectedRoute>} />
          <Route path="/nonveg" element={<ProtectedRoute><Nonveg /></ProtectedRoute>} />
          <Route path="/gallery" element={<ProtectedRoute><Gallery recipes={recipes} /></ProtectedRoute>} />
          <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
          <Route path="/recipe/:id" element={<ProtectedRoute><RecipeDetails recipes={recipes} /></ProtectedRoute>} />
          <Route path="/thank-you" element={<ProtectedRoute><ThankYou /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
