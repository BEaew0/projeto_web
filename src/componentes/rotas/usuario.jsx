import { useAuth } from "../auth_teste";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { isLogged } = useAuth();
  return isLogged ? children : <Navigate to="/login" />;
}