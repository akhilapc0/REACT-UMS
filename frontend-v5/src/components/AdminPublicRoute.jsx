

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AdminPublicRoute({ children }) {
  const { isAdminAuthenticated } = useSelector((state) => state.admin);

  if (isAdminAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

export default AdminPublicRoute;