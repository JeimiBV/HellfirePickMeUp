import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function ProtectedRoute({children}) {
    const {user, loading,logout}= useAuth();
    if (loading) return <h1>loading</h1>

    if(!user) return <Navigate to="/"/>
    

    return <>{children}
          </>
}