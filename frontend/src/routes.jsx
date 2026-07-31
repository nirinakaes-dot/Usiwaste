import { Routes, Route } from "react-router-dom";
import Listings from "./pages/Store/Listings";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

// Central route table for the app. Add new pages here as they're built.
export default function AppRoutes() {
  return (
    <Routes>
      {/* public */}
      <Route path="/" element={<Listings />} />
      <Route path="/listings/:id" element={<ListingDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* business landing - reuses the store view for now */}
      <Route path="/dashboard" element={<Listings />} />

      {/* anything unmatched */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
