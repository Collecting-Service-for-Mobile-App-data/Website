import { Navigate, Outlet } from "react-router-dom";
import { useAuthSelector } from "./auth/Auth";
import { Container } from "@mui/material";

export const PrivateRoute = () => {
  const { user } = useAuthSelector(); // determine if authorized, from context or however you're doing it
  const auth = user.isAuthenticated;
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? (
    <Container>
      <Outlet />
    </Container>
  ) : (
    <Navigate to="/login" />
  );
};
