

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AdminProtectedRoute({ children }) {
  const { isAdminAuthenticated } = useSelector((state) => state.admin);

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}

export default AdminProtectedRoute;