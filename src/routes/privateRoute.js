import { Navigate } from "react-router-dom";

export const AdminProtectedRoute = ({ children }) => {
  const getTokenFromLocalStorage = localStorage.getItem("admin");
 
 
  const isAdminLoggedIn = getTokenFromLocalStorage === null && getTokenFromLocalStorage !== undefined;
 
  return isAdminLoggedIn ? (
    children
  ) : (
    <Navigate to="/admin" replace={true} />
  );
};