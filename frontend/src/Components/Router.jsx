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
import ListATruck from "../Views/ListATruck";
import RentedTrucks from "../Views/RentedTrucks";
import Chat from "../Views/chat";


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
      <Route path="listatruck" element={<ListATruck />} />
      <Route path="chat" element={<Chat />} />
      <Route path="currentrentals" element={<RentedTrucks />} />
    </Routes>
  </BrowserRouter>
);
