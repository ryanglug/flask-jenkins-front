import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import { AuthProvider } from "./contexts/auth-context";
import "./styles/index.scss";
import "@theme-toggles/react/css/Classic.css";
import Navbar from "./components/nav/navbar";
import { ThemeProvider } from "./contexts/theme-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
