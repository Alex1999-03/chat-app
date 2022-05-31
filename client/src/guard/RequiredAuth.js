import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

export default function RequiredAuth({ children }) {
    const { auth } = useAuth();
    const location = useLocation();

    if (!auth) {
        return <Navigate to={'/signin'} state={{ from: location }} replace />;
    }
    return children;
}