import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';

const Dashboard = () => {
  const [accountType, setAccountType] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the logged-in user's account type from the database
        const response = await axios.get('http://localhost:5000/user-data');
        setAccountType(response.data.accountType);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const renderMenuOptions = () => {
    switch (accountType) {
      case 'user':
        return (
          <ul className="space-y-2">
            <li>
              <Link to="/send-money" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Send Money</Link>
            </li>
            <li>
              <Link to="/cashout" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Cashout</Link>
            </li>
            <li>
              <Link to="/cashin" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Cashin</Link>
            </li>
            <li>
              <Link to="/balance-check" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Balance Check</Link>
            </li>
            <li>
              <Link to="/transaction-history" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Transaction History</Link>
            </li>
          </ul>
        );
      case 'agent':
        return (
          <ul className="space-y-2">
            <li>
              <Link to="/transaction-management" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Transaction Management</Link>
            </li>
            <li>
              <Link to="/balance-check" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">Balance Check</Link>
            </li>
            <li>
              <Link to="/history" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">History</Link>
            </li>
          </ul>
        );
      case 'admin':
        return (
          <ul className="space-y-2">
            <li>
              <Link to="/user-management" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">User Management</Link>
            </li>
            <li>
              <Link to="/system-monitoring" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">System Monitoring</Link>
            </li>
          </ul>
        );
      default:
        return (
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard/user-management" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">User Management</Link>
            </li>
            <li>
              <Link to="/dashboard/system-monitoring" className="block px-4 py-2 text-blue-500 hover:bg-blue-100">System Monitoring</Link>
            </li>
          </ul>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="md:w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          {renderMenuOptions()}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
