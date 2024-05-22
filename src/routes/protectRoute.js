import { Navigate } from "react-router-dom";

export const AdminPrivateRoute = ({ children }) => {
  const getTokenFromLocalStorage = localStorage.getItem("admin");
  console.log(getTokenFromLocalStorage);
 
  const isAdminLoggedIn = getTokenFromLocalStorage !== null && getTokenFromLocalStorage !== undefined;
 
  return isAdminLoggedIn ? (
    children
  ) : (
    <Navigate to="/admin/login" replace={true} />
  );
};

export const PageNotFound = () => {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  };