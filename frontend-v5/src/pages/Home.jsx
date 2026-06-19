import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, setCredentials } from '../features/auth/authSlice';
import axiosInstance from '../utils/axiosInstance';

function Home() {
  const { user,token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  useEffect(() => {
    const verifyUser = async () => {
      try {
       const res= await axiosInstance.get('/api/user/profile');
       dispatch(setCredentials({
        user:res.data,
        token:token
       }));
      } catch (err) {
       
      }
    };
    verifyUser();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700">
      <nav className="px-8 py-5 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 w-8 h-8 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <h1 className="text-white text-lg font-bold">User Management System</h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 mb-6 flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/30">
            {user?.profileImage ? (
              <img
                src={`http://localhost:5000/uploads/${user.profileImage}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-indigo-500 flex items-center justify-center">
                <span className="text-white text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-indigo-300 text-sm font-medium mb-1">Welcome back</p>
            <h2 className="text-white text-3xl font-bold">{user?.name}</h2>
            <p className="text-white/60 mt-1">{user?.email}</p>
          </div>
        </div>

        <div
          onClick={() => navigate('/profile')}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 cursor-pointer hover:bg-white/20 transition group flex items-center gap-5"
        >
          <div className="bg-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
            <span className="text-white text-xl">👤</span>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg">My Profile</h3>
            <p className="text-white/50 text-sm">View and update your profile information</p>
          </div>
          <span className="text-white/30 group-hover:text-white/60 text-xl transition">→</span>
        </div>
      </div>
    </div>
  );
}

export default Home;