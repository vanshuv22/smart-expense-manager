import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  console.log("isAuth: ", localStorage.getItem("isAuthenticated"));
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";   

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
