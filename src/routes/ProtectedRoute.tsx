import { Navigate, useLocation} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { ReactNode } from 'react';
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
  const { user, loading } = useAuth();
   console.log('testUser',user)
 if (loading) return <div>Loading...</div>;
  console.log('testUser',user)
    if (!user) { 
        return <Navigate to="/login" state={{ from: location }} replace/>
    }
  return   children
  
}

export default ProtectedRoute