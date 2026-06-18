import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

function Home() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-indigo-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold">User Management System</h1>
                <div className="flex items-center gap-4">
                    <span className="text-indigo-200 text-sm">Welcome, {user?.name}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Content */}
            <div className="max-w-4xl mx-auto mt-10 px-4">
                {/* Welcome Card */}
                <div className="bg-white rounded-2xl shadow p-8 mb-6">
                    <div className="flex items-center gap-6">

                        <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
                            {user?.profileImage ? (
                                <img
                                    src={`http://localhost:5000/uploads/${user.profileImage}`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-indigo-600 text-3xl font-bold">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>


                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                            <p className="text-gray-500">{user?.email}</p>
                            <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full mt-1 inline-block">
                                Active
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        onClick={() => navigate('/profile')}
                        className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-lg transition group"
                    >
                        <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition">
                            <span className="text-indigo-600 group-hover:text-white text-xl">👤</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">My Profile</h3>
                        <p className="text-gray-500 text-sm mt-1">View and update your profile information</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-lg transition group">
                        <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition">
                            <span className="text-purple-600 group-hover:text-white text-xl">⚙️</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
                        <p className="text-gray-500 text-sm mt-1">Manage your account settings</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;