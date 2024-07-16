import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch users on component mount
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users'); // Replace with your actual backend API endpoint
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error as needed
    }
  };

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    try {
      const response = await axios.get(`http://localhost:5000/users?search=${e.target.value}`); // Replace with your actual backend API endpoint
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
      // Handle error as needed
    }
  };

  const handleAccountAction = async (userId, action) => {
    try {
      const response = await axios.put(`http://localhost:5000/users/${userId}/${action}`); // Replace with your actual backend API endpoint
      // Handle success message or update users state if necessary
    } catch (error) {
      console.error('Error updating user account:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Users list */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.accountStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleAccountAction(user.id, 'activate')}
                    className="text-green-600 hover:text-green-900"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => handleAccountAction(user.id, 'block')}
                    className="ml-2 text-red-600 hover:text-red-900"
                  >
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
