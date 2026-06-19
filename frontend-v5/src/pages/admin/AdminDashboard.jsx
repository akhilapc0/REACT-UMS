

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { adminLogout } from '../../features/admin/adminSlice';

function AdminDashboard() {
    const { adminToken } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [formName, setFormName] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formPassword, setFormPassword] = useState('');
    const [formError, setFormError] = useState('');

    const headers = { Authorization: `Bearer ${adminToken}` };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `http://localhost:5000/api/admin/users?page=${page}&limit=5&search=${search}`,
                { headers }
            );
            setUsers(res.data.users);
            setTotalPages(res.data.totalPages);
            setTotal(res.data.total);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, [page, search]);

    const handleLogout = () => {
        dispatch(adminLogout());
        navigate('/admin/login');
    };

    const handleCreate = async () => {
        setFormError('');


        if (!formName.trim()) return setFormError('Name is required');
        if (!formEmail.trim()) return setFormError('Email is required');
        if (!formPassword.trim()) return setFormError('Password is required');
        if (formPassword.length < 6) return setFormError('Password must be at least 6 characters');

        try {
            await axios.post('http://localhost:5000/api/admin/users',
                { name: formName, email: formEmail, password: formPassword },
                { headers }
            );
            setShowCreateModal(false);
            setFormName(''); setFormEmail(''); setFormPassword('');
            fetchUsers();
        } catch (err) {
            setFormError(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    const handleEditOpen = (user) => {
        setSelectedUser(user);
        setFormName(user.name);
        setFormEmail(user.email);
        setFormError('');
        setShowEditModal(true);
    };

    const handleEdit = async () => {
        setFormError('');

        
        if (!formName.trim()) return setFormError('Name is required');
        if (!formEmail.trim()) return setFormError('Email is required');

        try {
            await axios.put(`http://localhost:5000/api/admin/users/${selectedUser._id}`,
                { name: formName, email: formEmail },
                { headers }
            );
            setShowEditModal(false);
            fetchUsers();
        } catch (err) {
            setFormError(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    const handleDeleteOpen = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(
                `http://localhost:5000/api/admin/users/${selectedUser._id}`,
                { headers }
            );
            setShowDeleteModal(false);
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-gray-800 text-white px-8 py-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold tracking-wide">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition"
                >
                    Logout
                </button>
            </nav>

            <div className="max-w-5xl mx-auto mt-8 px-4 pb-10">
                {/* Total Users Card */}
                <div className="bg-white rounded-2xl shadow p-6 mb-6 flex items-center gap-5">
                    <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center">
                        <span className="text-indigo-600 text-2xl">👥</span>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Total Users</p>
                        <p className="text-3xl font-bold text-gray-800">{total}</p>
                    </div>
                </div>

                {/* Main Table Card */}
                <div className="bg-white rounded-2xl shadow p-6">
                    {/* Search + Add */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="relative w-72">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                className="w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                            {search && (
                                <button
                                    onClick={() => { setSearch(''); setPage(1); }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-xl font-bold leading-none"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => {
                                setShowCreateModal(true);
                                setFormName(''); setFormEmail('');
                                setFormPassword(''); setFormError('');
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
                        >
                            + Add User
                        </button>
                    </div>

                    {/* Table */}
                    {loading ? (
                        <p className="text-center text-gray-400 py-10">Loading...</p>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 text-left">
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-500 rounded-l-lg">#</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-500">Name</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-500">Email</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-500 rounded-r-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center text-gray-400 py-10">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user, index) => (
                                        <tr key={user._id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                                            <td className="px-4 py-4 text-gray-400 text-sm">
                                                {(page - 1) * 5 + index + 1}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-gray-800">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-gray-500 text-sm">{user.email}</td>
                                            <td className="px-4 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditOpen(user)}
                                                        className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteOpen(user)}
                                                        className="bg-red-50 text-red-500 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-40 transition"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 transition"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Create New User</h3>
                        {formError && (
                            <p className="text-red-500 text-sm mb-4 bg-red-50 px-3 py-2 rounded-lg">{formError}</p>
                        )}
                        <div className="space-y-4">
                            <input type="text" placeholder="Full Name" value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input type="email" placeholder="Email" value={formEmail}
                                onChange={(e) => setFormEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input type="password" placeholder="Password" value={formPassword}
                                onChange={(e) => setFormPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowCreateModal(false)}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition">
                                Cancel
                            </button>
                            <button onClick={handleCreate}
                                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Edit User</h3>
                        {formError && (
                            <p className="text-red-500 text-sm mb-4 bg-red-50 px-3 py-2 rounded-lg">{formError}</p>
                        )}
                        <div className="space-y-4">
                            <input type="text" placeholder="Full Name" value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input type="email" placeholder="Email" value={formEmail}
                                onChange={(e) => setFormEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowEditModal(false)}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition">
                                Cancel
                            </button>
                            <button onClick={handleEdit}
                                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Delete User</h3>
                        <p className="text-gray-500 mb-6">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold text-gray-800">{selectedUser?.name}</span>?
                            This cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition">
                                Cancel
                            </button>
                            <button onClick={handleDelete}
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;