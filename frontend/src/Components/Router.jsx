import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../Views/Homepage";
import Login from "../Views/Login";
import PasswordReset from "../Views/PasswordReset";
import Profile from "../Views/Profile";
import ProfileEdit from "../Views/ProfileEdit";
import SignUp from "../Views/SignUp";
import ResponsiveNavbar from "./Navbar";
import TruckRental from "../Views/TruckRental";
import TruckRentalDetails from "../Views/TruckRentalDetails";
import TruckAmenities from "../Views/TruckAmenities";
import Chat from "../Views/chat";
import ReportIssue from "../Views/ReportIssue";
import Listing from "../Views/Listing";

export const Router = () => (
  <BrowserRouter>
    <ResponsiveNavbar />
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="/" element={<Homepage />} />
      <Route path="homepage" element={<Homepage />} />
      <Route path="profile" element={<Profile />} />
      <Route path="passwordreset" element={<PasswordReset />} />
      <Route path="profileedit" element={<ProfileEdit />} />
      <Route path="truckrental" element={<TruckRental />} />
      <Route path="truckrentaldetails" element={<TruckRentalDetails />} />
      <Route path="truckamenities" element={<TruckAmenities />} />
      <Route path="listing" element={<Listing />} />
      <Route path="reportissue" element={<ReportIssue />} />
      <Route path="chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>
);
