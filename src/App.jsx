import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Destinations from "./pages/Destinations/Destinations";
import DestinationDetails from "./pages/DestinationDetails/DestinationDetails";

import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <div className="app">

      <Navbar />

      <main className="main-content">

        <Routes>

          {/* =========================
              PUBLIC ROUTES
          ========================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/destinations"
            element={<Destinations />}
          />

          <Route
            path="/destinations/:id"
            element={<DestinationDetails />}
          />

          {/* =========================
              AUTH
          ========================= */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* =========================
              FALLBACK
          ========================= */}

          <Route
            path="*"
            element={
              <div className="page-not-found">
                <h1>404</h1>
                <p>Page not found.</p>
              </div>
            }
          />

        </Routes>

      </main>

      <Footer />

    </div>
  );
}

export default App;